import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STATS = [
  { value: '92%', label: 'of buying decisions begin with a Google search of your name' },
  { value: '7×', label: 'more inbound opportunities for professionals with active personal brands' },
  { value: '3 sec', label: 'is all it takes for someone to judge your credibility online' },
];

const POINTS = [
  {
    number: '01',
    title: 'Visibility is the new credibility.',
    body: "Every time your name isn't seen or trusted, someone else takes the opportunity you should have had. In 2026, the best don't win. The most visible do.",
  },
  {
    number: '02',
    title: 'Authority compounds over time.',
    body: 'A strong personal brand positions you as the authority figure across languages and platforms. The right audience finds you before you enter the room.',
  },
  {
    number: '03',
    title: 'Your name is your most valuable asset.',
    body: "Social currency is the best currency right now. Prestige compounds and so does influence. Build it deliberately or watch others fill the space.",
  },
];

function ScrollRevealItem({ children, progress, start, end, className = '' }) {
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [32, 0]);
  return (
    <motion.div style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

export default function WhyPersonalBrand() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 85%', 'end 60%'],
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-obsidian"
      style={{ padding: 'clamp(90px,10vw,140px) 0' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute top-0 right-0 w-2/3 h-full bg-[radial-gradient(ellipse_at_80%_20%,rgba(197,160,89,0.07)_0%,transparent_55%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_20%_80%,rgba(197,160,89,0.04)_0%,transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">

        {/* Header */}
        <ScrollRevealItem progress={scrollYProgress} start={0} end={0.18} className="mb-16 md:mb-22 max-w-3xl">
          <p className="text-[11px] font-bold tracking-[0.28em] uppercase text-gold mb-5">
            The Visibility Gap
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-platinum leading-[1.08] tracking-tight">
            Why you need a<br className="hidden md:block" /> Personal Brand in{' '}
            <em className="text-gold not-italic">2026</em>
          </h2>
          <p className="mt-5 text-platinum/40 text-lg leading-relaxed max-w-xl">
            Talent is abundant. Recognition is rare. Here is why the gap exists, and how to close it.
          </p>
        </ScrollRevealItem>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gold/10 rounded-sm overflow-hidden mb-24 md:mb-28">
          {STATS.map((stat, i) => (
            <ScrollRevealItem
              key={i}
              progress={scrollYProgress}
              start={0.12 + i * 0.06}
              end={0.32 + i * 0.06}
            >
              <div className="bg-obsidian px-8 py-10 flex flex-col gap-3 h-full">
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(48px,5.5vw,72px)',
                    fontWeight: 700,
                    color: '#C5A059',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </span>
                <p className="text-platinum/50 text-base leading-relaxed max-w-[240px]">
                  {stat.label}
                </p>
              </div>
            </ScrollRevealItem>
          ))}
        </div>

        {/* Points */}
        <div className="grid md:grid-cols-3 gap-0 border-t border-gold/10">
          {POINTS.map((point, i) => (
            <ScrollRevealItem
              key={i}
              progress={scrollYProgress}
              start={0.35 + i * 0.14}
              end={0.52 + i * 0.14}
              className="group relative border-b md:border-b-0 md:border-r border-gold/10 last:border-0 px-0 md:px-8 py-10 md:py-14 first:md:pl-0"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gold/0 group-hover:bg-gold/40 transition-all duration-500" />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  color: 'rgba(197,160,89,0.4)',
                  display: 'block',
                  marginBottom: '22px',
                }}
              >
                {point.number}
              </span>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(22px,2.4vw,30px)',
                  fontWeight: 600,
                  color: '#E2E2E2',
                  lineHeight: 1.25,
                  marginBottom: '16px',
                  letterSpacing: '-0.01em',
                }}
              >
                {point.title}
              </h3>
              <p className="text-platinum/50 text-base leading-[1.75]">
                {point.body}
              </p>
            </ScrollRevealItem>
          ))}
        </div>

        {/* Footer line */}
        <ScrollRevealItem
          progress={scrollYProgress}
          start={0.78}
          end={0.92}
          className="mt-16 flex items-center gap-6"
        >
          <div className="w-12 h-px bg-gold/40" />
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(226,226,226,0.3)',
            }}
          >
            Talent is everywhere. Recognition is rare.
          </p>
        </ScrollRevealItem>

      </div>
    </section>
  );
}