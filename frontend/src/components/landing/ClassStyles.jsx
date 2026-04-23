const classStyles = [
  {
    title: 'Breathwork & Meditation',
    description: 'Guided breath and meditation practice to regulate your nervous system and restore calm clarity.',
    image: '/class-breathwork.png'
  },
  {
    title: 'Hatha Yoga',
    description: 'A steady, breath-led practice focused on alignment, strength, and a grounded foundation.',
    image: '/class-hatha.png'
  },
  {
    title: 'Mobility & Core',
    description: 'A focused strength and mobility class that improves stability, joint health, and everyday resilience.',
    image: '/class-mobility.png'
  }
];

const ClassStyles = () => {
  return (
    <section id="styles" className="py-24 md:py-32 px-8 md:px-20 bg-[#FDFAF7]">
      <div className="max-w-[1600px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-200 px-3 py-1 text-[10px] font-black text-stone-500 uppercase tracking-[0.2em] mb-12">
          Classes
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-ink mb-10 leading-none">
          Choose your style
        </h2>
        <p className="max-w-3xl mx-auto text-base md:text-lg text-stone-500 font-medium leading-relaxed mb-20 opacity-80">
          All our classes are All-Levels with clear options for beginners and experienced practitioners. <br/>
          Expect plenty of variations so you can move at the pace that feels right for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {classStyles.map((style) => (
            <div 
              key={style.title}
              className="relative aspect-[3/4] rounded-[64px] overflow-hidden group cursor-pointer border border-stone-100"
            >
              <img 
                src={style.image} 
                alt={style.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              
              {/* Floating Info Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-8 rounded-[40px] text-left border border-white/20 shadow-xl shadow-black/5">
                <h3 className="text-xl md:text-2xl font-bold text-ink mb-3 tracking-tight">{style.title}</h3>
                <p className="text-sm md:text-base text-stone-500 font-medium leading-relaxed">
                  {style.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="px-10 py-5 rounded-full border border-stone-300 text-sm font-black uppercase tracking-widest text-ink hover:bg-white transition-all">
          See all class types
        </button>
      </div>
    </section>
  );
};

export default ClassStyles;
