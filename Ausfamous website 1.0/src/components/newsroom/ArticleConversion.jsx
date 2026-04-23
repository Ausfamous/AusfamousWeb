export default function ArticleConversion() {
  const scrollTo = () => {
    window.location.href = '/#contact';
  };

  return (
    <div style={{ padding: 'clamp(64px,8vw,96px) 0', background: 'linear-gradient(160deg, #F8F4EA 0%, #FDFBF4 100%)', borderTop: '1px solid rgba(184,150,46,0.12)' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)', textAlign: 'center' }}>
        {/* Ornament */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '28px' }}>
          <div style={{ width: '40px', height: '1px', background: 'rgba(184,150,46,0.30)' }} />
          <div style={{ width: '5px', height: '5px', transform: 'rotate(45deg)', background: '#B8962E', opacity: 0.5 }} />
          <div style={{ width: '40px', height: '1px', background: 'rgba(184,150,46,0.30)' }} />
        </div>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(138,110,30,0.60)', marginBottom: '18px' }}>
          What's Next
        </p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 600, color: '#1A1510', lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: '16px' }}>
          Build your visibility with Ausfamous.
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, color: 'rgba(30,25,15,0.50)', lineHeight: 1.80, marginBottom: '36px', maxWidth: '460px', margin: '0 auto 36px' }}>
          The professionals featured here didn't wait. They chose to engineer their authority before the market defined them.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={scrollTo}
            style={{ padding: '14px 36px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: '#C5A059', color: '#0A0B0D', border: 'none', borderRadius: '2px', cursor: 'pointer', transition: 'background 220ms ease' }}
            onMouseEnter={e => e.currentTarget.style.background = '#D4B77A'}
            onMouseLeave={e => e.currentTarget.style.background = '#C5A059'}
          >
            Get a Personal Brand Audit
          </button>
          <button
            onClick={scrollTo}
            style={{ padding: '14px 36px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', color: '#C5A059', border: '1px solid rgba(197,160,89,0.35)', borderRadius: '2px', cursor: 'pointer', transition: 'all 220ms ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.08)'; e.currentTarget.style.borderColor = 'rgba(197,160,89,0.60)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(197,160,89,0.35)'; }}
          >
            View Our Mandates
          </button>
        </div>
      </div>
    </div>
  );
}