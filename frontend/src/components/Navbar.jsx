/**
 * Navbar — Floating pill-shaped navigation bar.
 * Shows different links based on auth state. Collapses to hamburger on mobile.
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Classes', href: '/#styles' },
    { label: 'Schedule', href: '/#schedule' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        mobileOpen 
          ? 'w-[90vw] bg-white rounded-[32px] p-8 border border-stone-200 shadow-2xl' 
          : scrolled 
            ? 'w-[92vw] md:w-auto bg-white/90 backdrop-blur-xl border border-stone-200 rounded-full py-3 md:py-4 px-6 md:px-8'
            : 'w-[92vw] md:w-auto bg-white/70 backdrop-blur-md border border-stone-200/50 rounded-full py-3 md:py-4 px-6 md:px-8'
      }`}
    >
      <div className="flex items-center justify-between gap-8 md:gap-12">
        {/* ── Logo ── */}
        <a 
          href="/#hero"
          className="flex items-center gap-2 md:gap-3 text-ink font-black tracking-tighter text-lg md:text-xl whitespace-nowrap group"
        >
          <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-ink text-white flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
            <span className="text-xs md:text-sm">🧘</span>
          </div>
          <span className="leading-none">Serenity.</span>
        </a>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[0.65rem] lg:text-xs font-black uppercase tracking-[0.2em] text-stone-400 hover:text-ink transition-colors flex items-center gap-1.5"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Auth Actions ── */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  className="text-[0.65rem] lg:text-xs font-black uppercase tracking-[0.2em] text-stone-500 hover:text-ink transition-colors"
                >
                  {isAdmin ? 'Admin' : 'Dashboard'}
                </Link>
                <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-ink text-white flex items-center justify-center text-[10px] font-bold border-2 border-white ring-1 ring-stone-200">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[0.65rem] lg:text-xs font-black uppercase tracking-[0.2em] text-stone-500 hover:text-ink transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-ink text-white rounded-full px-5 lg:px-6 py-2 lg:py-2.5 text-[0.65rem] lg:text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-95 whitespace-nowrap"
                >
                  Join The Space
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Trigger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1 group"
            aria-label="Toggle Navigation"
          >
            <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile Full Menu ── */}
      <div className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out ${mobileOpen ? 'max-h-[80vh] opacity-100 mt-12' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-8 pb-4">
          <div className="space-y-6">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest border-b border-stone-100 pb-2">Menu</p>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-xl sm:text-2xl font-bold text-ink tracking-tighter hover:text-sage transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="space-y-6 pt-6 border-t border-stone-100">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-2">Account</p>
            {isAuthenticated ? (
              <div className="flex flex-col gap-6">
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  className="text-xl sm:text-2xl font-bold text-ink tracking-tighter"
                >
                  {isAdmin ? 'Admin Portal' : 'My Dashboard'}
                </Link>
                <button
                  onClick={logout}
                  className="text-left text-xs sm:text-sm font-bold text-clay uppercase tracking-widest"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <Link to="/login" className="text-xl sm:text-2xl font-bold text-ink tracking-tighter">Login</Link>
                <Link
                  to="/register"
                  className="bg-ink text-white rounded-2xl p-5 sm:p-6 text-center text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] hover:bg-stone-900 transition-colors"
                >
                  Join Serenity Studio
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
