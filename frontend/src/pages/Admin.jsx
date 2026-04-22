/**
 * Admin Panel — protected admin-only page.
 * Displays contact form submissions with search, stats, and table/card view.
 */

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const Admin = () => {
  const { logout } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const res = await API.get('/api/contact');
      setSubmissions(res.data.submissions || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load submissions.');
    } finally {
      setLoading(false);
    }
  };

  // Client-side filter by name or email
  const filtered = useMemo(() => {
    if (!search.trim()) return submissions;
    const q = search.toLowerCase();
    return submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    );
  }, [submissions, search]);

  // Stats
  const totalSubmissions = submissions.length;
  const todayCount = submissions.filter((s) => {
    const d = new Date(s.created_at);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  // Format date
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="pt-28 pb-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              Admin Panel
            </h1>
            <p className="text-stone-700 mt-1">Contact form submissions</p>
          </div>
          <button
            onClick={logout}
            className="bg-white border border-stone-200 text-ink rounded-xl px-5 py-2.5 text-sm font-medium hover:border-stone-300 transition-all hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="px-6 pb-24">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* ── Stats row ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-sage/10 flex items-center justify-center text-lg">📩</div>
                <div className="text-xs font-medium uppercase tracking-wider text-stone-500">Total</div>
              </div>
              <div className="text-3xl font-bold text-ink">{totalSubmissions}</div>
              <div className="text-sm text-stone-700 mt-1">Submissions received</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-clay/10 flex items-center justify-center text-lg">📆</div>
                <div className="text-xs font-medium uppercase tracking-wider text-stone-500">Today</div>
              </div>
              <div className="text-3xl font-bold text-ink">{todayCount}</div>
              <div className="text-sm text-stone-700 mt-1">New today</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-moss/10 flex items-center justify-center text-lg">👥</div>
                <div className="text-xs font-medium uppercase tracking-wider text-stone-500">Users</div>
              </div>
              <div className="text-3xl font-bold text-ink">—</div>
              <div className="text-sm text-stone-700 mt-1">Registered users</div>
            </div>
          </div>

          {/* ── Search ── */}
          <div className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="relative flex-1 w-full">
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  id="admin-search"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full rounded-xl border border-stone-200 bg-white pl-12 pr-4 py-3 text-ink placeholder:text-stone-500 focus:border-ink focus:outline-none focus:ring-2 focus:ring-ink/10 transition-all"
                />
              </div>
              <button
                onClick={fetchSubmissions}
                className="bg-ink text-white rounded-xl px-5 py-3 text-sm font-medium hover:bg-stone-900 transition-all hover:-translate-y-0.5"
              >
                Refresh
              </button>
            </div>
          </div>

          {/* ── Content ── */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-4">
                <div className="spinner spinner-dark w-8 h-8" />
                <p className="text-stone-500 text-sm">Loading submissions...</p>
              </div>
            </div>
          ) : error ? (
            <div className="bg-white rounded-3xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50 text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="text-stone-700">{error}</p>
              <button
                onClick={fetchSubmissions}
                className="mt-4 bg-ink text-white rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-stone-900 transition-all"
              >
                Try Again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50 text-center">
              <div className="text-6xl mb-6">🧘‍♀️</div>
              <h3 className="text-xl font-semibold text-ink mb-2">No submissions yet</h3>
              <p className="text-stone-700 max-w-sm mx-auto">
                {search
                  ? 'No results match your search. Try a different term.'
                  : 'When visitors send a message through the contact form, it will show up here.'}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block bg-white rounded-3xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50 overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-stone-200/50">
                      <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-stone-500">Name</th>
                      <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-stone-500">Email</th>
                      <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-stone-500">Message</th>
                      <th className="text-left px-6 py-4 text-xs font-medium uppercase tracking-wider text-stone-500">Received</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s) => (
                      <tr
                        key={s.id}
                        className="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-sage/10 flex items-center justify-center text-xs font-semibold text-sage">
                              {s.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium text-ink">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-stone-700">{s.email}</td>
                        <td className="px-6 py-4 text-sm text-stone-700 max-w-xs">
                          {expandedId === s.id ? (
                            <span>
                              {s.message}{' '}
                              <button
                                onClick={() => setExpandedId(null)}
                                className="text-sage hover:text-moss text-xs font-medium"
                              >
                                Show less
                              </button>
                            </span>
                          ) : (
                            <span>
                              {s.message.length > 80 ? (
                                <>
                                  {s.message.slice(0, 80)}...{' '}
                                  <button
                                    onClick={() => setExpandedId(s.id)}
                                    className="text-sage hover:text-moss text-xs font-medium"
                                  >
                                    View more
                                  </button>
                                </>
                              ) : (
                                s.message
                              )}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-stone-500 whitespace-nowrap">
                          {formatDate(s.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="md:hidden space-y-4">
                {filtered.map((s) => (
                  <div
                    key={s.id}
                    className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-sage/10 flex items-center justify-center text-sm font-semibold text-sage">
                        {s.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-ink">{s.name}</div>
                        <div className="text-xs text-stone-500">{s.email}</div>
                      </div>
                    </div>
                    <p className="text-sm text-stone-700 mb-3 leading-relaxed">{s.message}</p>
                    <div className="text-xs text-stone-500">{formatDate(s.created_at)}</div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
