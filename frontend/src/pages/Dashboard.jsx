/**
 * Dashboard Page — protected user dashboard with personalized greeting,
 * stats, upcoming classes, progress tracker, and recommended classes.
 */

import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

/* ── Mock data ── */
const upcomingClasses = [
  { id: 1, name: 'Morning Vinyasa', time: '7:00 AM', instructor: 'Sarah M.', spots: 8, emoji: '🌊' },
  { id: 2, name: 'Hatha Basics', time: '9:30 AM', instructor: 'Raj P.', spots: 12, emoji: '🧘‍♀️' },
  { id: 3, name: 'Yin Restore', time: '6:00 PM', instructor: 'Anika L.', spots: 5, emoji: '🌙' },
  { id: 4, name: 'Evening Meditation', time: '8:00 PM', instructor: 'Ken W.', spots: 15, emoji: '🧠' },
];

const recommendedClasses = [
  { id: 1, name: 'Power Flow', duration: '75 min', level: 'Advanced', emoji: '🔥', instructor: 'Marcus T.' },
  { id: 2, name: 'Prenatal Yoga', duration: '60 min', level: 'Beginner', emoji: '🤰', instructor: 'Lisa H.' },
  { id: 3, name: 'Breathwork', duration: '30 min', level: 'All Levels', emoji: '🌬️', instructor: 'Deepa K.' },
];

const Dashboard = () => {
  const { user, logout } = useAuth();

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const firstName = user?.name?.split(' ')[0] || 'Yogi';

  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="pt-28 pb-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-ink">
              {greeting}, {firstName} 🧘
            </h1>
            <p className="text-stone-700 mt-1">Namaste. Here's your practice overview.</p>
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
                <div className="w-10 h-10 rounded-2xl bg-sage/10 flex items-center justify-center text-lg">📅</div>
                <div className="text-xs font-medium uppercase tracking-wider text-stone-500">This month</div>
              </div>
              <div className="text-3xl font-bold text-ink">12</div>
              <div className="text-sm text-stone-700 mt-1">Classes attended</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-clay/10 flex items-center justify-center text-lg">🔥</div>
                <div className="text-xs font-medium uppercase tracking-wider text-stone-500">Streak</div>
              </div>
              <div className="text-3xl font-bold text-ink">7 days</div>
              <div className="text-sm text-stone-700 mt-1">Meditation streak</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-2xl bg-moss/10 flex items-center justify-center text-lg">⏰</div>
                <div className="text-xs font-medium uppercase tracking-wider text-stone-500">Next class</div>
              </div>
              <div className="text-3xl font-bold text-ink">6 PM</div>
              <div className="text-sm text-stone-700 mt-1">Vinyasa with Sarah</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* ── Upcoming classes ── */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-ink">Upcoming Classes</h2>
                <span className="inline-flex items-center rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500">
                  Today
                </span>
              </div>
              <div className="space-y-3">
                {upcomingClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-stone-50 transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-sage/10 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                      {cls.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-ink">{cls.name}</div>
                      <div className="text-xs text-stone-500">{cls.instructor}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-ink">{cls.time}</div>
                      <div className="text-xs text-stone-500">{cls.spots} spots left</div>
                    </div>
                    <button className="hidden md:block bg-ink text-white rounded-xl px-4 py-2 text-xs font-medium hover:bg-stone-900 transition-all opacity-0 group-hover:opacity-100">
                      Book
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Your progress ── */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50">
              <h2 className="text-xl font-semibold text-ink mb-6">Your Progress</h2>
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-stone-700">Flexibility</span>
                    <span className="text-xs font-medium text-sage">72%</span>
                  </div>
                  <div className="h-2 rounded-full bg-stone-100">
                    <div className="h-full rounded-full bg-sage transition-all duration-700" style={{ width: '72%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-stone-700">Strength</span>
                    <span className="text-xs font-medium text-clay">58%</span>
                  </div>
                  <div className="h-2 rounded-full bg-stone-100">
                    <div className="h-full rounded-full bg-clay transition-all duration-700" style={{ width: '58%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-stone-700">Mindfulness</span>
                    <span className="text-xs font-medium text-moss">85%</span>
                  </div>
                  <div className="h-2 rounded-full bg-stone-100">
                    <div className="h-full rounded-full bg-moss transition-all duration-700" style={{ width: '85%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-stone-700">Balance</span>
                    <span className="text-xs font-medium text-ink">64%</span>
                  </div>
                  <div className="h-2 rounded-full bg-stone-100">
                    <div className="h-full rounded-full bg-ink transition-all duration-700" style={{ width: '64%' }} />
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-2xl bg-sage/5 border border-sage/10">
                <div className="text-sm font-medium text-ink mb-1">Weekly Goal</div>
                <div className="text-xs text-stone-700">4 of 5 sessions complete</div>
                <div className="mt-2 h-2 rounded-full bg-sage/20">
                  <div className="h-full rounded-full bg-sage" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Recommended ── */}
          <div>
            <h2 className="text-xl font-semibold text-ink mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendedClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl group-hover:scale-110 transition-transform">{cls.emoji}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-ink">{cls.name}</h3>
                      <p className="text-xs text-stone-500">with {cls.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-500">
                      {cls.duration}
                    </span>
                    <span className="inline-block rounded-full bg-sage/10 px-2.5 py-0.5 text-xs font-medium text-moss">
                      {cls.level}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
