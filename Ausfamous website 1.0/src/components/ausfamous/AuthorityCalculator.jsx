import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';

const INDUSTRIES = [
{ label: 'Law & Legal', icon: '⚖️', avgClientValue: 18000 },
{ label: 'Healthcare', icon: '🏥', avgClientValue: 9500 },
{ label: 'Finance & Wealth', icon: '💰', avgClientValue: 22000 },
{ label: 'Real Estate', icon: '🏢', avgClientValue: 28000 },
{ label: 'Construction', icon: '🏗️', avgClientValue: 55000 },
{ label: 'Consulting', icon: '📊', avgClientValue: 32000 },
{ label: 'Corporate Leadership', icon: '🎯', avgClientValue: 40000 },
{ label: 'Medical Specialist', icon: '🔬', avgClientValue: 12000 }];


// Compounding multipliers — brand/trust/visibility focused
const COMPOUND = {
  3: {
    authorityScore: 38, // out of 100
    trustIndex: 42,
    visibilityReach: 18000,
    mediaFeatures: 2,
    articlesPublished: 6,
    searchRankImprovement: 28, // % jump in google name searches
    audienceGrowth: 3.1, // multiplier on current followers
    mentionsPerMonth: 4,
    inboundTrustSignals: 12, // unsolicited inquiries citing credibility
    compoundEffect: 'Early Signal',
    compoundDesc: 'Your name starts appearing. Early trust signals emerge.'
  },
  6: {
    authorityScore: 61,
    trustIndex: 68,
    visibilityReach: 62000,
    mediaFeatures: 7,
    articlesPublished: 14,
    searchRankImprovement: 74,
    audienceGrowth: 7.8,
    mentionsPerMonth: 14,
    inboundTrustSignals: 38,
    compoundEffect: 'Authority Building',
    compoundDesc: 'Media features compound. Your name is referenced by others.'
  },
  12: {
    authorityScore: 89,
    trustIndex: 91,
    visibilityReach: 210000,
    mediaFeatures: 18,
    articlesPublished: 32,
    searchRankImprovement: 186,
    audienceGrowth: 18.5,
    mentionsPerMonth: 42,
    inboundTrustSignals: 140,
    compoundEffect: 'Compounding Authority',
    compoundDesc: 'You are the reference in your field. Trust arrives before you do.'
  }
};

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1100 }) {
  const [displayed, setDisplayed] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef({ from: 0, startTime: null });

  useEffect(() => {
    startRef.current = { from: displayed, startTime: null };
    const animate = (ts) => {
      if (!startRef.current.startTime) startRef.current.startTime = ts;
      const elapsed = ts - startRef.current.startTime;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = startRef.current.from + (value - startRef.current.from) * eased;
      setDisplayed(cur);
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);

  const fmt =
  displayed >= 1000000 ? `${(displayed / 1000000).toFixed(1)}M` :
  displayed >= 1000 ? `${(displayed / 1000).toFixed(displayed >= 10000 ? 0 : 1)}K` :
  Math.round(displayed).toString();

  return <span>{prefix}{fmt}{suffix}</span>;
}

function ScoreRing({ score, label, color = '#C5A059', size = 80 }) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const dash = score / 100 * circ;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 80 80" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="40" cy="40" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
          <motion.circle
            cx="40" cy="40" r={r} fill="none"
            stroke={color} strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - dash }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
          
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl font-semibold" style={{ color }}>{Math.round(score)}</span>
        </div>
      </div>
      <p className="text-[10px] font-bold tracking-widest uppercase text-platinum/40 text-center">{label}</p>
    </div>);

}

function CompoundBar({ months, value, max, label }) {
  const pct = Math.round(value / max * 100);
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs text-platinum/40 w-8 flex-shrink-0">{months}mo</span>
      <div className="flex-1 bg-obsidian/60 rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-gold/60 to-gold"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} />
        
      </div>
      <span className="text-xs font-bold text-gold w-10 text-right">{value}</span>
    </div>);

}

export default function AuthorityCalculator() {
  const [ref, visible] = useScrollReveal();
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const [currentFollowers, setCurrentFollowers] = useState(500);
  const [currentMediaFeatures, setCurrentMediaFeatures] = useState(0);
  const [activeMonth, setActiveMonth] = useState(12);

  const proj = COMPOUND[activeMonth];
  const newFollowers = Math.round(currentFollowers * proj.audienceGrowth);
  const revenueUplift = Math.round(proj.trustIndex / 100 * selectedIndustry.avgClientValue * proj.inboundTrustSignals);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return null;








































































































































































































}