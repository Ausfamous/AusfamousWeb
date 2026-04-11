import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Globe, TrendingUp, Zap, Eye } from 'lucide-react';

const OUTCOMES = [
  {
    icon: Eye,
    number: '01',
    headline: 'Your name arrives before you.',
    body: 'The right people take you seriously from the start, before a word is spoken.',
  },
  {
    icon: TrendingUp,
    number: '02',
    headline: 'Millions see you every month.',
    body: 'You become a voice people listen to, trust, and return to, consistently.',
  },
  {
    icon: Zap,
    number: '03',
    headline: 'Your work commands attention.',
    body: 'Demand becomes consistent, not occasional. Your presence does the selling.',
  },
  {
    icon: Globe,
    number: '04',
    headline: 'Your story crosses borders.',
    body: 'It reaches people you have never met, in languages you do not speak, opening new horizons.',
  },
];

function OutcomeRow({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-start gap-6 md:gap-10 py-9 border-b border-obsidian/[0.07] last:border-0 cursor-default"
    >
      {/* Hover line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gold scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />

      {/* Number */}
      <span
        className="hidden md:block flex-shrink-0 font-display font-medium leading-none select-none"
        style={{ fontSize: '56px', color: 'rgba(197,160,89,0.13)', lineHeight: 1 }}
      >
        {item.number}
      </span>

      {/* Icon */}
      <div className="flex-shrink-0 mt-1 w-11 h-11 rounded-full border border-gold/30 group-hover:border-gold group-hover:bg-gold transition-all duration-300 flex items-center justify-center">
        <Icon className="w-4 h-4 text-gold group-hover:text-obsidian transition-colors duration-300" strokeWidth={1.5} />
      </div>

      {/* Text */}
      <div className="flex-1 pt-0.5">
        <h3 className="font-display text-lg md:text-2xl font-medium text-obsidian leading-snug mb-1.5 group-hover:text-gold transition-colors duration-300">
          {item.headline}
        </h3>
        <p className="text-obsidian/50 text-sm md:text-base leading-relaxed">{item.body}</p>
      </div>
    </motion.div>
  );
}

export default function WhatChanges() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 lg:py-44 bg-white overflow-hidden">
      {/* Subtle parallax gold glow */}
      <motion.div
        style={{
          background: 'radial-gradient(ellipse at center, rgba(197,160,89,0.06) 0%, transparent 70%)',
          y: bgY,
        }}
        className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full"
      />

      <div className="max-w-4xl mx-auto px-5 md:px-10">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-5">What Changes</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-medium text-obsidian leading-tight">
            What happens when we scale your<br className="hidden md:block" /> personal brand to command{' '}
            <em className="italic text-gold">authority</em>?
          </h2>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-gold/30" />
            <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
            <div className="w-12 h-px bg-gold/30" />
          </div>
        </motion.div>

        {/* Outcome rows */}
        <div className="pl-0 md:pl-2">
          {OUTCOMES.map((item, i) => (
            <OutcomeRow key={i} item={item} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-center mt-14 pt-12 border-t border-obsidian/[0.07]"
        >
          <p className="text-obsidian/45 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            These outcomes are a direct result of deliberate, sustained positioning, compounding influence across multiple media and social channels on autopilot.{' '}
            <span className="text-gold font-semibold">This is what Ausfamous builds.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}