# Agent Review — Integration Status & Action Items

Integration of `sidsigma3/cinegraph` agent-review into `Soumya-Jyoti/serenity-yoga` CI.

| | |
|---|---|
| **Caller** | `.github/workflows/ci.yml` → job `agent-review` |
| **Reviewer — pinned now** | `…/agent-review.yml@v0.1.0` (resolved `8cf5627`) |
| **Reviewer — target** | **`v0.1.1`** — contains all reviewer-side fixes |
| **First run** | [runs/31790995904](https://github.com/Soumya-Jyoti/serenity-yoga/actions/runs/31790995904) — green in 2m 05s on a review that didn't happen |
| **Reported score** | 100.0 / 100 — `PASS (partial)`, "auto-merge eligible" |

## TL;DR

**v0.1.1 closes every reviewer-side defect found here.** Sid shipped fence salvage, a reframed security
prompt, honoured `retry_delay`, fail-closed partial reviews, and a new `rpm` input that paces calls to fit
the free tier. All four claims verified against the tag — see [Verification](#verification-of-v011).

**One action left on your side: bump to v0.1.1 and add `rpm: 5`.** Your `A1` quota problem probably does
not need billing after all.

| Layer | Owner | Status |
|---|---|---|
| Workflow call, pinning, secret plumbing, `needs:` ordering | Soumya | ✅ Working |
| `if:` guard correctness | Soumya | ✅ Fixed (**A2**) |
| API quota | Soumya | 🟡 Fixable free via `rpm: 5` (**A1**) |
| Lens execution + JSON parsing | Sid | ✅ Fixed in v0.1.1 (**B2**, **B3**) |
| Fail-open on partial review | Sid | ✅ Fixed in v0.1.1 (**B1**) |
| 429 handling | Sid | ✅ Fixed in v0.1.1 (**B4**) |

---

## Verification of v0.1.1

Checked directly against the tag, not taken on trust:

| Claim | Verified |
|---|---|
| Nothing renamed or removed since v0.1.0 | ✅ All 7 original inputs present |
| `allow-partial`, `rpm`, `concurrency` added with defaults | ✅ `false`, `0`, `3` |
| Existing config still parses unchanged | ✅ Confirmed — new inputs are all optional |
| Partial review now fails closed | ✅ `::error::FAIL - incomplete review coverage` sets `failed = True` |
| Fence salvage | ✅ `_FENCE = re.compile(r"```(?:json\|JSON)?\s*(.*?)\s*```", re.DOTALL)` + `_first_object()` |
| `retry_delay` honoured | ✅ `_quota_delay()` parses server value, defaults to 30s |
| `rpm` covers verify calls too | ✅ Global `LIMITER.wait()` before every call in `invoke_structured()` |
| Failure kinds separated | ✅ `CallFailure.kind` ∈ `quota` / `refusal` / `unparsed` / `error` |

⚠️ **One precedence detail Sid's summary is right about, and it matters:** advisory is still evaluated
**last**, after the partial check:

```python
if failed and args.advisory:
    print("::notice::advisory mode - not blocking the merge")
    return 0
return 1 if failed else 0
```

So with `advisory: true`, a partial review sets `failed = True`, prints `::error::FAIL - incomplete
review coverage`, and **still exits 0**. The job stays green with an error annotation in it.
**Read the log, not the checkmark.**

---

## What is already confirmed working

Recorded so nobody re-debugs it.

- **Tag pinning is consistent.** Both refs resolved to the same SHA. No frozen-workflow-over-moving-code drift.
- **The secret resolved.** A bad key returns `401`/`403`; the run got `429`, a *post-authentication* quota
  error — proof the key was accepted.
- **The diff was found.** `diff size: 2317 bytes`; the `paths` filter matched.
- **`needs: ci` held.** Agent review ran only after lint + build passed.
- **`permissions: contents: read` is sufficient.** The reviewer writes a job summary and uploads an
  artifact. It never calls the PR comments API.

---

# Part A — Action items for Soumya

## A1. Bump to v0.1.1 and pace the free tier — ▶️ DO THIS

**Do:** Four changes in `.github/workflows/ci.yml`. Two are the version bump, one is new, one is a revert.

```yaml
  agent-review:
    needs: ci
    if: github.event_name == 'pull_request' && github.event.pull_request.head.repo.fork == false
    uses: sidsigma3/cinegraph/.github/workflows/agent-review.yml@v0.1.1   # ← 1. bump
    with:
      paths: "*.js *.jsx *.yml"
      min-score: 80                          # ← 2. revert from the A4 test value of 101
      advisory: true                         # ← keep for now, see A5
      rpm: 5                                 # ← 3. NEW — free-tier pacing
      reviewer-ref: v0.1.1                   # ← 4. must match the @ref above
    secrets:
      GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
```

**Billing is probably unnecessary.** Try `rpm: 5` first. If reviews feel slow, `rpm: 10` and watch for
`429`. Expect **30–90 seconds** — the first run took 2m 05s burning retries, so this should be no worse.

### Issue — free tier was never too small; the burst pattern was wrong

```
429 ResourceExhausted: Quota exceeded for metric:
generativelanguage.googleapis.com/generate_content_free_tier_requests,
limit: 5, model: gemini-3.6-flash
quota_id: "GenerateRequestsPerMinutePerProjectPerModel-FreeTier"
```

The free tier allows **5 requests/minute**. A clean review needs only **3 calls** (one per lens). That
always fitted. What broke it was v0.1.0 firing three lenses *simultaneously*, then up to five verifiers
simultaneously, and then retrying into the same one-minute window with its own backoff schedule while
ignoring the server's `retry_delay { seconds: 33 }`.

v0.1.1's `RateLimiter` is fixed-interval spacing applied globally before **every** call — lenses and
verifiers alike. At `rpm: 5` that's one call every 12 seconds.

**Cost model to be aware of:** pacing is per-call, so wall time scales with findings.

| Findings | Calls | Approx. wall time at `rpm: 5` |
|---|---|---|
| 0 | 3 | ~36s |
| 3 | 6 | ~72s |
| 5 | 8 | ~96s |

A review that finds a lot gets slower, not throttled. That's the right trade for free tier.

> **Note:** `concurrency` defaults to `3` and does not need setting. The limiter is global, so the
> concurrency setting no longer controls quota pressure — `rpm` does.

---

## A2. Fix the `if:` guard — ✅ DONE

**Applied** in `.github/workflows/ci.yml`:

```yaml
# was
if: github.event.pull_request.head.repo.fork == false

# now
if: github.event_name == 'pull_request' && github.event.pull_request.head.repo.fork == false
```

### Issue — the guard evaluated true on push-to-main

On a `push` event there is no `github.event.pull_request` context, so the expression read `null == false`.
GitHub Actions performs **loose** comparison and coerces both `null` and `false` to `0`, so `0 == 0` → **true**.

This workflow triggers on `push: branches: [main]` as well as `pull_request`, so every merge to main fired
an agent review with no PR diff — wasted minutes and wasted quota. The `github.event_name` clause
short-circuits before the fork check is evaluated.

*Verification note:* this fix only shows itself on a push to main, where `agent-review` should now appear
**skipped**. Nothing to check on a PR.

---

## A3. Verify a genuinely complete review — ⏸️ after A1

**Do:** Push with the A1 config, then read the `agent-review` **log** — not the check status.

**Pass criteria — all four must hold:**

1. No `**PARTIAL REVIEW**` banner in the summary.
2. Verdict reads `PASS`. *(In v0.1.1 it can no longer read `PASS (partial)` and still exit 0 unless
   `allow-partial` is set — which you are not setting.)*
3. No `unparsed` warnings — fence salvage should eliminate these.
4. No refusal — the reframed security prompt should eliminate these.

**New in v0.1.1 — the log now tells you whose problem it is:**

| Log line | Meaning | Owner |
|---|---|---|
| `PASS - score X, auto-merge eligible` | ✅ all three lenses ran — **this is A3 passing** | — |
| `::error::FAIL - incomplete review coverage` | a lens still died; green only because of `advisory` | investigate |
| `::notice::quota exhausted…` | raise `rpm`, or enable billing | **you** |
| `::notice::the reply did not fit the schema…` | parsing bug survived | **Sid** — send him the log |

### Issue — a green check still does not prove a review happened

`advisory: true` converts the new fail-closed exit into a green job. The `::error::` annotation is the
signal; the checkmark is not. Do not add `agent-review` as a required status check until criteria 1–4
hold on a real run.

---

## A4. Threshold test — ⏳ ARMED, and now capable of proving more

**Currently applied:** `min-score: 101` is set in `ci.yml`, wrapped in a `TEMPORARY — REVERT TO 80`
comment block.

> ⚠️ **Revert to `min-score: 80` as part of the A1 bump.**

**Two versions of this test now exist:**

| Variant | Config | Expected result | Proves |
|---|---|---|---|
| **Current (armed)** | `min-score: 101`, `advisory: true` | 🟢 green + `::notice::advisory mode - not blocking the merge` | the threshold is read, and advisory suppresses failures |
| **Full gate test** | `min-score: 101`, `advisory` removed | 🔴 **red** | the gate can genuinely block a merge |

The second variant is new — it was impossible under v0.1.0's fail-open behaviour. Run it *temporarily*,
confirm red, then restore both values.

### Issue — the original test could not fail by construction

```python
if failed and args.advisory:
    print("::notice::advisory mode - not blocking the merge")
    return 0
```

`min-score: 101` against a score of 100.0 sets `failed = True`, and advisory converts it to exit `0`. The
armed test is still worth running — the `::notice::` line appearing is positive proof the threshold logic
is live — but it tests *advisory mode*, not the gate's ability to block. Only the second variant does that.

---

## A5. Reconsider `advisory: true` — 🔓 UNBLOCKED, but sequence still matters

**Do:** Keep `advisory: true` through the A1 bump. Drop it only after **A3** passes on a real run.

**Then:** remove `advisory: true` and add `agent-review` as a required status check.

### Issue — B1 is closed, but fail-closed on free tier introduces a new failure mode

The original objection is resolved: v0.1.1 no longer awards a passing verdict to an unreviewed diff, so a
blocking gate is no longer blind.

The new consideration is different. With `advisory` removed, `allow-partial` defaulting to `false`, and a
free-tier key, **a quota blip becomes a blocked merge.** A transient `429` that kills one lens now exits
non-zero and stops the PR. That is *correct* behaviour — it's exactly what fail-closed means — but it is a
real operational cost on an unpaid key.

Three ways to hold it, in order of preference:

1. **Keep `advisory: true` a while longer** and watch how often partial reviews actually occur under
   `rpm: 5`. Cheapest, and gives you data.
2. **Go fail-closed and enable billing** — removes the quota variable entirely, so a red means a real
   finding rather than a rate limit.
3. **Set `allow-partial: true`** with `advisory` removed — blocks on low scores but tolerates a dead lens.
   A middle position, but it re-opens a narrower version of the original problem.

*Recommendation: option 1 until you have a few clean runs, then reassess.*

---

# Part B — Sid's items: all resolved in v0.1.1

Kept for the record. No action outstanding.

## B1. Fail closed when a lens does not run — ✅ FIXED

**Shipped:** `allow-partial` input, default `false`. When caveats exist and it's unset:

```python
print(f"::error::FAIL - incomplete review coverage: {'; '.join(caveats)}")
failed = True
```

**Was:** score is `100 - penalties`, so empty `findings` ⇒ 100.0. No distinction between *"reviewed
thoroughly, found nothing"* and *"failed to review anything"*. The v0.1.0 run printed a `PARTIAL REVIEW`
caveat and `auto-merge eligible` in the same summary — honest prose contradicting the machine-readable
verdict that CI actually consumes. Highest-severity item in the original report.

**Caveat:** advisory still overrides this. See [Verification](#verification-of-v011).

---

## B2. Fenced JSON discarded — ✅ FIXED

**Shipped:** `salvage()` with `_FENCE` regex plus `_first_object()` for replies with prose around the JSON.

**Was:** the correctness lens died three times on `finish_reason=STOP`, `parsing_error=None`, raw payload
```` ```json {   "findings": [] } ``` ```` — schema-valid JSON that `with_structured_output()` returned
`None` for because it arrived as message content rather than a tool call. Only the fence stood between a
working lens and a dead one.

---

## B3. Security lens refusal — ✅ FIXED

**Shipped:** reframed prompt — *"Raise the security defects a careful colleague would flag before approving
this pull request: hardcoded secrets or API keys; SQL or Cypher built by string concatenation…"* Plus
`CallFailure.kind` separating `refusal` from `unparsed`.

**Was:** `"Sorry, I cannot fulfill your request to analyze or scan specific code snippets for security
vulnerabilities."` — a refusal misreported as a parse failure, hiding the real cause.

---

## B4. `429` as a first-class error — ✅ FIXED

**Shipped:** `_quota_delay()` parses the server's `retry_delay` and honours it (30s fallback); global
`RateLimiter`; `kind="quota"` surfaces distinctly.

**Was:** five client-side retries against a `429` carrying an explicit `retry_delay { seconds: 33 }`,
spending the very budget it was waiting for.

---

## B5. `needs: test` in the docs — ⬜ open, cosmetic

The documented example uses `needs: test`; this repo's job is `ci`. A copy-paste integration fails at
workflow-parse time. A one-line caveat would do it. Low severity.

---

# Suggested sequence

| # | Owner | Item | Status |
|---|---|---|---|
| 1 | Soumya | **A1** — bump to v0.1.1, add `rpm: 5`, revert `min-score` to 80 | ▶️ do now |
| 2 | Soumya | **A3** — verify a complete review (4 criteria) | after 1 |
| 3 | Soumya | **A4** — threshold test, optionally the full-gate variant | after 2 |
| 4 | Soumya | **A5** — drop `advisory`, make it a required check | after 2, judgement call |
| — | Soumya | **A2** — `if:` guard | ✅ done |
| — | Sid | **B1–B4** | ✅ shipped in v0.1.1 |
| — | Sid | **B5** — docs | ⬜ cosmetic |

**A1 → A3 is the whole critical path now.** One run tells you whether this integration works.

---

## Appendix — configuration

### Current state of `.github/workflows/ci.yml`

```yaml
  agent-review:
    needs: ci
    if: github.event_name == 'pull_request' && github.event.pull_request.head.repo.fork == false
    uses: sidsigma3/cinegraph/.github/workflows/agent-review.yml@v0.1.0
    with:
      paths: "*.js *.jsx *.yml"
      min-score: 101      # TEMPORARY — A4 test value, revert to 80
      advisory: true
      reviewer-ref: v0.1.0
    secrets:
      GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
```

### Reviewer `workflow_call` inputs at v0.1.1

| Input | Type | Default | |
|---|---|---|---|
| `paths` | string | `"*.py *.yml *.yaml *.toml"` | |
| `min-score` | number | `80` | |
| `review-score` | number | `90` | |
| `advisory` | boolean | `false` | |
| `allow-partial` | boolean | `false` | **new in v0.1.1** |
| `rpm` | number | `0` (unlimited) | **new in v0.1.1** |
| `concurrency` | number | `3` | **new in v0.1.1** |
| `model` | string | `gemini-3.6-flash` | |
| `python-version` | string | `"3.11"` | |
| `reviewer-ref` | string | `main` | |

Secret: `GOOGLE_API_KEY` (required). Stored as a **repository** secret; referenced by name only and never
written to any file in this repo.

### Upgrade rule

`@<ref>` and `reviewer-ref:` must always be bumped **together**. Pinning one and leaving the other means a
frozen workflow driving moving code — the failure mode this integration was pinned to avoid.
