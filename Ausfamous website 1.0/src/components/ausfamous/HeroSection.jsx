import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const SLIDES = [
  {
    headline: <>Many people do great work.<br/>Only a few become <em className="text-gold italic not-italic">known</em> for it.</>,
    sub: 'We build your Personal Brand at your pace and scale, position you across media and digital platforms, and scale your influence and authority in multiple languages for the world to listen.',
  },
  {
    headline: <>Most professionals stay invisible.<br/><em className="text-gold italic not-italic">Not because they lack skill.</em><br/>Because they lack positioning.</>,
    sub: "Whether you've spent years mastering your craft or you're just stepping into your industry. We position you across multilingual and multi-community channels, so your name travels further and builds trust before you even enter the room.",
  },
  {
    headline: <>What do we see when we<br/>google <em className="text-gold italic not-italic">your name</em>?<br/>Your reputation is your most valuable asset.</>,
    sub: "Let's discuss your Personal Brand. No obligation and No pitch. Just a clear, honest look at where your brand is and where it can truly go. Let's scale it the way you want it.",
  },
];

const HARBOUR_BRIDGE_IMG = 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/96bffb8ec_generated_image.png';

export default function HeroSection({ heroImg }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % SLIDES.length), []);

  useEffect(() => {
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [next]);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/YShVE5RDYoI?autoplay=1&mute=1&loop=1&playlist=YShVE5RDYoI&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=https://ausfamous.com.au"
          className="absolute w-[177.78vh] min-w-full min-h-full h-[56.25vw] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          frameBorder="0"
          title="Hero background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/70 to-obsidian/95" />
      </div>

      {/* Gold radial glow */}
      <div className="absolute top-0 right-0 w-3/4 h-full bg-[radial-gradient(ellipse_at_70%_30%,rgba(197,160,89,0.08)_0%,transparent_60%)] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-5 text-center pt-32 pb-24">
        {/* Badge */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-gold" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-gold">Compounding Influence</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-gold" />
        </div>

        {/* Slider */}
        <div className="relative min-h-[320px] sm:min-h-[280px] md:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center"
            >
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-platinum leading-[1.15] tracking-tight mb-5">
                {SLIDES[current].headline}
              </h1>
              <p className="text-base md:text-lg text-platinum/60 max-w-2xl leading-relaxed">
                {SLIDES[current].sub}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-3 mt-10 mb-12">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="relative w-10 h-[3px] rounded-full overflow-hidden bg-platinum/15"
            >
              {i === current && (
                <motion.span
                  className="absolute inset-0 bg-gold rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 7, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => scrollTo('#contact')}
            className="px-8 py-4 text-sm font-semibold tracking-wider uppercase bg-gold text-obsidian rounded-full shadow-lg shadow-gold/30 hover:bg-gold-light hover:-translate-y-1 transition-all duration-300"
          >
            Get a Personal Brand Audit on Us
          </button>
          <button
            onClick={() => scrollTo('#process')}
            className="px-8 py-4 text-sm font-medium text-platinum/80 border-2 border-platinum/15 rounded-full hover:border-gold hover:text-gold transition-all duration-300"
          >
            See How It Works
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-platinum/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-gold/50" />
        </motion.div>
      </div>
    </section>
  );
}