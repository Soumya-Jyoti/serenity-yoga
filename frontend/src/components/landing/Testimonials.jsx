const testimonials = [
  {
    name: 'Priya S.',
    role: 'Member since 2023',
    avatar: 'P',
    quote: 'Serenity has completely transformed my relationship with movement. The instructors truly care about every student, and the space itself feels like a warm hug.',
  },
  {
    name: 'Marcus L.',
    role: 'Member since 2022',
    avatar: 'M',
    quote: 'After trying studios across the city, I finally found my home. The morning vinyasa flows are the highlight of my week — highly recommend.',
  },
  {
    name: 'Aisha K.',
    role: 'Member since 2024',
    avatar: 'A',
    quote: 'As a complete beginner, I was nervous walking in. The warmth and patience of the Serenity community made me feel welcome from day one.',
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 px-8 md:px-20 bg-stone-50">
      <div className="max-w-[1600px] mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-stone-100 px-3 py-1 text-[10px] font-black text-stone-500 uppercase tracking-[0.2em] mb-6">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-ink">
            What our yogis say.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-[48px] p-10 border border-stone-100 shadow-2xl shadow-black/[0.02] hover:-translate-y-2 transition-all duration-500"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-sage/10 text-sage flex items-center justify-center text-sm font-bold border border-sage/20">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-ink">{t.name}</div>
                  <div className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{t.role}</div>
                </div>
              </div>
              <p className="text-base md:text-lg text-stone-500 font-medium leading-relaxed italic">
                "{t.quote}"
              </p>
              <div className="mt-8 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-clay" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
