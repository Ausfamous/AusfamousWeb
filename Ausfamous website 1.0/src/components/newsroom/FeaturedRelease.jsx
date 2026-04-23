import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

export default function FeaturedRelease({ article, light }) {
  const date = article.publish_date
    ? new Date(article.publish_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const headlineColor = light ? '#1A1510' : '#E8DFC8';
  const subColor = light ? 'rgba(30,22,10,0.52)' : 'rgba(220,205,170,0.52)';
  const metaColor = light ? 'rgba(30,22,10,0.42)' : 'rgba(197,160,89,0.45)';
  const labelColor = light ? 'rgba(184,150,46,0.65)' : 'rgba(184,150,46,0.55)';
  const borderColor = light ? 'rgba(184,150,46,0.18)' : 'rgba(197,160,89,0.10)';
  const ctaColor = light ? '#8A6E1E' : '#C5A059';

  return (
    <div style={{ margin: '56px 0 0', borderTop: `1px solid ${borderColor}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 0 24px' }}>
        <div style={{ width: '4px', height: '4px', transform: 'rotate(45deg)', background: '#B8962E', opacity: 0.7 }} />
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', color: labelColor }}>Featured Release</span>
      </div>

      <Link to={`/newsroom/${article.slug}`} style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: article.cover_image ? '1fr 420px' : '1fr', gap: '40px', alignItems: 'center' }}>
        <div>
          {article.category && (
            <span style={{ display: 'inline-block', fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: '#8A6E1E', border: '1px solid rgba(184,150,46,0.30)', background: light ? 'rgba(184,150,46,0.06)' : 'transparent', padding: '4px 12px', borderRadius: '1px', marginBottom: '20px' }}>
              {article.category}
            </span>
          )}
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, color: headlineColor, lineHeight: 1.1, letterSpacing: '-0.015em', marginBottom: '14px' }}>
            {article.headline}
          </h2>
          {article.subheadline && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', fontWeight: 300, color: subColor, lineHeight: 1.75, marginBottom: '24px', maxWidth: '560px' }}>
              {article.subheadline}
            </p>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
            {date && <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: metaColor }}><Calendar size={11} />{date}</span>}
            {article.location && <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: metaColor }}><MapPin size={11} />{article.location}</span>}
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: ctaColor, borderBottom: `1px solid ${ctaColor}50`, paddingBottom: '2px' }}>
            Read Full Release <ArrowRight size={12} />
          </span>
        </div>

        {article.cover_image && (
          <div style={{ position: 'relative', borderRadius: '6px', overflow: 'hidden', aspectRatio: '16/10', boxShadow: light ? '0 8px 32px rgba(30,22,10,0.12)' : 'none' }}>
            <img
              src={article.cover_image}
              alt={article.headline}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 600ms ease' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, transparent 40%, rgba(10,9,7,0.30) 100%)' }} />
          </div>
        )}
      </Link>
    </div>
  );
}