const partnerLogos = [
  'YogaAlliance', 'MindfulMag', 'Calm Studio', 'ZenSpace', 'FlowFit'
];

const TrustBar = () => {
  return (
    <section className="py-12 px-8 md:px-20 border-y border-stone-200/60">
      <div className="max-w-[1600px] mx-auto text-center">
        <p className="text-sm text-stone-500 font-medium mb-8 uppercase tracking-widest">
          Trusted by 2,000+ yogis across the city
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 lg:gap-24">
          {partnerLogos.map((name) => (
            <span
              key={name}
              className="text-stone-300 font-black text-xl tracking-tighter select-none opacity-50 hover:opacity-100 transition-opacity"
            >
              {name}.
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
