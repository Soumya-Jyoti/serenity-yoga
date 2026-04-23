/**
 * Dashboard Page — A premium, minimal practice overview for yoga students.
 * Design Principle: Zero shadows, zero gradients. Purely based on clean strokes,
 * spacing, and refined typography (Onest).
 */

import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

/* ── Practice Data ── */
const upcomingClasses = [
  { id: 1, name: 'Morning Vinyasa', time: '07:00 AM', instructor: 'Sarah M.', level: 'Level 2', spots: 8, emoji: '🌊' },
  { id: 2, name: 'Hatha Basics', time: '09:30 AM', instructor: 'Raj P.', level: 'Level 1', spots: 12, emoji: '🧘‍♀️' },
  { id: 3, name: 'Yin Restore', time: '06:00 PM', instructor: 'Anika L.', level: 'Open', spots: 5, emoji: '🌙' },
  { id: 4, name: 'Evening Meditation', time: '08:00 PM', instructor: 'Ken W.', level: 'Mental', spots: 15, emoji: '🧠' },
];

const stats = [
  { label: 'Classes Completed', value: '12', sub: 'Last 30 days', icon: '✨' },
  { label: 'Weekly Streak', value: '07', sub: 'Day streak', icon: '🔥' },
  { label: 'Mindful Minutes', value: '420', sub: 'Overall focus', icon: '🔋' },
];

const recommendedClasses = [
  { id: 1, name: 'Power Flow', duration: '75 min', level: 'Advanced', instructor: 'Marcus T.', accent: '#9CAF88' },
  { id: 2, name: 'Prenatal Yoga', duration: '60 min', level: 'Beginner', instructor: 'Lisa H.', accent: '#E8B298' },
  { id: 3, name: 'Breathwork', duration: '30 min', level: 'All Levels', instructor: 'Deepa K.', accent: '#5D6B4F' },
];

const Dashboard = () => {
  const { user, logout } = useAuth();

  // Dynamic Greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name?.split(' ')[0] || 'Yogi';

  return (
    <div className="min-h-screen bg-cream selection:bg-sage/20 selection:text-ink transition-colors duration-500">
      {/* ── Main Navigation Padding ── */}
      <div className="pt-32 pb-24 px-6 md:px-10 max-w-[1440px] mx-auto">

        {/* ── Header Section ── */}
        <header className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stone-200 pb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-stone-500 font-medium text-xs uppercase tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full bg-sage ring-4 ring-sage/10" />
              Your Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink leading-[1.1]">
              {greeting}, <br className="md:hidden" /><span className="text-sage">{firstName}.</span>
            </h1>
            <p className="text-stone-500 text-lg max-w-md font-medium leading-relaxed">
              Find your center today. You have <span className="text-ink underline decoration-sage/40 decoration-2 underline-offset-4">one class</span> scheduled for this evening.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/classes"
              className="bg-ink text-white px-6 py-3.5 rounded-xl font-medium text-sm hover:translate-y-[-1px] transition-all active:translate-y-[1px] text-center"
            >
              Discover Classes
            </Link>
          </div>
        </header>

        {/* ── Primary Content Grid ── */}
        <div className="grid grid-cols-12 gap-6 lg:gap-10">

          {/* ── Left Column: Activity & Classes ── */}
          <div className="col-span-12 lg:col-span-8 space-y-12">

            {/* Quick Stats */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((item, i) => (
                <div key={i} className="bg-white border border-stone-200 p-8 rounded-3xl group hover:border-sage transition-colors">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-sage transition-colors">{item.label}</span>
                  </div>
                  <div className="text-4xl font-bold text-ink mb-1">{item.value}</div>
                  <div className="text-xs text-stone-500 font-medium">{item.sub}</div>
                </div>
              ))}
            </section>

            {/* Upcoming Schedule */}
            <section className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-xl font-bold text-ink">Upcoming Sessions</h2>
                <div className="text-xs font-bold text-sage px-3 py-1 bg-sage/5 border border-sage/10 rounded-full italic">Next class in 4h 20m</div>
              </div>

              <div className="bg-transparent md:bg-white md:border md:border-stone-200 md:rounded-[32px] overflow-hidden divide-y-0 md:divide-y divide-stone-100">
                {upcomingClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="bg-white border md:border-0 border-stone-200 rounded-3xl md:rounded-none p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 hover:bg-stone-50/50 transition-colors group cursor-pointer mb-4 md:mb-0"
                  >
                    <div className="flex items-center gap-6 flex-1">
                      <div className="p-4 rounded-2xl bg-cream border border-stone-200 text-3xl group-hover:scale-105 transition-transform duration-500">
                        {cls.emoji}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-ink text-lg line-clamp-1">{cls.name}</h3>
                          <span className="hidden sm:inline-block text-[10px] bg-stone-100 px-2 py-0.5 rounded-sm font-bold text-stone-500 underline decoration-stone-300">{cls.level}</span>
                        </div>
                        <p className="text-sm text-stone-500 font-medium">with {cls.instructor}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between md:justify-end gap-2 md:gap-8 pt-4 md:pt-0 border-t border-stone-50 md:border-t-0 mt-2 md:mt-0">
                      <div className="text-lg font-bold text-ink tabular-nums">{cls.time}</div>
                      <button className="bg-ink md:bg-transparent text-white md:text-ink border border-ink px-6 md:px-4 py-2.5 md:py-2 rounded-xl md:rounded-lg text-[11px] font-black uppercase tracking-widest md:tracking-tighter hover:bg-ink hover:text-white transition-all">
                        Reserve Spot
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Right Column: Insights & Recommendations ── */}
          <aside className="col-span-12 lg:col-span-4 space-y-10">


            {/* Progress Visualization */}
            <div className="bg-ink text-white p-8 rounded-[32px] overflow-hidden relative group">
              {/* Premium abstract illustration background */}
              <img
                src="/dashboard-illustration.png"
                alt="Abstract Yoga"
                className="absolute -top-6 -right-6 w-40 h-40 opacity-20 grayscale invert group-hover:scale-110 transition-transform duration-700 pointer-events-none"
              />

              <h2 className="text-xl font-bold mb-8 relative z-10">Weekly Progress</h2>

              <div className="space-y-6">
                {[
                  { label: 'Consistency', val: 84, color: 'bg-sage' },
                  { label: 'Practice Time', val: 62, color: 'bg-clay' },
                  { label: 'Mindfulness', val: 91, color: 'bg-white' },
                ].map((p, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
                      <span>{p.label}</span>
                      <span className="text-white">{p.val}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${p.color} transition-all duration-1000 ease-out`}
                        style={{ width: `${p.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-stone-400 text-xs font-medium leading-relaxed italic">
                  "Yoga is the journey of the self, through the self, to the self."
                </p>
              </div>
            </div>

            {/* Quick Recommendations */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-stone-400 px-2">Recommended for You</h3>
              <div className="space-y-3">
                {recommendedClasses.map((rec) => (
                  <div key={rec.id} className="p-5 bg-white border border-stone-200 rounded-2xl hover:border-ink transition-all cursor-pointer flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-2 h-10 rounded-full" style={{ backgroundColor: rec.accent }} />
                      <div>
                        <div className="font-bold text-ink text-sm">{rec.name}</div>
                        <div className="text-[10px] text-stone-500 font-bold uppercase">{rec.duration} • {rec.level}</div>
                      </div>
                    </div>
                    <div className="text-stone-300 group-hover:text-ink transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14m-7-7 7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] border border-dashed border-stone-300 rounded-2xl text-stone-500 hover:border-stone-400 hover:text-ink transition-all">
                View Full Catalog
              </button>
            </div>
          </aside>

        </div>
      </div>

      {/* ── Mobile Action Bar (Sticky UI) ── */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 bg-ink text-white p-4 rounded-2xl flex items-center justify-between border border-white/10 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sage flex items-center justify-center text-ink text-xl font-bold">1</div>
          <div>
            <div className="text-xs font-bold">Evening Class</div>
            <div className="text-[10px] text-stone-400">Starts at 6:00 PM</div>
          </div>
        </div>
        <button className="bg-white text-ink px-4 py-2 rounded-lg text-[10px] font-black uppercase">
          Check In
        </button>
      </div>
      {/* ── Footer / System Logic ── */}
      <footer className="mt-20 pt-12 pb-32 md:pb-12 border-t border-stone-200 flex flex-col items-center gap-4 max-w-[1440px] mx-auto px-6">
        <p className="text-stone-400 text-[10px] font-bold uppercase tracking-widest italic">End of personalized dashboard</p>
        <button
          onClick={logout}
          className="text-stone-400 hover:text-ink font-black text-[10px] bg-stone-100 px-8 py-4 rounded-xl hover:bg-stone-200 uppercase tracking-[0.3em] transition-colors"
        >
          Sign Out & Terminate Session
        </button>
      </footer>
    </div>

  );
};

export default Dashboard;
