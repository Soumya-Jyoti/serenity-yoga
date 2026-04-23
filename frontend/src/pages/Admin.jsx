/**
 * Admin Panel — A premium management interface for studio administrators.
 * Design Principle: Geometric precision, high-contrast borders, 
 * and utilitarian elegance. Zero shadows, zero gradients.
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      setIsRefreshing(true);
      if (!submissions.length) setLoading(true);
      const res = await API.get('/api/contact');
      setSubmissions(res.data.submissions || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load submissions.');
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return submissions;
    const q = search.toLowerCase();
    return submissions.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q)
    );
  }, [submissions, search]);

  const stats = useMemo(() => {
    const today = new Date().toDateString();
    return [
      { label: 'Total Inquiries', value: submissions.length, color: 'bg-ink' },
      { label: 'Received Today', value: submissions.filter(s => new Date(s.created_at).toDateString() === today).length, color: 'bg-sage' },
      { label: 'Pending Response', value: submissions.length, color: 'bg-clay' } // Future logic placeholder
    ];
  }, [submissions]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-cream selection:bg-ink selection:text-white">
      {/* ── Page Container ── */}
      <div className="pt-32 pb-24 px-6 md:px-10 max-w-[1440px] mx-auto">
        
        {/* ── Minimal Header ── */}
        <header className="mb-14 border-b border-stone-200 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="bg-ink text-white text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm">System</span>
              <div className="w-1.5 h-1.5 rounded-full bg-clay" />
              <span className="text-stone-400 font-bold text-[10px] uppercase tracking-widest">Admin Control</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-ink">
              Studio Management.
            </h1>
            <p className="text-stone-500 font-medium max-w-lg">
              Review and manage student inquiries from the Zen contact system.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={fetchSubmissions}
              className={`hidden md:flex p-4 border border-stone-200 bg-white rounded-xl transition-all hover:border-ink ${isRefreshing ? 'animate-spin' : ''}`}
              title="Refresh Data"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
              </svg>
            </button>
          </div>
        </header>

        {/* ── Operational Stats ── */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((s, i) => (
            <div key={i} className="bg-white border border-stone-200 p-8 rounded-[32px] group transition-all hover:border-ink">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6 group-hover:text-ink transition-colors">{s.label}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-ink tabular-nums tracking-tighter">{s.value < 10 && '0'}{s.value}</span>
                <div className={`w-2 h-2 rounded-full ${s.color}`} />
              </div>
            </div>
          ))}
        </section>

        {/* ── Search & Filter Logic ── */}
        <div className="mb-8 relative group">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by student name or contact email..."
            className="w-full bg-white border border-stone-200 rounded-3xl p-6 pl-14 text-lg font-medium text-ink placeholder:text-stone-300 focus:outline-none focus:border-ink transition-all"
          />
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-300 group-focus-within:text-ink transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          {search && (
            <button 
              onClick={() => setSearch('')}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-400 hover:text-ink font-bold text-[10px] uppercase"
            >
              Clear
            </button>
          )}
        </div>

        {/* ── Data Surface ── */}
        <div className="bg-white border border-stone-200 rounded-[32px] overflow-hidden flex flex-col">

          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-stone-400 min-h-[400px]">
              <div className="w-10 h-10 border-4 border-stone-100 border-t-ink rounded-full animate-spin" />
              <span className="text-[10px] font-black uppercase tracking-widest">Hydrating Management Interface...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center group min-h-[400px]">
              <img 
                src="/admin-illustration.png" 
                alt="Zen Workspace" 
                className="w-64 h-64 mb-8 grayscale opacity-20 group-hover:opacity-40 transition-opacity duration-1000 pointer-events-none"
              />
              <h3 className="text-2xl font-bold text-ink mb-2">Workspace clear.</h3>
              <p className="text-stone-500 max-w-xs font-medium">
                {search ? "No matches found for this query." : "Every student is in harmony. No pending inquiries."}
              </p>
            </div>
          ) : (
            <>
              {/* Desktop View: Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="border-b border-stone-200 bg-stone-50/50">
                      <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400 w-16">ID</th>
                      <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Name</th>
                      <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Email</th>
                      <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400">Message</th>
                      <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-stone-400 text-right">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {filtered.map((s) => (
                      <tr key={s.id} className="group hover:bg-stone-50/50 transition-colors">
                        <td className="px-6 py-8 align-top">
                          <span className="text-xs font-bold text-stone-300 tabular-nums">#{s.id}</span>
                        </td>
                        <td className="px-6 py-8 align-top whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-ink/5 border border-stone-200 text-ink rounded-lg flex items-center justify-center font-bold text-[10px]">
                              {s.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-bold text-ink text-sm">{s.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-8 align-top whitespace-nowrap text-sm font-medium text-stone-600 italic">
                          {s.email}
                        </td>
                        <td className="px-6 py-8 align-top max-w-sm">
                          <div className={`text-sm text-stone-700 leading-relaxed font-medium ${expandedId === s.id ? '' : 'line-clamp-2'}`}>
                            {s.message}
                          </div>
                          {s.message.length > 100 && (
                            <button 
                              onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                              className="mt-3 text-[10px] font-black uppercase tracking-widest text-sage border-b border-sage/20 hover:border-sage transition-all block"
                            >
                              {expandedId === s.id ? 'Collapse' : 'Read Full Entry'}
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-8 text-right align-top">
                          <div className="text-xs font-bold text-ink tabular-nums">{formatDate(s.created_at).split(',')[0]}</div>
                          <div className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">{formatDate(s.created_at).split(',')[1]}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View: Card Stack */}
              <div className="md:hidden divide-y divide-stone-100">
                {filtered.map((s) => (
                  <div key={s.id} className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-ink text-white rounded-xl flex items-center justify-center font-bold text-xs uppercase">
                          {s.name.charAt(0)}
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">#{s.id}</div>
                          <div className="text-sm font-bold text-ink">{s.name}</div>
                          
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-ink uppercase">{formatDate(s.created_at).split(',')[0]}</div>
                        <div className="text-[10px] text-stone-400 font-medium">{formatDate(s.created_at).split(',')[1]}</div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-xs font-bold text-sage italic">{s.email}</div>
                      <p className={`text-sm text-stone-700 leading-relaxed font-medium ${expandedId === s.id ? '' : 'line-clamp-3'}`}>
                        {s.message}
                      </p>
                      {s.message.length > 120 && (
                        <button 
                          onClick={() => setExpandedId(expandedId === s.id ? null : s.id)}
                          className="text-[10px] font-black uppercase tracking-widest text-ink/40"
                        >
                          {expandedId === s.id ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>


          )}
        </div>

        {/* ── Footer / Exit Logic ── */}
        <footer className="mt-20 pt-12 border-t border-stone-200 flex flex-col items-center gap-4">
          <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest">End of Management Records</p>
          <button
            onClick={logout}
            className="text-stone-400 hover:text-ink font-black text-[10px] bg-stone-100 px-8 py-4 rounded-xl hover:bg-stone-200 uppercase tracking-[0.3em] transition-colors py-2"
          >
            Sign Out & Terminate Session
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Admin;
