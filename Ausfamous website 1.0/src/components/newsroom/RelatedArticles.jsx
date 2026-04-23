import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { ArrowRight } from 'lucide-react';

export default function RelatedArticles({ article }) {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!article?.category) return;
    base44.entities.NewsroomArticle.filter({ status: 'published', category: article.category }, '-publish_date', 4)
      .then(results => setRelated(results.filter(a => a.id !== article.id).slice(0, 3)));
  }, [article?.id]);

  if (related.length === 0) return null;

  return (
    <div style={{ background: '#F4F0E6', borderTop: '1px solid rgba(184,150,46,0.12)', borderBottom: '1px solid rgba(184,150,46,0.12)', padding: 'clamp(48px,6vw,72px) 0' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px)' }}>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(138,110,30,0.55)', marginBottom: '28px' }}>
          Related Releases
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
          {related.map(a => (
            <Link key={a.id} to={`/newsroom/${a.slug}`} style={{ textDecoration: 'none', padding: '20px', border: '1px solid rgba(184,150,46,0.15)', borderRadius: '4px', background: '#FDFBF4', transition: 'border-color 220ms ease, box-shadow 220ms ease' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(184,150,46,0.35)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(184,150,46,0.10)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(184,150,46,0.15)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              {a.cover_image && <div style={{ borderRadius: '3px', overflow: 'hidden', aspectRatio: '16/9', marginBottom: '14px' }}><img src={a.cover_image} alt={a.headline} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>}
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(138,110,30,0.65)' }}>{a.category}</span>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '18px', fontWeight: 600, color: '#1A1510', lineHeight: 1.25, margin: '8px 0 10px' }}>{a.headline}</p>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(138,110,30,0.60)' }}>
                Read <ArrowRight size={10} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}