import { useState, useEffect, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

// ─── Plan Data ────────────────────────────────────────────────
const ONE_OFF_PLANS = [
  {
    name: 'Visibility Launch',
    badge: null,
    featured: false,
    desc: 'For professionals building their foundation in the Australian market.',
    price: '890',
    priceLabel: 'one-off',
    features: [
      'Personal brand strategy session',
      'Social media profile optimisation (2 platforms)',
      'Monthly content calendar and posting',
      '1 media pitch per month',
      'Google presence baseline setup',
      'Bilingual content available on request',
    ],
  },
  {
    name: 'Media + Social',
    badge: 'Most Popular',
    featured: true,
    desc: 'For professionals ready to dominate their industry with a full media and social presence.',
    price: '3,697',
    priceLabel: 'one-off',
    features: [
      'Full brand architecture and narrative framework',
      'Social media management across LinkedIn, YouTube, Facebook, Reddit',
      'Weekly content creation and posting',
      'Ongoing media pitching and placement',
      'Google review and search authority growth',
      'Multilingual content across 2 language groups',
      'Podcast placement strategy',
      'Quarterly strategy review',
    ],
  },
  {
    name: 'Supercharged Media + Social',
    badge: null,
    featured: false,
    desc: 'For leaders building a global reputation and long-term authority at maximum scale.',
    price: '7,860',
    priceLabel: 'one-off',
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

const MONTHLY_PLANS = [
  {
    name: 'Starter',
    badge: null,
    featured: false,
    desc: 'For professionals building consistent market visibility each month.',
    price: '997',
    priceLabel: 'per month',
    annualPrice: '798',
    annualSaving: '2,394',
    features: [
      'Monthly strategy alignment and direction',
      'Social media management on 2 priority channels',
      'Weekly content publishing cadence',
      'Monthly media outreach sprint',
      'Monthly reporting and optimisation',
      'Flexible language support on request',
    ],
  },
  {
    name: 'Momentum',
    badge: null,
    featured: false,
    desc: 'For professionals scaling influence with steady, measurable momentum.',
    price: '1,997',
    priceLabel: 'per month',
    annualPrice: '1,598',
    annualSaving: '4,794',
    features: [
      'Advanced brand positioning and narrative updates',
      'Multi-platform management across LinkedIn, YouTube, Facebook, Reddit',
      'Weekly content creation, editing, and posting',
      'Ongoing media pitching and placement support',
      'Google search and reputation growth actions',
      'Multilingual content across 2 language groups',
      'Quarterly authority growth review',
    ],
  },
  {
    name: 'Authority Engine',
    badge: null,
    featured: false,
    desc: 'For professionals who want to lead every conversation in their industry.',
    price: '3,997',
    priceLabel: 'per month',
    annualPrice: '3,198',
    annualSaving: '9,594',
    features: [
      'Full-spectrum brand domination strategy',
      'All platforms managed — LinkedIn, YouTube, Facebook, Reddit + more',
      'Daily content creation, editing, and publishing',
      'Priority media pitching and feature placement',
      'Multilingual content across 3 language groups',
      'Dedicated senior strategist and weekly check-ins',
      'Podcast, speaking, and award submission support',
      'Real-time analytics and authority dashboard',
    ],
  },
  {
    name: 'Authority Domination',
    badge: 'Most Chosen',
    featured: true,
    desc: 'For industry leaders who demand total market dominance and sustained authority.',
    price: '6,997',
    priceLabel: 'per month',
    annualPrice: '5,598',
    annualSaving: '16,794',
    features: [
      'Everything in Authority Engine, plus:',
      'Dedicated senior strategist and monthly 1:1 sessions',
      'International visibility and media opportunities',
      'Thought-leadership content and video scripting support',
      'Priority execution across all active channels',
      'Executive-level strategic advisory access',
    ],
  },
  {
    name: 'Market Ownership',
    badge: null,
    featured: false,
    desc: 'For organisations and principals who require full-market brand dominance at the highest level.',
    price: null,
    priceLabel: 'per month',
    annualPrice: null,
    annualSaving: '28,560',
    features: [
      'Bespoke engagement — fully customised scope',
      'Dedicated team across strategy, content, and media',
      'Unlimited platform and language coverage',
      'Board and executive personal brand management',
      'International and national media domination',
      'Direct access to founding team',
    ],
  },
];

// ─── Card Component ───────────────────────────────────────────
function PricingCard({ plan, isAnnual }) {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`pricing-card flex flex-col relative ${plan.featured ? 'featured' : ''}`}
      style={{
        background: plan.featured ? '#FDFBF5' : '#FFFFFF',
        border: `1px solid ${plan.featured ? 'rgba(184,150,46,0.38)' : 'rgba(184,150,46,0.13)'}`,
        borderRadius: '4px',
        padding: 'clamp(24px,4vw,32px)',
        transition: 'transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease',
      }}
    >
      {/* Featured top rule */}
      {plan.featured && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: '16%',
          width: '68%',
          height: '2px',
          background: 'linear-gradient(to right, transparent, #B8962E, transparent)',
        }} />
      )}

      {/* Badge row — always same height */}
      <div style={{ minHeight: '26px', marginBottom: '14px' }}>
        {plan.badge ? (
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '3px 11px',
            borderRadius: '2px',
            background: plan.featured ? '#B8962E' : 'rgba(184,150,46,0.09)',
            color: plan.featured ? '#fff' : '#8A6E1E',
            border: plan.featured ? 'none' : '1px solid rgba(184,150,46,0.32)',
            display: 'inline-block',
          }}>
            {plan.badge}
          </span>
        ) : null}
      </div>

      {/* Plan name */}
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '22px',
        fontWeight: 600,
        color: '#1A1510',
        lineHeight: 1.2,
        marginBottom: '8px',
      }}>
        {plan.name}
      </h3>

      {/* Description */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '13px',
        fontWeight: 300,
        color: 'rgba(30,25,15,0.50)',
        lineHeight: 1.7,
        marginBottom: '22px',
      }}>
        {plan.desc}
      </p>

      {/* Price */}
      <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(184,150,46,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
          {(isAnnual ? plan.annualPrice : plan.price) ? (
            <>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '42px',
                fontWeight: 700,
                color: plan.featured ? '#8A6E1E' : '#1A1510',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}>
                ${isAnnual ? plan.annualPrice : plan.price}
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '11px',
                fontWeight: 400,
                color: 'rgba(30,25,15,0.35)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}>
                {isAnnual ? 'per month' : plan.priceLabel}
              </span>
            </>
          ) : (
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '32px',
              fontWeight: 600,
              color: plan.featured ? '#8A6E1E' : '#1A1510',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}>
              Call to discuss
            </span>
          )}
        </div>
        {isAnnual && (
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 300,
            color: 'rgba(30,25,15,0.40)',
            marginTop: '6px',
            lineHeight: 1.5,
          }}>
            {plan.annualPrice
              ? <>Billed monthly, annual lock-in &nbsp;·&nbsp; <strong style={{ color: '#8A6E1E' }}>save ${plan.annualSaving}/year</strong></>
              : <strong style={{ color: '#8A6E1E', fontSize: '12px' }}>Save ${plan.annualSaving}/year, strongest annual ROI</strong>
            }
          </p>
        )}
      </div>

      {/* Features */}
      <ul style={{ flex: 1, listStyle: 'none', padding: 0, margin: '0 0 24px 0' }} role="list">
        {plan.features.map((feature, i) => (
          <li key={i} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '7px 0',
            borderBottom: i < plan.features.length - 1 ? '1px solid rgba(184,150,46,0.08)' : 'none',
          }}>
            <span
              aria-hidden="true"
              style={{
                flexShrink: 0,
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                border: '1px solid rgba(184,150,46,0.36)',
                background: plan.featured ? 'rgba(184,150,46,0.16)' : 'rgba(184,150,46,0.09)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '2px',
              }}
            >
              <svg width="7" height="5" viewBox="0 0 7 5" fill="none">
                <polyline points="0.5,2.5 2.5,4.5 6.5,0.5" stroke="#B8962E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: plan.featured ? 'rgba(50,40,20,0.72)' : 'rgba(30,25,15,0.55)',
              lineHeight: 1.5,
            }}>
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => scrollTo('#contact')}
        className="pricing-cta"
        style={{
          width: '100%',
          padding: '13px 24px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          borderRadius: '2px',
          cursor: 'pointer',
          transition: 'all 200ms ease',
          background: plan.featured ? '#B8962E' : 'transparent',
          color: plan.featured ? '#fff' : '#8A6E1E',
          border: plan.featured ? '1px solid #B8962E' : '1px solid rgba(184,150,46,0.42)',
        }}
        onMouseEnter={e => {
          if (plan.featured) {
            e.currentTarget.style.background = '#A0821A';
            e.currentTarget.style.borderColor = '#A0821A';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(184,150,46,0.28)';
          } else {
            e.currentTarget.style.background = 'rgba(184,150,46,0.07)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(184,150,46,0.10)';
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = plan.featured ? '#B8962E' : 'transparent';
          e.currentTarget.style.borderColor = plan.featured ? '#B8962E' : 'rgba(184,150,46,0.42)';
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.transform = 'none';
        }}
      >
        Book Free Strategy Call
      </button>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────
export default function PricingSection() {
  const [sectionRef, visible] = useScrollReveal(0.08);
  const [activeTab, setActiveTab] = useState('monthly');
  const [displayTab, setDisplayTab] = useState('monthly');
  const [gridPhase, setGridPhase] = useState('in'); // 'out' | 'in'
  const tabRefs = useRef({});
  const pillRef = useRef(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  const tabs = [
    { key: 'oneoff', label: 'One-Off' },
    { key: 'monthly', label: 'Monthly' },
    { key: 'annual', label: 'Annual', badge: 'Save 20%' },
  ];

  // Update sliding pill position
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    const pill = pillRef.current;
    if (el && pill) {
      const pillRect = pill.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      setPillStyle({
        left: elRect.left - pillRect.left - 4,
        width: elRect.width,
      });
    }
  }, [activeTab]);

  const handleTabChange = (key) => {
    if (key === activeTab) return;
    setGridPhase('out');
    setTimeout(() => {
      setDisplayTab(key);
      setActiveTab(key);
      setGridPhase('in');
    }, 220);
  };

  const plans = displayTab === 'oneoff' ? ONE_OFF_PLANS : MONTHLY_PLANS;
  const isAnnual = displayTab === 'annual';

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      style={{
        background: '#FEFCF8',
        padding: 'clamp(80px,8vw,110px) 0 clamp(80px,8vw,100px)',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 850ms cubic-bezier(0.16,1,0.3,1), transform 850ms cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Top gold rule */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(184,150,46,0.35), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px,5vw,40px)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#B8962E',
            marginBottom: '18px',
          }}>
            Packages
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(34px,4.5vw,56px)',
            fontWeight: 600,
            color: '#1A1510',
            lineHeight: 1.08,
            letterSpacing: '-0.015em',
            marginBottom: '16px',
          }}>
            Control how the world sees you.
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '15px',
            fontWeight: 300,
            color: 'rgba(30,25,15,0.50)',
            lineHeight: 1.8,
            maxWidth: '500px',
            margin: '0 auto 10px',
          }}>
            All packages include a Free Personal Brand Strategy Consultation before any commitment. Pricing is confirmed after your strategy call.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11.5px',
            color: 'rgba(30,25,15,0.32)',
          }}>
            Choose the structure that fits your growth stage. Save 20% with Annual plans.
          </p>
        </div>

        {/* Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '48px' }}>
          <div
            ref={pillRef}
            role="tablist"
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              background: '#F5F1E8',
              border: '1px solid rgba(184,150,46,0.20)',
              borderRadius: '40px',
              padding: '4px',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Sliding active pill */}
            <div style={{
              position: 'absolute',
              top: '4px',
              height: 'calc(100% - 8px)',
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              background: '#B8962E',
              borderRadius: '30px',
              boxShadow: '0 2px 14px rgba(184,150,46,0.32)',
              transition: 'left 260ms cubic-bezier(0.16,1,0.3,1), width 260ms cubic-bezier(0.16,1,0.3,1)',
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
                  padding: '9px 22px',
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  borderRadius: '30px',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'transparent',
                  color: activeTab === tab.key ? '#fff' : 'rgba(30,25,15,0.40)',
                  transition: 'color 200ms ease',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {tab.label}
                {tab.badge && (
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '8px',
                    fontWeight: 700,
                    letterSpacing: '0.10em',
                    padding: '2px 6px',
                    borderRadius: '10px',
                    background: activeTab === tab.key ? 'rgba(255,255,255,0.25)' : 'rgba(184,150,46,0.13)',
                    color: activeTab === tab.key ? '#fff' : '#7A5F15',
                  }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '10px',
            color: 'rgba(30,25,15,0.27)',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
          }}>
            Limited onboarding capacity each month.
          </p>
        </div>

        {/* Card Grid */}
        <div
          role="tabpanel"
          style={{
            opacity: gridPhase === 'out' ? 0 : 1,
            transform: gridPhase === 'out' ? 'translateY(14px)' : 'translateY(0)',
            transition: 'opacity 220ms ease, transform 220ms ease',
            display: 'grid',
            gridTemplateColumns: plans.length === 3
              ? 'repeat(auto-fit, minmax(280px, 1fr))'
              : 'repeat(auto-fit, minmax(244px, 1fr))',
            gap: '18px',
            alignItems: 'stretch',
          }}
        >
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>

        {/* Section footer */}
        <div style={{ marginTop: '58px' }}>
          <div style={{ height: '1px', background: 'rgba(184,150,46,0.11)', marginBottom: '24px' }} />
          <div style={{ textAlign: 'center' }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: 'rgba(30,25,15,0.30)',
              marginBottom: '6px',
            }}>
              Not sure which tier suits your goals?
            </p>
            <button
              onClick={() => scrollTo('#contact')}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '13px',
                color: '#8A6E1E',
                letterSpacing: '0.04em',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid rgba(184,150,46,0.32)',
                paddingBottom: '2px',
                cursor: 'pointer',
                transition: 'border-color 200ms ease',
              }}
              onMouseEnter={e => e.currentTarget.style.borderBottomColor = 'rgba(184,150,46,0.72)'}
              onMouseLeave={e => e.currentTarget.style.borderBottomColor = 'rgba(184,150,46,0.32)'}
            >
              Book a strategy call.
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (hover: hover) {
          .pricing-card:hover {
            transform: translateY(-4px) scale(1.01) !important;
          }
          .pricing-card:not(.featured):hover {
            box-shadow: 0 14px 38px rgba(0,0,0,0.07), 0 4px 14px rgba(184,150,46,0.06) !important;
            border-color: rgba(184,150,46,0.28) !important;
          }
          .pricing-card.featured:hover {
            box-shadow: 0 16px 50px rgba(184,150,46,0.15), 0 4px 18px rgba(184,150,46,0.09) !important;
            border-color: rgba(184,150,46,0.58) !important;
          }
        }
        *:focus-visible { outline: 2px solid #B8962E; outline-offset: 3px; }
      `}</style>
    </section>
  );
}