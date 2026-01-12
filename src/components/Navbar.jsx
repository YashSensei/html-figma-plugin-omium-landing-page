import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);

      // Delay content animation after pill appears
      if (isScrolled) {
        setTimeout(() => setShowContent(true), 150);
      } else {
        setShowContent(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path) => location.pathname === path;
  const isLandingPage = location.pathname === '/';

  return (
    <>
      {/* Original Navbar - visible at top (always visible on non-landing pages, fades on landing when scrolled) */}
      <nav
        className={`fixed top-0 w-full h-20 z-50 flex items-center justify-between px-12 transition-all duration-500 ${
          scrolled && isLandingPage
            ? 'opacity-0 pointer-events-none -translate-y-full'
            : scrolled
              ? 'bg-charcoal/95 backdrop-blur-xl border-b border-hairline shadow-lg shadow-black/20'
              : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="size-5 bg-copper transition-transform duration-300 group-hover:rotate-45"></div>
            <span className="text-lg font-[600] tracking-tighter uppercase font-inter">
              Omium<span className="text-copper">.</span>
            </span>
          </Link>
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-[500] text-white/60">
            <Link
              to="/contact"
              className={`link-underline hover:text-copper transition-colors ${isActive('/contact') ? 'text-white' : ''}`}
            >
              Book Demo
            </Link>
            <Link
              to="/pricing"
              className={`link-underline hover:text-copper transition-colors ${isActive('/pricing') ? 'text-white' : ''}`}
            >
              Pricing
            </Link>
            <a
              href="https://docs.omium.ai/intro"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline hover:text-copper transition-colors"
            >
              Docs
            </a>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <button
                onClick={logout}
                className="text-[11px] uppercase tracking-[0.15em] font-[500] text-white/60 hover:text-white transition-colors"
              >
                Logout
              </button>
              <a
                href="https://app.omium.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover px-6 py-2.5 bg-copper text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all rounded-lg"
              >
                Go to Dashboard
              </a>
            </>
          ) : (
            <>
              <Link
                to="/auth"
                className="text-[11px] uppercase tracking-[0.15em] font-[500] text-white/60 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/auth"
                className="btn-hover px-6 py-2.5 bg-copper text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all rounded-lg"
              >
                Start Free
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Floating Pill Navbar - appears on scroll only on landing page */}
      {isLandingPage && (
        <div
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
            scrolled
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
        <div className="flex items-center gap-1 bg-white rounded-full px-2 py-2 shadow-2xl shadow-black/30">
          {/* Logo/Name Section - slides from left */}
          <button
            onClick={scrollToTop}
            className={`px-5 py-2.5 rounded-full transition-all duration-500 hover:bg-black/5 ${
              showContent
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-4'
            }`}
          >
            <span className="text-sm font-[600] tracking-tight uppercase font-inter text-charcoal">
              Omium
            </span>
          </button>

          {/* CTA Button - slides from right */}
          {isAuthenticated ? (
            <Link
              to="/pricing"
              className={`px-5 py-2.5 bg-copper text-charcoal text-sm font-[600] tracking-tight rounded-full transition-all duration-500 hover:bg-copper/90 ${
                showContent
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4'
              }`}
            >
              Pricing
            </Link>
          ) : (
            <Link
              to="/contact"
              className={`px-5 py-2.5 bg-copper text-charcoal text-sm font-[600] tracking-tight rounded-full transition-all duration-500 hover:bg-copper/90 ${
                showContent
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-4'
              }`}
            >
              Book Demo
            </Link>
          )}
        </div>
      </div>
      )}
    </>
  );
}
