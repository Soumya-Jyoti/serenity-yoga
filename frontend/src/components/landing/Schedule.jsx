import user1 from '../../assets/User1.jpg';
import user2 from '../../assets/User2.jpg';
import user3 from '../../assets/User3.jpg';

const schedule = [
  { time: '07:30 AM', day: 'Monday', duration: '60 min', class: 'Hatha Yoga', level: 'Medium', instructor: 'Emily Carter', avatar: user1 },
  { time: '12:30 PM', day: 'Monday', duration: '45 min', class: 'Breathwork & Meditation', level: 'Medium', instructor: 'Isabella Silva', avatar: user2 },
  { time: '05:30 PM', day: 'Monday', duration: '60 min', class: 'Vinyasa Flow', level: 'Medium', instructor: 'Daniel Reyes', avatar: user3 },
  { time: '07:00 PM', day: 'Monday', duration: '60 min', class: 'Yin Yoga', level: 'Medium', instructor: 'Sofia Douglas', avatar: user1 },
];

const Schedule = () => {
  return (
    <section id="schedule" className="py-24 md:py-40 px-6 md:px-20 bg-[#FBFBF9]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 md:mb-32">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-200 px-4 py-1.5 text-[10px] font-black text-stone-500 uppercase tracking-[0.3em] mb-8 shadow-sm">
            Timetable
          </div>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-ink leading-[0.9]">
            Find your <br className="hidden md:block" /> inner balance
          </h2>
        </div>

        {/* Day Tabs - Scrollable on mobile */}
        <div className="flex items-center md:justify-center gap-4 mb-16 overflow-x-auto pb-6 -mx-6 px-6 md:mx-0 md:px-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <button
              key={day}
              className={`whitespace-nowrap px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${
                day === 'Monday' 
                  ? 'bg-ink text-white border-ink shadow-2xl shadow-ink/20' 
                  : 'bg-white text-stone-400 border-stone-100 hover:border-stone-300 hover:text-ink'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Session List */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {schedule.map((item, idx) => (
            <div 
              key={idx}
              className="group bg-white border border-stone-300 rounded-[48px] p-8 md:px-8 md:py-4 flex flex-col md:flex-row md:items-center gap-10 hover:border-ink transition-all duration-500 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]"
            >
              {/* Left Side: Time & Class */}
              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
                {/* Time */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Starts at</span>
                  <div className="text-4xl font-bold text-ink tracking-tighter">{item.time}</div>
                </div>

                {/* Class Info */}
                <div className="flex-1">
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-3 flex items-center gap-3">
                    {item.class}
                    <span className="w-1 h-1 bg-stone-300 rounded-full"></span>
                    <span className="text-ink">{item.duration}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-ink mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {item.class}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-[#F2EAE1] text-[10px] font-bold uppercase text-[#3C3228] tracking-widest">
                      {item.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Instructor & Action */}
              <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 pt-8 md:pt-0 border-t md:border-t-0 border-stone-50">
                {/* Instructor */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={item.avatar} 
                      alt={item.instructor} 
                      className="w-14 h-14 rounded-full object-cover ring-4 ring-stone-50 group-hover:ring-stone-100 transition-all duration-500" 
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-stone-900 border-4 border-white rounded-full flex items-center justify-center">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 mb-1">Guide</div>
                    <div className="text-sm font-bold text-ink">{item.instructor}</div>
                  </div>
                </div>

                {/* Action */}
                <a 
                  href="/login"
                  className="w-full md:w-auto bg-ink text-white px-12 py-6 rounded-[32px] text-[10px] font-black uppercase text-center tracking-[0.3em] hover:bg-stone-800 transition-all shadow-xl shadow-ink/10 group-hover:-translate-y-1 active:scale-95"
                >
                  Book Session
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
