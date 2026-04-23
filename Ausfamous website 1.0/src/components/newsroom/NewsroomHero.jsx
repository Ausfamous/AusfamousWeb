import { useRef } from 'react';
import { Search } from 'lucide-react';

export default function NewsroomHero({ search, setSearch }) {
  const inputRef = useRef(null);

  return (
    <section style={{
      paddingTop: 'clamp(120px,14vw,180px)',
      paddingBottom: 'clamp(60px,7vw,90px)',
      position: 'relative',
      overflow: 'hidden',
      background: 'linear-gradient(160deg, #FDFBF4 0%, #F8F4EA 60%, #FDFAF5 100%)',
      borderBottom: '1px solid rgba(184,150,46,0.15)',
    }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '300px', background: 'radial-gradient(ellipse, rgba(197,160,89,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Ornament */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '22px' }}>
          <div style={{ width: '40px', height: '1px', background: 'rgba(184,150,46,0.40)' }} />
          <div style={{ width: '5px', height: '5px', transform: 'rotate(45deg)', background: '#B8962E', opacity: 0.7 }} />
          <div style={{ width: '40px', height: '1px', background: 'rgba(184,150,46,0.40)' }} />
        </div>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: '#B8962E', marginBottom: '18px' }}>
          Ausfamous
        </p>

        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(42px,5.5vw,72px)', fontWeight: 600, color: '#1A1510', lineHeight: 1.04, letterSpacing: '-0.02em', marginBottom: '20px' }}>
          Newsroom
        </h1>

        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(13px,1.4vw,15px)', fontWeight: 300, color: 'rgba(30,22,10,0.52)', lineHeight: 1.85, maxWidth: '520px', margin: '0 auto 14px' }}>
          Media visibility, insights, and authority building — in real time.
        </p>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontStyle: 'italic', color: 'rgba(184,150,46,0.70)', marginBottom: '40px' }}>
          Strategic visibility across media, search, and global digital presence
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto' }}>
          <Search size={14} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(184,150,46,0.50)', pointerEvents: 'none' }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search releases, insights, placements…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 16px 14px 40px',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              background: '#FFFFFF',
              border: '1px solid rgba(184,150,46,0.28)',
              borderRadius: '2px',
              color: '#1A1510',
              outline: 'none',
              boxShadow: '0 2px 12px rgba(184,150,46,0.06)',
              boxSizing: 'border-box',
              transition: 'border-color 220ms ease, box-shadow 220ms ease',
            }}
            onFocus={e => { e.target.style.borderColor = 'rgba(184,150,46,0.65)'; e.target.style.boxShadow = '0 2px 16px rgba(184,150,46,0.12)'; }}
            onBlur={e => { e.target.style.borderColor = 'rgba(184,150,46,0.28)'; e.target.style.boxShadow = '0 2px 12px rgba(184,150,46,0.06)'; }}
          />
        </div>
      </div>
    </section>
  );
}