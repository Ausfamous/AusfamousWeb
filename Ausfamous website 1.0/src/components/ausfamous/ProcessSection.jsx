import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Free Strategy Consultation',
    desc: 'We listen to where you are, where you want to be, and what your audience needs to hear about you. No obligation. No pitch. Just clarity.',
    deliverable: 'Clarity Brief',
  },
  {
    num: '02',
    title: 'Brand Architecture',
    desc: "We build your positioning framework. Narrative pillars, tone, target media list, and multilingual strategy. Customised for your industry, community, and goals.",
    deliverable: 'Brand System',
  },
  {
    num: '03',
    title: 'Execution',
    desc: 'Media pitching & placement begins. Content is created. Social channels are managed. Multilingual assets go live. Google presence is built.',
    deliverable: 'Live Presence',
  },
  {
    num: '04',
    title: 'Authority Compounds',
    desc: 'Media features accumulate. Your digital presence strengthens. Clients Google you and find a brand worth trusting. Authority makes you worth trusting.',
    deliverable: 'Compounding Authority',
  },
];

// Dot thresholds: when in [0,1] scroll progress each dot should appear
const DOT_THRESHOLDS = [0.1, 0.35, 0.6, 0.85];

function RunwayDot({ scrollYProgress, threshold }) {
  const scale = useTransform(scrollYProgress, [threshold - 0.08, threshold], [0, 1]);
  const opacity = useTransform(scrollYProgress, [threshold - 0.08, threshold], [0, 1]);

  return (
    <div className="flex justify-center">
      <motion.div
        style={{ scale, opacity }}
        className="relative w-4 h-4 rounded-full bg-gold shadow-lg shadow-gold/40"
      >
        {/* Glow pulse ring */}
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 rounded-full bg-gold/30 animate-ping"
        />
      </motion.div>
    </div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'center center'],
  });

  const runwayScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="process" className="relative py-16 md:py-28 lg:py-40 bg-white overflow-hidden" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-5">The Process</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-obsidian leading-tight mb-4">
            From <em className="text-gold italic not-italic">invisible</em> to unmissable.
          </h2>
          <p className="text-obsidian/40 text-sm md:text-base max-w-xl mx-auto">Four deliberate steps. One compounding outcome.</p>
        </motion.div>

        {/* Timeline rail - desktop */}
        <div className="hidden lg:block relative mb-4">
          <div className="absolute top-1/2 left-[12%] right-[12%] h-[2px] -translate-y-1/2">
            {/* Static dim track */}
            <div className="w-full h-full bg-gold/15 rounded-full" />
            {/* Animated gold fill — scroll-linked */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gold via-gold to-gold/30 rounded-full origin-left"
              style={{ scaleX: runwayScaleX }}
            />
            {/* Leading glow tip */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gold/60 blur-md"
              style={{
                left: useTransform(runwayScaleX, [0, 1], ['0%', '100%']),
                opacity: useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
              }}
            />
          </div>

          {/* Dots */}
          <div className="grid grid-cols-4 gap-8">
            {STEPS.map((_, i) => (
              <RunwayDot key={i} scrollYProgress={scrollYProgress} threshold={DOT_THRESHOLDS[i]} />
            ))}
          </div>
        </div>

        {/* Step Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.12, duration: 0.7 }}
              className="group relative bg-white border border-gold/20 rounded-xl p-8 hover:border-gold shadow-sm hover:shadow-xl hover:shadow-gold/10 hover:-translate-y-2 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="font-display text-4xl font-medium text-gold mb-4 block">{step.num}</span>
              <p className="text-[11px] font-bold tracking-widest uppercase text-gold/50 mb-3">Deliverable · {step.deliverable}</p>
              <h3 className="font-display text-2xl font-medium text-obsidian mb-3">{step.title}</h3>
              <p className="text-base text-obsidian/50 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}