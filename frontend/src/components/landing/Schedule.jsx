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
    <section id="schedule" className="py-24 md:py-32 px-8 md:px-20 bg-white">
      <div className="max-w-[1200px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-200 px-3 py-1 text-[10px] font-black text-stone-500 uppercase tracking-[0.2em] mb-12">
          Schedule
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-ink mb-16 leading-none">
          Choose your session
        </h2>

        {/* Day Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
            <button
              key={day}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                day === 'Monday' 
                  ? 'bg-[#F2EAE1] text-ink' 
                  : 'text-stone-400 hover:text-ink'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Session List */}
        <div className="space-y-4">
          {schedule.map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#FBF6F1] rounded-[40px] p-4 md:px-10 md:py-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-lg transition-all border border-transparent hover:border-stone-200 group"
            >
              {/* Time & Day */}
              <div className="text-left w-full md:w-auto">
                <div className="text-base md:text-lg font-bold text-ink whitespace-nowrap">{item.day} {item.time}</div>
                <div className="text-sm font-medium text-stone-400">{item.duration}</div>
              </div>

              {/* Class & Level */}
              <div className="text-left flex-1">
                <div className="text-base md:text-lg font-bold text-ink">{item.class}</div>
                <div className="text-sm font-medium text-stone-400">{item.level}</div>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <img src={item.avatar} alt={item.instructor} className="w-12 h-12 rounded-full object-cover border-2 border-white" />
                <span className="text-sm md:text-base font-bold text-ink">{item.instructor}</span>
              </div>

              {/* Book Action */}
              <button className="w-full md:w-auto bg-[#3C3228] text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-black/5">
                Book
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Schedule;
