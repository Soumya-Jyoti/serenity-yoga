/**
 * Landing Page — The public home page for Serenity Yoga Studio.
 * Contains: Hero, Trust Bar, Features, About, Class Types,
 * Testimonials, Contact Form, and Footer.
 */

import { useState } from 'react';
import Footer from '../components/Footer';
import API from '../api/axios';

/* ────────────────────────────────────────────
   Mock data for the landing page sections
──────────────────────────────────────────── */

const features = [
  {
    icon: (
      <svg className="w-7 h-7 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    title: 'Mindful Classes',
    description: 'From sunrise vinyasa to candlelit yin, every class is designed to nurture body and soul.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Expert Instructors',
    description: '15+ certified teachers with years of experience, each bringing a unique approach to practice.',
  },
  {
    icon: (
      <svg className="w-7 h-7 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
    title: 'Flexible Membership',
    description: 'Drop in anytime or choose a monthly plan — your practice, your pace, your way.',
  },
];

const classTypes = [
  { emoji: '🧘‍♀️', name: 'Hatha', duration: '60 min', level: 'Beginner' },
  { emoji: '🌊', name: 'Vinyasa', duration: '75 min', level: 'Intermediate' },
  { emoji: '🌙', name: 'Yin', duration: '60 min', level: 'All Levels' },
  { emoji: '🧠', name: 'Meditation', duration: '30 min', level: 'All Levels' },
  { emoji: '🤰', name: 'Prenatal', duration: '60 min', level: 'Beginner' },
  { emoji: '🔥', name: 'Power Flow', duration: '75 min', level: 'Advanced' },
];

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

const partnerLogos = [
  'YogaAlliance', 'MindfulMag', 'Calm Studio', 'ZenSpace', 'FlowFit'
];

/* ────────────────────────────────────────────
   Landing Component
──────────────────────────────────────────── */

const Landing = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState({ loading: false, success: false, error: '' });

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setContactStatus({ loading: false, success: false, error: 'All fields are required.' });
      return;
    }

    setContactStatus({ loading: true, success: false, error: '' });

    try {
      await API.post('/api/contact', contactForm);
      setContactStatus({ loading: false, success: true, error: '' });
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setContactStatus((s) => ({ ...s, success: false })), 5000);
    } catch (err) {
      setContactStatus({
        loading: false,
        success: false,
        error: err.response?.data?.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="bg-cream">
      {/* ─── HERO ─── */}
      <section id="hero" className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          {/* Pill badge */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full bg-sage/10 border border-sage/20 px-4 py-2 text-sm font-medium text-moss mb-10 animate-pulse-glow">
            <span>🌿</span>
            <span>Now accepting new members</span>
          </div>

          {/* Stacked H1s */}
          <div className="relative mb-8">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-ink animate-fade-in-up animation-delay-100">
              Find your balance
            </h1>
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-ink/40 animate-fade-in-up animation-delay-200"
              aria-hidden="true"
            >
              Find your balance
            </h1>
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-ink/[0.15] animate-fade-in-up animation-delay-300"
              aria-hidden="true"
            >
              Find your balance
            </h1>
          </div>

          {/* Subtext */}
          <p className="text-base md:text-lg text-stone-700 leading-relaxed max-w-xl mx-auto mb-10 animate-fade-in-up animation-delay-300">
            A sanctuary for yoga, meditation, and mindful living in the heart of the city.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16 animate-fade-in-up animation-delay-400">
            <a
              href="#classes"
              className="bg-ink text-white rounded-xl px-6 py-3 font-medium hover:bg-stone-900 transition-all hover:-translate-y-0.5 shadow-lg shadow-ink/5"
            >
              Book a Class
            </a>
            <a
              href="#about"
              className="bg-white border border-stone-200 text-ink rounded-xl px-6 py-3 font-medium hover:border-stone-300 transition-all hover:-translate-y-0.5"
            >
              Watch Intro
            </a>
          </div>

          {/* Floating mock UI cards */}
          <div className="relative max-w-3xl mx-auto animate-fade-in-up animation-delay-500">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
              {/* Schedule card */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50 w-64 animate-float">
                <div className="text-xs font-medium uppercase tracking-wider text-stone-500 mb-3">Today's Schedule</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink">Morning Flow</span>
                    <span className="text-xs text-stone-500">7:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink">Hatha Basics</span>
                    <span className="text-xs text-stone-500">9:30 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ink">Yin Restore</span>
                    <span className="text-xs text-stone-500">6:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Instructor avatars stack card */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50 w-56 animate-float-delayed">
                <div className="text-xs font-medium uppercase tracking-wider text-stone-500 mb-3">Instructors</div>
                <div className="flex items-center mb-3">
                  <div className="w-9 h-9 rounded-full bg-sage text-white flex items-center justify-center text-xs font-semibold ring-2 ring-white">A</div>
                  <div className="w-9 h-9 rounded-full bg-clay text-white flex items-center justify-center text-xs font-semibold -ml-2 ring-2 ring-white">S</div>
                  <div className="w-9 h-9 rounded-full bg-moss text-white flex items-center justify-center text-xs font-semibold -ml-2 ring-2 ring-white">R</div>
                  <div className="w-9 h-9 rounded-full bg-ink text-white flex items-center justify-center text-xs font-semibold -ml-2 ring-2 ring-white">K</div>
                  <span className="ml-2 text-xs text-stone-500">+11 more</span>
                </div>
                <div className="text-sm text-stone-700">15 certified teachers</div>
              </div>

              {/* Quick class card */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50 w-60 animate-float-delayed-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-sage/10 flex items-center justify-center text-lg">🌊</div>
                  <div>
                    <div className="text-sm font-semibold text-ink">Morning Flow</div>
                    <div className="text-xs text-stone-500">Vinyasa • 7:00 AM</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 rounded-full bg-clay ring-1 ring-white" />
                    <div className="w-5 h-5 rounded-full bg-sage ring-1 ring-white" />
                    <div className="w-5 h-5 rounded-full bg-moss ring-1 ring-white" />
                  </div>
                  <span className="text-xs text-stone-500">12 spots left</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="py-12 px-6 border-y border-stone-200/60">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-stone-500 font-medium mb-8">
            Trusted by 2,000+ yogis across the city
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {partnerLogos.map((name) => (
              <span
                key={name}
                className="text-stone-300 font-semibold text-lg tracking-wide select-none"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section id="features" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500 uppercase tracking-wider mb-4">
              Why Serenity
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">
              Practice with purpose
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-3xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-sage/10 flex items-center justify-center mb-6 group-hover:bg-sage/20 transition-colors">
                  {f.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-ink mb-3">{f.title}</h3>
                <p className="text-base text-stone-700 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 md:py-32 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80"
                  alt="Yoga practitioner in a peaceful studio setting"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-2xl p-5 shadow-lg border border-stone-200/50">
                <div className="text-3xl font-bold text-ink">8+</div>
                <div className="text-sm text-stone-500">Years of practice</div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500 uppercase tracking-wider mb-6">
                Our Story
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-8">
                A space to breathe, move, and grow
              </h2>
              <div className="space-y-4 text-base md:text-lg text-stone-700 leading-relaxed">
                <p>
                  Serenity was born from a simple belief: that everyone deserves a place of stillness
                  in a busy world. Founded in 2017 by a group of passionate yogis, we started with
                  just a small room and a dream.
                </p>
                <p>
                  Our philosophy is rooted in accessibility and authenticity. We blend ancient
                  traditions with modern understanding, creating a practice that meets you where
                  you are — physically, mentally, and emotionally.
                </p>
                <p>
                  Today, we're proud to be home to a thriving community of over 2,000 members,
                  guided by 15 exceptional instructors, each bringing their own unique wisdom to
                  the mat.
                </p>
              </div>
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-ink">2,000+</div>
                  <div className="text-sm text-stone-500">Active members</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-ink">15</div>
                  <div className="text-sm text-stone-500">Instructors</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-ink">50+</div>
                  <div className="text-sm text-stone-500">Classes / week</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLASS TYPES ─── */}
      <section id="classes" className="py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500 uppercase tracking-wider mb-4">
              Our Offerings
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">
              Find your flow
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {classTypes.map((c) => (
              <div
                key={c.name}
                className="bg-white rounded-3xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {c.emoji}
                </div>
                <h3 className="text-lg font-semibold text-ink mb-1">{c.name}</h3>
                <p className="text-xs text-stone-500 mb-1">{c.duration}</p>
                <span className="inline-block rounded-full bg-sage/10 text-moss text-xs font-medium px-2 py-0.5">
                  {c.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 md:py-32 px-6 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-500 uppercase tracking-wider mb-4">
              Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-ink">
              What our yogis say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white rounded-3xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-stone-200/50 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-sage text-white flex items-center justify-center text-sm font-semibold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">{t.name}</div>
                    <div className="text-xs text-stone-500">{t.role}</div>
                  </div>
                </div>
                <p className="text-base text-stone-700 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="mt-4 flex gap-1">
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

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 md:py-32 px-6 bg-stone-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
            {/* Left — info */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-stone-300 uppercase tracking-wider mb-6">
                Get in touch
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                We'd love to hear from you
              </h2>
              <p className="text-base md:text-lg text-stone-400 leading-relaxed mb-10">
                Whether you have a question about classes, pricing, or just want to say hello,
                our team is happy to connect with you.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Email</div>
                    <div className="text-sm text-stone-400">hello@serenityyoga.studio</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Phone</div>
                    <div className="text-sm text-stone-400">+1 (555) 234-5678</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Studio</div>
                    <div className="text-sm text-stone-400">123 Mindful Lane, Downtown District</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — contact form */}
            <div>
              <form onSubmit={handleContactSubmit} className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-stone-300 mb-2">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      placeholder="Your full name"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-stone-500 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-stone-300 mb-2">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-stone-500 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-stone-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactChange}
                      placeholder="Tell us what's on your mind..."
                      rows={4}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-stone-500 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Error */}
                {contactStatus.error && (
                  <p className="mt-3 text-sm text-red-400">{contactStatus.error}</p>
                )}

                {/* Success */}
                {contactStatus.success && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-sage">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Message sent! We'll get back to you soon.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={contactStatus.loading}
                  className="mt-6 w-full bg-sage text-white rounded-xl px-6 py-3 font-medium hover:bg-moss transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {contactStatus.loading ? (
                    <>
                      <span className="spinner w-4 h-4" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <Footer />
    </div>
  );
};

export default Landing;
