import { useState, useEffect, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

// ─── Plan Data ────────────────────────────────────────────────
const ONE_OFF_PLANS = [
  {
    name: 'Visibility Launch',
    badge: null,
    featured: false,
    heritage: false,
    desc: 'For professionals building their foundation in the Australian market.',
    price: '890',
    priceLabel: 'one-off',
    ctaLabel: 'Apply for Access',
    features: [
      'Personal brand strategy session',
      'Social media profile optimisation (2 platforms)',
      'Monthly content calendar and posting',
      '1 media pitch per month',
      'Google presence baseline setup',
      'Bilingual content available on request',
      'Brand positioning brief',
      'Initial digital authority audit',
    ],
  },
  {
    name: 'Media + Social',
    badge: 'Most Popular',
    secondBadge: 'Million Views Guaranteed',
    featured: true,
    heritage: false,
    desc: 'For professionals ready to dominate their industry with a full media and social presence.',
    price: '3,697',
    priceLabel: 'one-off',
    ctaLabel: 'Apply for Access',
    features: [
      'Everything in Visibility Launch, plus:',
      'Full brand architecture and narrative framework',
      'Social media management across LinkedIn, YouTube, Facebook, Reddit',
      'Weekly content creation and posting',
      'Ongoing media pitching and placement',
      'Google review and search authority growth',
      'Multilingual content across 2 language groups',
      'Podcast placement strategy',
    ],
  },
  {
    name: 'Supercharged Media + Social',
    badge: null,
    featured: false,
    heritage: false,
    desc: 'For leaders building a global reputation and long-term authority at maximum scale.',
    price: '7,860',
    priceLabel: 'one-off',
    ctaLabel: 'Apply for Access',
    features: [
      'Everything in Media + Social, plus:',
      'Dedicated brand strategist',
      'Multicultural positioning across 3+ community groups',
      'Specialised narrative drafting',
      'International media placement',
      'Full content production including video scripting',
      'Monthly 1:1 strategy sessions',
      'Priority access across all channels',
    ],
  },
];

const ANNUAL_PLANS = [
  {
    name: 'Foundation',
    badge: null,
    featured: false,
    heritage: false,
    desc: 'For professionals establishing a credible and consistent presence.',
    price: '798',
    priceLabel: 'per month',
    subNote: 'Billed quarterly — save $598/year',
    ctaLabel: 'Apply for Access',
    outcome: 'A credible, consistent presence that reflects your true level.',
    features: [
      'Authority audit and positioning brief',
      'Monthly strategic direction',
      'Initial digital profile optimisation',
      'Structured content cadence',
      'Foundational visibility and media support',
      'Ongoing presence refinement',
      'Brand narrative foundation',
      'Quarterly progress review',
    ],
  },
  {
    name: 'Ascent',
    badge: null,
    featured: false,
    heritage: false,
    desc: 'For professionals building recognition and upward momentum.',
    price: '1,598',
    priceLabel: 'per month',
    subNote: 'Billed quarterly — save $1,194/year',
    ctaLabel: 'Apply for Access',
    outcome: 'You move from visibility into recognition and trust.',
    features: [
      'Everything in Foundation, plus:',
      'Refined positioning and narrative development',
      'Ongoing digital biography evolution',
      'Bi-weekly strategic alignment',
      'Authored content creation and publication',
      'Structured media positioning',
      'Reputation management and search growth',
      'Multilingual presence across key markets',
    ],
  },
  {
    name: 'The Summit',
    badge: 'Most Chosen',
    secondBadge: 'Million Views Guaranteed',
    featured: true,
    heritage: false,
    desc: 'For professionals establishing clear authority within their field.',
    price: '3,840',
    priceLabel: 'per month',
    subNote: 'Billed quarterly — save $11,520/year',
    ctaLabel: 'Apply for Access',
    outcome: 'You become the recognised standard in your space.',
    features: [
      'Everything in Ascent, plus:',
      'Full authority and positioning strategy',
      'Managed presence across all major platforms and Instagram authority channels',
      'Priority media pitching with active feature placement',
      'Advanced competitor intelligence and positioning',
      'Target persona mapping and influence pathways',
      'Awards and association positioning',
      'Concierge-level support',
    ],
  },
  {
    name: 'Heritage',
    badge: 'Private Mandate',
    featured: false,
    heritage: true,
    desc: 'For individuals and principals requiring sustained authority at scale.',
    price: '25,600',
    priceLabel: 'per month',
    subNote: 'Billed quarterly — save $76,800/year · By invitation only',
    ctaLabel: 'Apply by Invitation',
    outcome: 'Authority that compounds across markets, carried before you speak.',
    features: [
      'Everything in The Summit, plus:',
      'Private mandate over narrative, presence, and perception',
      'Bi-weekly executive-level strategic direction',
      'International media positioning and visibility expansion',
      'High-level competitor intelligence and market control',
      'Precision audience mapping and influence structuring',
      'Thought leadership and long-form narrative development',
      'Strictly limited client allocation',
    ],
  },
];

const MONTHLY_PLANS = [
  {
    name: 'Foundation',
    badge: null,
    featured: false,
    heritage: false,
    desc: 'For professionals establishing a credible and consistent presence.',
    price: '997',
    priceLabel: 'per month',
    ctaLabel: 'Apply for Access',
    outcome: 'A credible, consistent presence that reflects your true level.',
    features: [
      'Authority audit and positioning brief',
      'Monthly strategic direction',
      'Initial digital profile optimisation',
      'Structured content cadence',
      'Foundational visibility and media support',
      'Ongoing presence refinement',
      'Brand narrative foundation',
      'Quarterly progress review',
    ],
  },
  {
    name: 'Ascent',
    badge: null,
    featured: false,
    heritage: false,
    desc: 'For professionals building recognition and upward momentum.',
    price: '1,997',
    priceLabel: 'per month',
    ctaLabel: 'Apply for Access',
    outcome: 'You move from visibility into recognition and trust.',
    features: [
      'Everything in Foundation, plus:',
      'Refined positioning and narrative development',
      'Ongoing digital biography evolution',
      'Bi-weekly strategic alignment',
      'Authored content creation and publication',
      'Structured media positioning',
      'Reputation management and search growth',
      'Multilingual presence across key markets',
    ],
  },
  {
    name: 'The Summit',
    badge: 'Most Chosen',
    secondBadge: 'Million Views Guaranteed',
    featured: true,
    heritage: false,
    desc: 'For professionals establishing clear authority within their field.',
    price: '4,800',
    priceLabel: 'per month',
    ctaLabel: 'Apply for Access',
    outcome: 'You become the recognised standard in your space.',
    features: [
      'Everything in Ascent, plus:',
      'Full authority and positioning strategy',
      'Managed presence across all major platforms and Instagram authority channels',
      'Priority media pitching with active feature placement',
      'Advanced competitor intelligence and positioning',
      'Target persona mapping and influence pathways',
      'Awards and association positioning',
      'Concierge-level support',
    ],
  },
  {
    name: 'Heritage',
    badge: 'Private Mandate',
    featured: false,
    heritage: true,
    desc: 'For individuals and principals requiring sustained authority at scale.',
    price: '32,000',
    priceLabel: 'per month',
    subNote: 'By invitation or referral only',
    ctaLabel: 'Apply by Invitation',
    outcome: 'Authority that compounds across markets, carried before you speak.',
    features: [
      'Everything in The Summit, plus:',
      'Private mandate over narrative, presence, and perception',
      'Bi-weekly executive-level strategic direction',
      'International media positioning and visibility expansion',
      'High-level competitor intelligence and market control',
      'Precision audience mapping and influence structuring',
      'Thought leadership and long-form narrative development',
      'Strictly limited client allocation',
    ],
  },
];

// ─── Card Component ───────────────────────────────────────────
function PricingCard({ plan, index }) {
  const [hovered, setHovered] = useState(false);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const isHeritage = plan.heritage;
  const isFeatured = plan.featured;

  // Card background & border based on tier
  const cardBg = isHeritage
    ? 'linear-gradient(160deg, #1A1510 0%, #0E0C09 100%)'
    : isFeatured
    ? 'linear-gradient(160deg, #FDFBF4 0%, #F8F4EA 100%)'
    : '#FFFFFF';

  const cardBorder = isHeritage
    ? hovered ? 'rgba(197,160,89,0.5)' : 'rgba(197,160,89,0.22)'
    : isFeatured
    ? hovered ? 'rgba(184,150,46,0.65)' : 'rgba(184,150,46,0.40)'
    : hovered ? 'rgba(184,150,46,0.32)' : 'rgba(184,150,46,0.14)';

  const nameColor = isHeritage ? '#D4B77A' : isFeatured ? '#6B4F10' : '#1A1510';
  const descColor = isHeritage ? 'rgba(210,195,160,0.52)' : 'rgba(30,25,15,0.48)';
  const priceColor = isHeritage ? '#C5A059' : isFeatured ? '#8A6E1E' : '#1A1510';
  const labelColor = isHeritage ? 'rgba(210,195,160,0.40)' : 'rgba(30,25,15,0.35)';
  const featureColor = isHeritage ? 'rgba(210,195,160,0.65)' : isFeatured ? 'rgba(40,30,10,0.70)' : 'rgba(30,25,15,0.55)';
  const dividerColor = isHeritage ? 'rgba(197,160,89,0.15)' : 'rgba(184,150,46,0.10)';
  const checkBg = isHeritage ? 'rgba(197,160,89,0.14)' : isFeatured ? 'rgba(184,150,46,0.18)' : 'rgba(184,150,46,0.08)';

  const ctaBg = isFeatured
    ? hovered ? '#9A7218' : '#B8962E'
    : isHeritage
    ? hovered ? 'rgba(197,160,89,0.22)' : 'rgba(197,160,89,0.12)'
    : hovered ? 'rgba(184,150,46,0.09)' : 'transparent';
  const ctaColor = isHeritage ? '#D4B77A' : isFeatured ? '#fff' : '#8A6E1E';
  const ctaBorder = isFeatured ? 'transparent' : isHeritage ? 'rgba(197,160,89,0.38)' : 'rgba(184,150,46,0.38)';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`pricing-card flex flex-col relative ${isFeatured ? 'featured' : ''}`}
      style={{
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        borderRadius: '12px',
        padding: 'clamp(28px,4vw,36px)',
        transition: 'transform 360ms cubic-bezier(0.16,1,0.3,1), box-shadow 360ms cubic-bezier(0.16,1,0.3,1), border-color 360ms ease',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? isHeritage
            ? '0 20px 60px rgba(0,0,0,0.35), 0 4px 20px rgba(197,160,89,0.14)'
            : isFeatured
            ? '0 20px 55px rgba(184,150,46,0.16), 0 4px 20px rgba(184,150,46,0.10)'
            : '0 14px 40px rgba(0,0,0,0.07), 0 4px 14px rgba(184,150,46,0.07)'
          : isHeritage
          ? '0 8px 32px rgba(0,0,0,0.28)'
          : isFeatured
          ? '0 6px 24px rgba(184,150,46,0.08)'
          : 'none',
        animationDelay: `${index * 80}ms`,
        animationFillMode: 'both',
      }}
    >
      {/* Sovereign top bar */}
      {isFeatured && (
        <div style={{
          position: 'absolute',
          top: 0, left: '12%', width: '76%', height: '2px',
          background: 'linear-gradient(to right, transparent, #B8962E, transparent)',
        }} />
      )}

      {/* Heritage top bar */}
      {isHeritage && (
        <div style={{
          position: 'absolute',
          top: 0, left: '8%', width: '84%', height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.6), transparent)',
        }} />
      )}

      {/* Badge row */}
      <div style={{ minHeight: '28px', marginBottom: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
        {plan.badge && (
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '8.5px',
            fontWeight: 700,
            letterSpacing: '0.20em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: '1px',
            background: isHeritage
              ? 'rgba(197,160,89,0.14)'
              : isFeatured
              ? '#B8962E'
              : 'rgba(184,150,46,0.08)',
            color: isHeritage ? '#C5A059' : isFeatured ? '#fff' : '#8A6E1E',
            border: isHeritage
              ? '1px solid rgba(197,160,89,0.32)'
              : isFeatured
              ? 'none'
              : '1px solid rgba(184,150,46,0.28)',
            display: 'inline-block',
          }}>
            {plan.badge}
          </span>
        )}
        {plan.secondBadge && (
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '8.5px',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            padding: '4px 12px',
            borderRadius: '1px',
            background: 'transparent',
            color: isFeatured ? '#B8962E' : '#C5A059',
            border: `1px solid ${isFeatured ? 'rgba(184,150,46,0.50)' : 'rgba(197,160,89,0.40)'}`,
            display: 'inline-block',
          }}>
            {plan.secondBadge}
          </span>
        )}
      </div>

      {/* Plan name */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 'clamp(22px,2.2vw,28px)',
        fontWeight: 600,
        color: nameColor,
        lineHeight: 1.15,
        marginBottom: '10px',
        letterSpacing: '0.01em',
      }}>
        {plan.name}
      </h3>

      {/* Desc */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        fontWeight: 300,
        color: descColor,
        lineHeight: 1.75,
        marginBottom: '24px',
      }}>
        {plan.desc}
      </p>

      {/* Price block */}
      <div style={{
        marginBottom: '26px',
        paddingBottom: '26px',
        borderBottom: `1px solid ${dividerColor}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '7px', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isHeritage ? '38px' : 'clamp(36px,4vw,46px)',
            fontWeight: 700,
            color: priceColor,
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}>
            ${plan.price}
          </span>
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 400,
            color: labelColor,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>
            {plan.priceLabel}
          </span>
        </div>
        {plan.subNote && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            color: 'rgba(197,160,89,0.50)',
            marginTop: '7px',
            letterSpacing: '0.05em',
            fontStyle: 'italic',
          }}>
            {plan.subNote}
          </p>
        )}
      </div>

      {/* Features */}
      <ul style={{ flex: 1, listStyle: 'none', padding: 0, margin: '0 0 22px 0' }} role="list">
        {plan.features.map((feature, i) => (
          <li key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '11px',
            padding: '7px 0',
            borderBottom: i < plan.features.length - 1 ? `1px solid ${dividerColor}` : 'none',
          }}>
            <span aria-hidden="true" style={{
              flexShrink: 0,
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              border: `1px solid ${isHeritage ? 'rgba(197,160,89,0.30)' : 'rgba(184,150,46,0.32)'}`,
              background: checkBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '3px',
            }}>
              <svg width="6" height="5" viewBox="0 0 7 5" fill="none">
                <polyline points="0.5,2.5 2.5,4.5 6.5,0.5"
                  stroke={isHeritage ? '#C5A059' : '#B8962E'}
                  strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: featureColor,
              lineHeight: 1.55,
            }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* Outcome */}
      {plan.outcome && (
        <div style={{ margin: '0 0 22px 0' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '9.5px',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: isHeritage ? 'rgba(197,160,89,0.70)' : 'rgba(184,150,46,0.55)',
            marginBottom: '6px',
          }}>What you achieve</p>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '15px',
            fontWeight: 500,
            fontStyle: 'italic',
            color: isHeritage ? 'rgba(210,195,160,0.72)' : isFeatured ? 'rgba(30,25,15,0.72)' : 'rgba(30,25,15,0.56)',
            lineHeight: 1.5,
          }}>
            {plan.outcome}
          </p>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={() => scrollTo('#contact')}
        style={{
          width: '100%',
          padding: '14px 24px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '10.5px',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 280ms cubic-bezier(0.16,1,0.3,1)',
          background: ctaBg,
          color: ctaColor,
          border: `1px solid ${ctaBorder}`,
        }}
      >
        {plan.ctaLabel || 'Apply for Access'}
      </button>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────
export default function PricingSection() {
  const [sectionRef, visible] = useScrollReveal(0.05);
  const [activeTab, setActiveTab] = useState('monthly');
  const [displayTab, setDisplayTab] = useState('monthly');
  const [gridPhase, setGridPhase] = useState('in');
  const tabRefs = useRef({});
  const pillRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const tabs = [
    { key: 'oneoff', label: 'One-Off' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'annual', label: 'Annual', badge: 'Save 20%' },
  ];

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    const pill = pillRef.current;
    if (el && pill) {
      const pillRect = pill.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setPillStyle({ left: elRect.left - pillRect.left - 4, width: elRect.width });
    }
  }, [activeTab]);

  const handleTabChange = (key) => {
    if (key === activeTab) return;
    setGridPhase('out');
    setTimeout(() => {
      setDisplayTab(key);
      setActiveTab(key);
      setGridPhase('in');
    }, 240);
  };

  const plans = displayTab === 'oneoff' ? ONE_OFF_PLANS : displayTab === 'annual' ? ANNUAL_PLANS : MONTHLY_PLANS;

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{
        backgroundImage: 'url(https://media.base44.com/images/public/69d7417eefb273dfd04436bb/a293fd6be_AusfamousPricingBG.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: 'clamp(90px,9vw,120px) 0 clamp(90px,9vw,110px)',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Dark overlay over background image */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(10,9,7,0.88) 0%, rgba(15,12,8,0.82) 50%, rgba(10,9,7,0.90) 100%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Decorative rules */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.40), transparent)',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(197,160,89,0.20), transparent)',
        zIndex: 1,
      }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          {/* Ornament */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '22px' }}>
            <div style={{ width: '40px', height: '1px', background: 'rgba(184,150,46,0.35)' }} />
            <div style={{ width: '5px', height: '5px', transform: 'rotate(45deg)', background: '#B8962E', opacity: 0.6 }} />
            <div style={{ width: '40px', height: '1px', background: 'rgba(184,150,46,0.35)' }} />
          </div>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: '#B8962E',
            marginBottom: '18px',
          }}>
            Mandates & Retainers
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(36px,4.5vw,58px)',
            fontWeight: 600,
            color: '#E8DFC8',
            lineHeight: 1.06,
            letterSpacing: '-0.015em',
            marginBottom: '18px',
          }}>
            Control how the world sees you.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            fontWeight: 300,
            color: 'rgba(220,205,170,0.55)',
            lineHeight: 1.85,
            maxWidth: '460px',
            margin: '0 auto',
          }}>
            All engagements begin with a complimentary brand strategy consultation. Pricing is confirmed after your call.
          </p>
        </div>

        {/* Tab Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', marginBottom: '52px' }}>
          <div
            ref={pillRef}
            role="tablist"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              background: 'rgba(20,16,10,0.75)',
              border: '1px solid rgba(197,160,89,0.22)',
              backdropFilter: 'blur(8px)',
              borderRadius: '2px',
              padding: '4px',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '4px',
              height: 'calc(100% - 8px)',
              left: `${pillStyle.left + 4}px`,
              width: `${pillStyle.width}px`,
              background: '#C5A059',
              borderRadius: '1px',
              transition: 'left 300ms cubic-bezier(0.16,1,0.3,1), width 300ms cubic-bezier(0.16,1,0.3,1)',
              pointerEvents: 'none',
            }} />
            {tabs.map((tab) => (
              <button
                key={tab.key}
                ref={el => tabRefs.current[tab.key] = el}
                role="tab"
                aria-selected={activeTab === tab.key}
                onClick={() => handleTabChange(tab.key)}
                style={{
                  position: 'relative',
                  zIndex: 1,
                  padding: '10px 28px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10.5px',
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  borderRadius: '1px',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'transparent',
                  color: activeTab === tab.key ? '#0A0907' : 'rgba(197,160,89,0.50)',
                  transition: 'color 250ms ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
                {tab.badge && (
                  <span style={{
                    fontSize: '8px',
                    fontWeight: 700,
                    letterSpacing: '0.10em',
                    padding: '2px 7px',
                    borderRadius: '1px',
                    background: activeTab === tab.key ? 'rgba(0,0,0,0.20)' : 'rgba(197,160,89,0.15)',
                    color: activeTab === tab.key ? '#0A0907' : '#C5A059',
                    marginLeft: '4px',
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '9.5px',
            color: 'rgba(197,160,89,0.30)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
          }}>
            Limited mandates accepted each quarter
          </p>
        </div>

        {/* Cards */}
        <div
          role="tabpanel"
          style={{
            opacity: gridPhase === 'out' ? 0 : 1,
            transform: gridPhase === 'out' ? 'translateY(12px)' : 'translateY(0)',
            transition: 'opacity 260ms ease, transform 260ms ease',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: '64px', textAlign: 'center' }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px',
          }}>
            <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'rgba(184,150,46,0.15)' }} />
            <div style={{ width: '4px', height: '4px', transform: 'rotate(45deg)', background: 'rgba(184,150,46,0.35)' }} />
            <div style={{ flex: 1, maxWidth: '120px', height: '1px', background: 'rgba(184,150,46,0.15)' }} />
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            color: 'rgba(197,160,89,0.35)',
            marginBottom: '8px',
          }}>
            Unsure which mandate suits your current stage?
          </p>
          <button
            onClick={() => scrollTo('#contact')}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '16px',
              fontStyle: 'italic',
              color: '#C5A059',
              background: 'none',
              border: 'none',
              borderBottom: '1px solid rgba(197,160,89,0.30)',
              paddingBottom: '2px',
              cursor: 'pointer',
              transition: 'border-color 250ms ease, color 250ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderBottomColor = 'rgba(197,160,89,0.70)';
              e.currentTarget.style.color = '#D4B77A';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderBottomColor = 'rgba(197,160,89,0.30)';
              e.currentTarget.style.color = '#C5A059';
            }}
          >
            Request a private consultation.
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeUpCard {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pricing-card {
          animation: fadeUpCard 600ms cubic-bezier(0.16,1,0.3,1) both;
        }
      `}</style>
    </section>
  );
}