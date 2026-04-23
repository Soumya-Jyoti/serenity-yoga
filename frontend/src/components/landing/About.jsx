const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 px-8 md:px-20 bg-stone-50">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Image Column */}
          <div className="relative group">
            <div className="rounded-[64px] overflow-hidden aspect-[4/5] bg-stone-200 border border-stone-200/50">
              <img
                src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80"
                alt="Yoga practitioner in a peaceful studio setting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                loading="lazy"
              />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-8 -right-8 bg-white rounded-[32px] p-8 shadow-2xl shadow-black/5 border border-stone-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sage/10 text-sage flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-ink tracking-tighter">8+</div>
                <div className="text-xs font-black text-stone-400 uppercase tracking-widest">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:pl-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-100 px-3 py-1 text-[10px] font-black text-stone-500 uppercase tracking-[0.2em] mb-8">
              Our Story
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-ink mb-10 leading-[0.95]">
              A space to breathe, <br/> move, and grow.
            </h2>
            <div className="space-y-6 text-base md:text-lg text-stone-500 font-medium leading-relaxed mb-12">
              <p>
                Serenity was born from a simple belief: that everyone deserves a place of stillness
                in a busy world. Founded in 2017, we started with just a small room and a dream.
              </p>
              <p>
                Our philosophy blends ancient traditions with modern understanding, creating a 
                practice that meets you where you are — physically, mentally, and emotionally.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 pt-8 border-t border-stone-200">
              <div>
                <div className="text-3xl font-bold text-ink tracking-tighter">2,000+</div>
                <div className="text-xs font-black text-stone-400 uppercase tracking-widest mt-2">Active members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-ink tracking-tighter">15</div>
                <div className="text-xs font-black text-stone-400 uppercase tracking-widest mt-2">Instructors</div>
              </div>
              <div className="hidden lg:block">
                <div className="text-3xl font-bold text-ink tracking-tighter">50+</div>
                <div className="text-xs font-black text-stone-400 uppercase tracking-widest mt-2">Classes / week</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
