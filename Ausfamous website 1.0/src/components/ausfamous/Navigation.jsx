import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#sectors' },
  { label: 'How It Works', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Newsroom', href: '/newsroom', isRoute: true },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3 backdrop-blur-xl bg-obsidian/90 border-b border-gold/10' : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-[1fr_auto_1fr] items-center">

        {/* Left links */}
        <nav className="hidden lg:flex items-center gap-1 justify-end">
          <Link
            to="/newsroom"
            className="px-5 py-2.5 text-sm font-medium text-platinum/60 hover:text-gold rounded-full transition-colors duration-300"
            style={{ textDecoration: 'none' }}
          >
            Newsroom
          </Link>
          {[{ label: 'Services', href: '#services' }, { label: 'Industries', href: '#sectors' }].map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-5 py-2.5 text-sm font-medium text-platinum/60 hover:text-gold rounded-full transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Centre logo */}
        <button onClick={() => scrollTo('#hero')} className="flex items-center justify-center gap-1 px-8">
          <span className="font-display text-2xl md:text-3xl font-medium text-platinum tracking-tight">
            Aus<span className="text-gold italic">Famous</span>
          </span>
        </button>

        {/* Right links */}
        <nav className="hidden lg:flex items-center gap-1 justify-start">
          {[{ label: 'How It Works', href: '#process' }, { label: 'Pricing', href: '#pricing' }].map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="px-5 py-2.5 text-sm font-medium text-platinum/60 hover:text-gold rounded-full transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="ml-2 px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-gold text-obsidian rounded-full hover:bg-gold-light transition-all duration-300 shadow-lg shadow-gold/25 hover:shadow-gold/40 hover:-translate-y-0.5"
          >
            Free Brand Audit
          </button>
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-platinum">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-full left-4 right-4 mt-2 bg-graphene border border-gold/20 rounded-2xl p-6 shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                link.isRoute ? (
                  <Link key={link.href} to={link.href} onClick={() => setMenuOpen(false)} className="px-4 py-3 text-left text-platinum/70 hover:text-gold text-sm font-medium transition-colors" style={{ textDecoration: 'none' }}>
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="px-4 py-3 text-left text-platinum/70 hover:text-gold text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </button>
                )
              ))}
              <button
                onClick={() => scrollTo('#contact')}
                className="mt-2 w-full py-4 text-xs font-bold tracking-widest uppercase bg-gold text-obsidian rounded-lg"
              >
                Free Brand Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}