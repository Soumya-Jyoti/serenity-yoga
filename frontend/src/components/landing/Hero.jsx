import { useState, useEffect } from 'react';
import heroImg1 from '../../assets/heroImage1.png';
import heroImg2 from '../../assets/heroImage2.png';
import heroImg3 from '../../assets/heroImage3.png';
import user1 from '../../assets/User1.jpg';
import user2 from '../../assets/User2.jpg';
import user3 from '../../assets/User3.jpg';

const Hero = () => {
  const [currentHero, setCurrentHero] = useState(0);
  const heroImages = [heroImg1, heroImg2, heroImg3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-[100vh] lg:h-screen flex items-center pt-32 pb-20 lg:pt-24 lg:pb-12 px-8 md:px-20 bg-gradient-to-b from-[#F4E7D8] via-[#F4E7D8]/80 to-white overflow-hidden"
    >
      {/* Subtle background texture */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      
      <div className="max-w-[1600px] w-full mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* ── Left Column: Content ── */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            {/* Minimal Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-ink/5 border border-ink/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-ink mb-10 animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse" />
              <span>Spring Enrollment Open</span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-[-0.03em] text-ink leading-[0.95] mb-8 animate-fade-in-up animation-delay-100">
              Where motion meets <br className="hidden lg:block" /> 
              <span className="text-sage italic font-semibold serif">absolute</span> stillness.
            </h1>

            {/* Premium Subtext */}
            <p className="max-w-xl text-base md:text-xl text-stone-500 font-medium leading-relaxed mb-12 animate-fade-in-up animation-delay-200 mx-auto lg:mx-0">
              A sanctuary for yoga, meditation, and conscious living. <br className="hidden sm:block" /> 
              Join 2,000+ practitioners in the heart of the city.
            </p>

            {/* Clean CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 animate-fade-in-up animation-delay-300">
              <a
                href="#classes"
                className="w-full sm:w-auto bg-ink text-white rounded-2xl px-10 py-5 text-sm font-black uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-95 shadow-2xl shadow-ink/10"
              >
                Join The Space
              </a>
              <a
                href="#about"
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white/50 backdrop-blur-sm border border-stone-200 text-ink rounded-2xl px-10 py-5 text-sm font-black uppercase tracking-widest hover:bg-white transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Watch Space
              </a>
            </div>
          </div>

          {/* ── Right Column: Visual ── */}
          <div className="flex-1 w-full order-1 lg:order-2 flex justify-end animate-fade-in-up animation-delay-400">
            <div className="relative aspect-[4/5] lg:aspect-[4/5] w-full max-w-[500px] lg:max-w-none max-h-[80vh] rounded-br-[94px] rounded-l-[94px] overflow-hidden border border-stone-200/50 bg-white group">
              
              {/* Smooth Cross-Fade Image Stack */}
              {heroImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Serenity Yoga Studio View ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out group-hover:scale-105 ${
                    idx === currentHero ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}

              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent z-20 pointer-events-none" />
              
              {/* Dot Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-40">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentHero(idx)}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      idx === currentHero ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Floating Micro-Card (Social Proof) */}
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-xl px-4 py-2 rounded-br-[94px] rounded-l-[94px] border border-white/20 flex items-center gap-3 md:gap-4 z-40">
                <div className="flex -space-x-4 md:-space-x-3">
                  {[user1, user2, user3].map((img, i) => (
                    <img key={i} src={img} alt="User" className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <div>
                  <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-ink">Active Community</div>
                  <div className="text-[9px] md:text-[10px] text-stone-500 font-medium">Join 2k members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
