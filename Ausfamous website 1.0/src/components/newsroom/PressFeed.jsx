import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const BADGE_COLORS = {
  'Featured':       { bg: 'rgba(197,160,89,0.12)', color: '#8A6E1E', border: 'rgba(184,150,46,0.30)' },
  'Media Placement':{ bg: 'rgba(91,168,91,0.08)',  color: '#3A7A3A', border: 'rgba(91,168,91,0.25)' },
  'Announcement':   { bg: 'rgba(91,143,197,0.08)', color: '#2A5FA0', border: 'rgba(91,143,197,0.25)' },
  'Case Release':   { bg: 'rgba(197,130,89,0.08)', color: '#8A4E1E', border: 'rgba(197,130,89,0.25)' },
};

function PressItem({ article, light }) {
  const date = article.publish_date
    ? new Date(article.publish_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
    : '';
  const badge = article.badge && BADGE_COLORS[article.badge];

  const headlineColor = light ? '#1A1510' : '#E8DFC8';
  const subColor = light ? 'rgba(30,22,10,0.50)' : 'rgba(220,205,170,0.45)';
  const metaColor = light ? 'rgba(30,22,10,0.40)' : 'rgba(197,160,89,0.40)';
  const catColor = light ? 'rgba(138,110,30,0.80)' : 'rgba(184,150,46,0.65)';
  const catBorder = light ? 'rgba(184,150,46,0.25)' : 'rgba(184,150,46,0.20)';
  const dividerColor = light ? 'rgba(184,150,46,0.12)' : 'rgba(197,160,89,0.07)';
  const ctaColor = light ? '#8A6E1E' : 'rgba(197,160,89,0.55)';

  return (
    <Link
      to={`/newsroom/${article.slug}`}
      style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: article.cover_image ? '96px 1fr' : '1fr', gap: '20px', padding: '24px 0', borderBottom: `1px solid ${dividerColor}`, alignItems: 'flex-start', transition: 'opacity 220ms ease' }}
      onMouseEnter={e => e.currentTarget.style.opacity = '0.75'}
      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
    >
      {article.cover_image && (
        <div style={{ borderRadius: '4px', overflow: 'hidden', aspectRatio: '1/1', flexShrink: 0, boxShadow: light ? '0 2px 10px rgba(30,22,10,0.08)' : 'none' }}>
          <img src={article.cover_image} alt={article.headline} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          {article.category && (
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: catColor, border: `1px solid ${catBorder}`, background: light ? 'rgba(184,150,46,0.05)' : 'transparent', padding: '3px 10px', borderRadius: '1px' }}>
              {article.category}
            </span>
          )}
          {badge && (
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', background: badge.bg, color: badge.color, border: `1px solid ${badge.border}`, padding: '3px 10px', borderRadius: '1px' }}>
              {article.badge}
            </span>
          )}
        </div>
        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(18px,2vw,22px)', fontWeight: 600, color: headlineColor, lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: '8px' }}>
          {article.headline}
        </h3>
        {article.subheadline && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 300, color: subColor, lineHeight: 1.65, marginBottom: '12px' }}>
            {article.subheadline}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {date && <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: metaColor }}><Calendar size={10} />{date}</span>}
          {article.reading_time && <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: metaColor }}><Clock size={10} />{article.reading_time} min read</span>}
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: ctaColor, marginLeft: 'auto' }}>
            Read <ArrowRight size={10} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function PressFeed({ articles, light }) {
  return (
    <div>
      {articles.map(article => (
        <PressItem key={article.id} article={article} light={light} />
      ))}
    </div>
  );
}