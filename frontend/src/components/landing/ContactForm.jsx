import { useState } from 'react';
import API from '../../api/axios';

const ContactForm = () => {
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
    <section id="contact" className="py-24 md:py-32 px-8 md:px-20 bg-ink">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          {/* Left — info */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] font-black text-stone-300 uppercase tracking-[0.2em] mb-10 w-fit">
              Get in touch
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-10 leading-[0.95]">
              We'd love to <br/> hear from you.
            </h2>
            <p className="text-base md:text-xl text-stone-400 font-medium leading-relaxed mb-16 max-w-lg">
              Whether you have a question about classes, pricing, or just want to say hello,
              our team is happy to connect with you.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Email Support</div>
                  <div className="text-lg font-bold text-white">hello@serenityyoga.studio</div>
                </div>
              </div>
              <div className="flex items-start gap-6 group cursor-pointer">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Direct Call</div>
                  <div className="text-lg font-bold text-white">+1 (555) 234-5678</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right — contact form */}
          <div>
            <form onSubmit={handleContactSubmit} className="bg-white/[0.03] backdrop-blur-md rounded-[64px] p-10 md:p-16 border border-white/10">
              <div className="space-y-8">
                <div>
                  <label htmlFor="contact-name" className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Your full name"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-stone-600 focus:border-white focus:outline-none focus:ring-0 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-stone-600 focus:border-white focus:outline-none focus:ring-0 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-4">
                    How can we help?
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Tell us what's on your mind..."
                    rows={4}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder:text-stone-600 focus:border-white focus:outline-none focus:ring-0 transition-all resize-none"
                  />
                </div>
              </div>

              {/* Error */}
              {contactStatus.error && (
                <p className="mt-6 text-sm font-bold text-red-400">{contactStatus.error}</p>
              )}

              {/* Success */}
              {contactStatus.success && (
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-sage">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Message sent! We'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={contactStatus.loading}
                className="mt-12 w-full bg-white text-ink rounded-2xl px-10 py-5 text-sm font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
  );
};

export default ContactForm;
