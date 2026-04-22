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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'About', href: '/#about' },
    { label: 'Classes', href: '/#classes' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <nav
      id="navbar"
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-md border border-stone-200'
          : 'bg-white/80 backdrop-blur-md border border-stone-200'
      } rounded-full px-4 md:px-6 py-3`}
    >
      <div className="flex items-center gap-4 md:gap-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-ink font-semibold text-lg whitespace-nowrap"
        >
          <span className="text-xl">🧘</span>
          <span>Serenity</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-stone-700 hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop auth buttons */}
        <div className="hidden md:flex items-center gap-3 ml-4">
          {isAuthenticated ? (
            <>
              <Link
                to={isAdmin ? '/admin' : '/dashboard'}
                className="text-sm font-medium text-stone-700 hover:text-ink transition-colors"
              >
                {isAdmin ? 'Admin' : 'Dashboard'}
              </Link>
              <button
                onClick={logout}
                className="text-sm font-medium text-stone-500 hover:text-ink transition-colors"
              >
                Logout
              </button>
              <div className="w-8 h-8 rounded-full bg-sage text-white flex items-center justify-center text-xs font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-stone-700 hover:text-ink transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-ink text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-stone-900 transition-all hover:-translate-y-0.5"
              >
                Join Now
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1 p-2 ml-auto"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-ink transition-transform duration-300 ${
              mobileOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ink transition-opacity duration-300 ${
              mobileOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-ink transition-transform duration-300 ${
              mobileOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-4 pb-4 pt-2 border-t border-stone-200 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-stone-700 hover:text-ink transition-colors px-2 py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="border-t border-stone-100 pt-3 flex flex-col gap-2">
            {isAuthenticated ? (
              <>
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  className="text-sm font-medium text-stone-700 hover:text-ink transition-colors px-2 py-1"
                >
                  {isAdmin ? 'Admin Panel' : 'Dashboard'}
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-left text-stone-500 hover:text-ink transition-colors px-2 py-1"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-stone-700 hover:text-ink transition-colors px-2 py-1"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-ink text-white rounded-full px-5 py-2 text-sm font-medium text-center hover:bg-stone-900 transition-all"
                >
                  Join Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
