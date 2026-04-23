import { Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft, ExternalLink } from 'lucide-react';

export default function ArticleHeader({ article }) {
  const date = article.publish_date
    ? new Date(article.publish_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const share = (platform) => {
    const urls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.headline)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard?.writeText(shareUrl);
  };

  return (
    <div style={{ paddingTop: 'clamp(100px,12vw,150px)', paddingBottom: '0', background: 'linear-gradient(160deg, #F8F4EA 0%, #FDFBF4 60%, #FAFAF8 100%)', borderBottom: '1px solid rgba(184,150,46,0.12)' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px) 56px' }}>
        {/* Back link */}
        <Link to="/newsroom" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(184,150,46,0.55)', textDecoration: 'none', marginBottom: '36px', transition: 'color 200ms ease' }}
          onMouseEnter={e => e.currentTarget.style.color = '#8A6E1E'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(184,150,46,0.55)'}
        >
          <ArrowLeft size={12} /> Newsroom
        </Link>

        {/* Category */}
        {article.category && (
          <span style={{ display: 'inline-block', fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#8A6E1E', border: '1px solid rgba(184,150,46,0.35)', padding: '4px 14px', borderRadius: '1px', marginBottom: '22px', background: 'rgba(184,150,46,0.07)' }}>
            {article.category}
          </span>
        )}

        {/* Headline */}
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 600, color: '#1A1510', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '18px' }}>
          {article.headline}
        </h1>

        {/* Subheadline */}
        {article.subheadline && (
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(14px,1.5vw,17px)', fontWeight: 300, color: 'rgba(30,25,15,0.55)', lineHeight: 1.75, marginBottom: '28px' }}>
            {article.subheadline}
          </p>
        )}

        {/* Meta row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 500, color: 'rgba(138,110,30,0.80)' }}>Ausfamous Editorial</span>
          {date && <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(30,25,15,0.45)' }}><Calendar size={11} />{date}</span>}
          {article.location && <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(30,25,15,0.45)' }}><MapPin size={11} />{article.location}</span>}
          {article.reading_time && <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: 'rgba(30,25,15,0.45)' }}>{article.reading_time} min read</span>}
        </div>

        {/* Share row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(30,25,15,0.35)', marginRight: '4px' }}>Share</span>
          {[
            { label: 'LinkedIn', id: 'linkedin' },
            { label: 'X', id: 'twitter' },
            { label: 'Facebook', id: 'facebook' },
          ].map(s => (
            <button key={s.id} onClick={() => share(s.id)} style={{ padding: '5px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'transparent', border: '1px solid rgba(184,150,46,0.25)', color: 'rgba(138,110,30,0.65)', borderRadius: '1px', cursor: 'pointer', transition: 'all 200ms ease' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,150,46,0.55)'; e.currentTarget.style.color = '#8A6E1E'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,150,46,0.25)'; e.currentTarget.style.color = 'rgba(138,110,30,0.65)'; }}
            >
              {s.label}
            </button>
          ))}
          <button onClick={copyLink} style={{ padding: '5px 14px', fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'transparent', border: '1px solid rgba(184,150,46,0.25)', color: 'rgba(138,110,30,0.65)', borderRadius: '1px', cursor: 'pointer', transition: 'all 200ms ease' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,150,46,0.55)'; e.currentTarget.style.color = '#8A6E1E'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,150,46,0.25)'; e.currentTarget.style.color = 'rgba(138,110,30,0.65)'; }}
          >
            Copy Link
          </button>
        </div>

        {/* Divider */}
        <div style={{ marginTop: '40px', height: '1px', background: 'linear-gradient(to right, rgba(184,150,46,0.25), transparent)' }} />
      </div>
    </div>
  );
}