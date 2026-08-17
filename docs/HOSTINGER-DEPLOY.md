# Deploying the frontend to a Hostinger VPS

One-time server setup for the deploy step in
[`.github/workflows/ci.yml`](../.github/workflows/ci.yml). Do this before the
first push to `main`, or the deploy step will fail on a missing secret.

## What this sets up

```
push to main
     │
     ▼
GitHub Actions ── lint ── build (dist/) ── rsync over SSH ──▶ Hostinger VPS
                                                              nginx serves
                                                              /var/www/serenity
```

The **backend is not part of this**. It stays on its current host (Railway, per
`nixpacks.toml`). The VPS serves static files only; the browser calls the API
directly at whatever `VITE_API_URL` points to.

Two things that Vercel did for free and now have to be configured by hand:

| Vercel did | Now handled by |
|---|---|
| SPA rewrite in `frontend/vercel.json` | `try_files` in the nginx block below |
| Injecting `VITE_API_URL` at build time | The `VITE_API_URL` repo **variable** |

---

## 1. Create the deploy user and web root

SSH into the VPS as root.

```bash
adduser --disabled-password --gecos "" deploy

mkdir -p /var/www/serenity
chown -R deploy:deploy /var/www/serenity
chmod 755 /var/www/serenity
```

A dedicated unprivileged user, not root. The private key for this user is going
to sit in GitHub's secret store; if it is ever leaked, the blast radius should
be one directory of static files, not the whole box.

## 2. nginx

Install if it isn't there (`apt install nginx`), then write
`/etc/nginx/sites-available/serenity`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name serenity.example.com;   # ← your domain

    root /var/www/serenity;
    index index.html;

    # SPA fallback. This is the line that replaces frontend/vercel.json.
    # Without it, https://your-site/login returns 404 on a hard refresh —
    # the home page still works, which is what makes it easy to miss.
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Vite content-hashes everything under /assets/, so the filename
    # changes whenever the contents do. Safe to cache forever.
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # index.html must NOT be cached. It is the file that points at the
    # hashed bundles, so a stale copy pins browsers to the old build no
    # matter how many times you deploy.
    location = /index.html {
        add_header Cache-Control "no-cache, must-revalidate";
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
```

Enable it and reload:

```bash
ln -s /etc/nginx/sites-available/serenity /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
ufw allow 80/tcp
nginx -t && systemctl reload nginx
```

**Testing before you have a domain.** Swap the first three lines for the block
below and the site answers on the bare IP, which is enough to verify the whole
pipeline end to end. Change it back when DNS is pointed:

```nginx
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name _;
```

Confirm the fallback works before deploying anything — drop a placeholder in
and request a path that does not exist on disk. Both must return 200:

```bash
echo '<h1>placeholder</h1>' > /var/www/serenity/index.html
chown deploy:deploy /var/www/serenity/index.html
curl -o /dev/null -w '%{http_code}\n' http://<VPS-IP>/
curl -o /dev/null -w '%{http_code}\n' http://<VPS-IP>/login
```

> **If your VPS came with a control panel** (CyberPanel → OpenLiteSpeed, Plesk →
> Apache) the equivalent is an `.htaccess` in the web root:
> ```apache
> RewriteEngine On
> RewriteCond %{REQUEST_FILENAME} !-f
> RewriteCond %{REQUEST_FILENAME} !-d
> RewriteRule . /index.html [L]
> ```
> Note that `rsync --delete-after` will remove that file, since it isn't in
> `dist/`. Put it in `frontend/public/` so Vite copies it into every build.

## 3. TLS

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d serenity.example.com
```

Certbot rewrites the server block above to add the 443 listener and a redirect.
Renewal is automatic via a systemd timer.

## 4. SSH key for GitHub Actions

Generate the key **on your machine**, not on the server — the private half
should never be written to the box it unlocks.

```bash
ssh-keygen -t ed25519 -C "github-actions@serenity" -f ./serenity_deploy -N ""
```

No passphrase (`-N ""`): a non-interactive runner has no way to type one. Run
this in **Git Bash**, not PowerShell — PowerShell collapses `-N ""` to nothing
and `ssh-keygen` fails with `option requires an argument -- N`.

Install the public half on the VPS. `ssh-copy-id` will **not** work here: step 1
created `deploy` with `--disabled-password`, so there is no password for it to
authenticate with. Either pipe the key in over a root SSH session:

```bash
ssh root@<VPS-IP> "mkdir -p /home/deploy/.ssh && chmod 700 /home/deploy/.ssh \
  && cat >> /home/deploy/.ssh/authorized_keys \
  && chmod 600 /home/deploy/.ssh/authorized_keys \
  && chown -R deploy:deploy /home/deploy/.ssh" < ./serenity_deploy.pub
```

…or, if root SSH is refusing your password, do it from the hPanel **Terminal**
(hPanel → VPS → Terminal), which logs in as root with no password:

```bash
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
echo "<paste the contents of serenity_deploy.pub>" >> /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
```

`>>` not `>`, so this adds a key rather than replacing any already there.

> The hPanel terminal does not strip bracketed-paste markers, so pasted commands
> can arrive as `^[[200~apt` and fail with `command not found`. Type
> `bind 'set enable-bracketed-paste off'` by hand once to stop it, and confirm
> long pastes landed intact — `ssh-keygen -lf /home/deploy/.ssh/authorized_keys`
> should print the same fingerprint as `ssh-keygen -lf ./serenity_deploy.pub`.

Then capture the server's host key — this is what lets the workflow verify it is
talking to your VPS and not something that answered in its place:

```bash
ssh-keyscan -p 22 <VPS-IP>
```

Copy the **entire output**, all lines.

Verify the key works before wiring up CI:

```bash
ssh -i ./serenity_deploy deploy@<VPS-IP> "ls -la /var/www/serenity"
```

Delete `serenity_deploy` from your machine once it's in GitHub's secret store.

## 5. GitHub secrets and variables

Settings → Secrets and variables → Actions.

**Secrets** tab:

| Name | Value |
|---|---|
| `HOSTINGER_SSH_KEY` | contents of `serenity_deploy` — the whole file, including the `-----BEGIN`/`-----END` lines |
| `HOSTINGER_KNOWN_HOSTS` | the full `ssh-keyscan` output from step 4 |
| `HOSTINGER_HOST` | VPS IP or hostname |
| `HOSTINGER_USER` | `deploy` |

**Variables** tab:

| Name | Value | Required |
|---|---|---|
| `VITE_API_URL` | the backend's public URL, e.g. `https://serenity-api.up.railway.app` | yes |
| `HOSTINGER_PATH` | `/var/www/serenity` | yes |
| `HOSTINGER_PORT` | SSH port, if not 22 | no |
| `HOSTINGER_SITE_URL` | `https://serenity.example.com` | no — enables the post-deploy smoke check |

`VITE_API_URL` is a **variable, not a secret**, on purpose. Vite bakes it into
the JS bundle that ships to every visitor, so it is public by construction.
Marking it secret would only mask it in the logs where you need to read it.

> **Pasting the two multi-line secrets from Windows.** `clip.exe` converts LF
> to CRLF (verified: a 3-line file goes in with 0 CR bytes and comes out of the
> clipboard with 3). OpenSSH reads both files line-wise and treats the trailing
> `\r` as key material, so `known_hosts` matches nothing —
> `Host key verification failed` against a host you just connected to by hand —
> and the private key fails to load. The workflow now runs both through
> `tr -d '\r'`, so this is handled; the deploy step also prints both
> fingerprints, which is the fastest way to spot a mangled paste.

## 6. Update the backend's CORS allowlist

`backend/server.js` reads allowed origins from `CORS_ORIGINS`. On the backend's
host (Railway), set:

```
CORS_ORIGINS=https://serenity.example.com,http://localhost:5173
```

Until this is done the site loads perfectly and every API call fails in the
browser console with a CORS error — login and the contact form silently stop
working. If `CORS_ORIGINS` is unset the previous hardcoded list still applies,
so nothing breaks before you get to it.

---

## Testing the pipeline

Do it in two stages so a mistake can't take the site down.

**Stage 1 — PR, no deploy.** Open a PR into `main`. Lint, build and artifact
upload run; the two deploy steps must show as **skipped**. That exercises
everything except the credentials.

**Stage 2 — merge.** The deploy runs. Check in order:

1. The `VITE_API_URL=` line in the build log is your real API URL, not `<empty>`.
2. The rsync `--stats` block shows files transferred.
3. The smoke check reports `HTTP 200` twice — the second one is the SPA fallback.
4. Load the site, open devtools → Network, and confirm the API calls resolve.

## Troubleshooting

| Symptom | Cause |
|---|---|
| `Host key verification failed` | `HOSTINGER_KNOWN_HOSTS` missing, truncated, or the VPS was rebuilt and its host key changed. Re-run `ssh-keyscan`. Was also caused by CRLF line endings before the workflow started stripping them — see the note in step 5. |
| `Permission denied (publickey)` | Public half not in `~deploy/.ssh/authorized_keys`, or its perms are wrong: `chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys`. |
| `rsync: failed to set times ... Operation not permitted` | `/var/www/serenity` not owned by `deploy`. Re-run the `chown` in step 1. |
| Site 200s but shows 403 for assets | nginx (`www-data`) can't traverse the directory. `chmod 755 /var/www/serenity`. |
| Home page fine, `/login` 404s on refresh | The `try_files` line is missing. This is the single most common miss. |
| Deploy succeeds, browser shows the old site | `index.html` is being cached. Check the `location = /index.html` block. |
| API calls fail with CORS errors | Step 6. |
| Site went blank right after deploy | `VITE_API_URL` unset — the bundle built against an empty API base. Check the build log echo. |

## Optional hardening

Restrict the deploy key so it can only rsync into one directory, rather than
granting a full shell. In `~deploy/.ssh/authorized_keys`, prefix the key line:

```
command="rrsync -wo /var/www/serenity",no-agent-forwarding,no-port-forwarding,no-pty ssh-ed25519 AAAA...
```

`rrsync` ships with rsync (`/usr/share/rsync/scripts/rrsync` on Debian/Ubuntu).
A leaked key then buys an attacker the ability to overwrite static files, and
nothing else.
