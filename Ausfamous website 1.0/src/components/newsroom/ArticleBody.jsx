import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';

export default function ArticleBody({ article }) {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <div style={{ background: '#FAFAF8' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 clamp(20px,5vw,48px) 60px' }}>

        {/* Cover image */}
        {article.cover_image && (
          <div style={{ borderRadius: '6px', overflow: 'hidden', marginBottom: '40px', cursor: 'zoom-in' }} onClick={() => setLightboxImg(article.cover_image)}>
            <img src={article.cover_image} alt={article.headline} loading="lazy" style={{ width: '100%', maxHeight: '520px', objectFit: 'cover', display: 'block' }} />
          </div>
        )}

        {/* PR Metadata Strip */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', marginBottom: '44px', border: '1px solid rgba(184,150,46,0.18)', borderRadius: '4px', overflow: 'hidden' }}>
          {[
            { label: 'Source', value: 'Ausfamous' },
            { label: 'Category', value: article.category },
            { label: 'Published', value: article.publish_date ? new Date(article.publish_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }) : null },
            { label: 'Location', value: article.location },
            { label: 'Industry', value: article.industry },
          ].filter(m => m.value).map((meta, i, arr) => (
            <div key={meta.label} style={{ flex: '1 1 120px', padding: '14px 20px', borderRight: i < arr.length - 1 ? '1px solid rgba(184,150,46,0.12)' : 'none', background: 'rgba(248,244,234,0.80)' }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '8.5px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(138,110,30,0.55)', marginBottom: '5px' }}>{meta.label}</p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: 'rgba(30,25,15,0.75)' }}>{meta.value}</p>
            </div>
          ))}
        </div>

        {/* Rich text body */}
        <div
          className="newsroom-body"
          dangerouslySetInnerHTML={{ __html: article.body_content || '' }}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />

        {/* Gallery */}
        {article.gallery_images?.length > 0 && (
          <div style={{ marginTop: '44px' }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(197,160,89,0.40)', marginBottom: '16px' }}>Gallery</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {article.gallery_images.map((img, i) => (
                <div key={i} style={{ borderRadius: '4px', overflow: 'hidden', aspectRatio: '4/3', cursor: 'zoom-in' }} onClick={() => setLightboxImg(img)}>
                  <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 400ms ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div style={{ marginTop: '40px', paddingTop: '28px', borderTop: '1px solid rgba(184,150,46,0.12)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(30,25,15,0.35)', marginRight: '4px' }}>Tags</span>
              {article.tags.map(tag => (
                <span key={tag} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: 'rgba(138,110,30,0.70)', border: '1px solid rgba(184,150,46,0.25)', padding: '4px 12px', borderRadius: '1px', background: 'rgba(184,150,46,0.06)' }}>{tag}</span>
              ))}
            </div>
          </div>
        )}

        {/* External link */}
        {article.external_link && (
          <div style={{ marginTop: '36px' }}>
            <a href={article.external_link} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 28px', fontFamily: "'DM Sans', sans-serif", fontSize: '10px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', border: '1px solid rgba(184,150,46,0.40)', color: '#8A6E1E', borderRadius: '2px', textDecoration: 'none', transition: 'all 220ms ease' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(184,150,46,0.08)'; e.currentTarget.style.borderColor = 'rgba(184,150,46,0.65)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(184,150,46,0.40)'; }}
            >
              <ExternalLink size={12} /> View Original Publication
            </a>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div onClick={() => setLightboxImg(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(10,9,7,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out', padding: '24px' }}>
          <button onClick={() => setLightboxImg(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'rgba(197,160,89,0.60)', cursor: 'pointer' }}><X size={24} /></button>
          <img src={lightboxImg} alt="" style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '4px' }} />
        </div>
      )}

      {/* Rich text styles */}
      <style>{`
        .newsroom-body {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          color: rgba(30,25,15,0.72);
          line-height: 1.85;
        }
        .newsroom-body h1, .newsroom-body h2, .newsroom-body h3 {
          font-family: 'Cormorant Garamond', serif;
          color: #1A1510;
          margin: 36px 0 14px;
          line-height: 1.15;
          letter-spacing: -0.015em;
        }
        .newsroom-body h1 { font-size: 38px; font-weight: 600; }
        .newsroom-body h2 { font-size: 30px; font-weight: 600; }
        .newsroom-body h3 { font-size: 22px; font-weight: 500; }
        .newsroom-body p { margin: 0 0 20px; }
        .newsroom-body strong { color: #1A1510; font-weight: 600; }
        .newsroom-body em { color: rgba(138,110,30,0.85); }
        .newsroom-body a { color: #8A6E1E; text-decoration: underline; text-underline-offset: 3px; }
        .newsroom-body ul, .newsroom-body ol { margin: 0 0 20px 20px; }
        .newsroom-body li { margin-bottom: 6px; }
        .newsroom-body blockquote {
          margin: 32px 0;
          padding: 20px 28px;
          border-left: 3px solid rgba(184,150,46,0.45);
          background: rgba(184,150,46,0.06);
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-style: italic;
          color: rgba(30,25,15,0.65);
          border-radius: 0 4px 4px 0;
        }
        .newsroom-body img { max-width: 100%; border-radius: 4px; margin: 20px 0; }
      `}</style>
    </div>
  );
}