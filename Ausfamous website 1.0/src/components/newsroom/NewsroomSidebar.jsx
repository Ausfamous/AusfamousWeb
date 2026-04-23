import { Link } from 'react-router-dom';

export default function NewsroomSidebar({ articles, light }) {
  const recent = [...articles]
    .sort((a, b) => new Date(b.publish_date || b.created_date) - new Date(a.publish_date || a.created_date))
    .slice(0, 5);
  const placements = articles.filter(a => a.category === 'Media Placement').slice(0, 3);

  const bg = light ? '#FFFFFF' : 'rgba(20,16,10,0.70)';
  const border = light ? 'rgba(184,150,46,0.16)' : 'rgba(197,160,89,0.14)';
  const titleColor = light ? 'rgba(138,110,30,0.70)' : 'rgba(184,150,46,0.50)';
  const titleBorder = light ? 'rgba(184,150,46,0.14)' : 'rgba(197,160,89,0.10)';
  const linkColor = light ? 'rgba(30,22,10,0.65)' : 'rgba(220,205,170,0.65)';
  const linkHover = light ? '#8A6E1E' : '#C5A059';
  const dateColor = light ? 'rgba(30,22,10,0.38)' : 'rgba(197,160,89,0.30)';
  const itemBorder = light ? 'rgba(184,150,46,0.09)' : 'rgba(197,160,89,0.06)';
  const ctaHeadline = light ? '#1A1510' : '#E8DFC8';
  const ctaBody = light ? 'rgba(30,22,10,0.48)' : 'rgba(220,205,170,0.45)';
  const ctaBtnColor = light ? '#8A6E1E' : '#C5A059';
  const ctaBtnBorder = light ? 'rgba(184,150,46,0.35)' : 'rgba(197,160,89,0.30)';
  const noneColor = light ? 'rgba(30,22,10,0.28)' : 'rgba(197,160,89,0.25)';

  const SidebarBlock = ({ title, items }) => (
    <div style={{ marginBottom: '28px' }}>
      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '9px', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: titleColor, marginBottom: '14px', paddingBottom: '10px', borderBottom: `1px solid ${titleBorder}` }}>
        {title}
      </p>
      {items.length === 0 ? (
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: noneColor, fontStyle: 'italic' }}>None yet.</p>
      ) : items.map(a => (
        <Link key={a.id} to={`/newsroom/${a.slug}`}
          style={{ textDecoration: 'none', display: 'block', marginBottom: '12px', padding: '0 0 12px', borderBottom: `1px solid ${itemBorder}` }}
          onMouseEnter={e => e.currentTarget.querySelector('.link-title').style.color = linkHover}
          onMouseLeave={e => e.currentTarget.querySelector('.link-title').style.color = linkColor}
        >
          <p className="link-title" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: linkColor, lineHeight: 1.45, marginBottom: '4px', transition: 'color 180ms ease' }}>
            {a.headline}
          </p>
          {a.publish_date && (
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: dateColor }}>
              {new Date(a.publish_date).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          )}
        </Link>
      ))}
    </div>
  );

  return (
    <aside style={{ position: 'sticky', top: '100px' }}>
      <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: '6px', padding: '24px', marginBottom: '16px', boxShadow: light ? '0 4px 20px rgba(30,22,10,0.06)' : 'none' }}>
        <SidebarBlock title="Recent Releases" items={recent} />
        <SidebarBlock title="Media Placements" items={placements} />
      </div>

      {/* Mini CTA */}
      <div style={{ background: light ? 'linear-gradient(135deg, #1A1510 0%, #0E0C08 100%)' : 'rgba(20,16,10,0.70)', border: `1px solid ${border}`, borderRadius: '6px', padding: '24px 20px', boxShadow: light ? '0 8px 32px rgba(30,22,10,0.18)' : 'none' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '19px', fontWeight: 600, color: '#E8DFC8', marginBottom: '8px', lineHeight: 1.25 }}>
          Ready to be featured?
        </p>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', fontWeight: 300, color: 'rgba(220,205,170,0.50)', marginBottom: '18px', lineHeight: 1.65 }}>
          Build the authority that earns placement.
        </p>
        <Link to="/#contact" onClick={() => { setTimeout(() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
          style={{ display: 'block', textAlign: 'center', padding: '10px 16px', fontFamily: "'DM Sans', sans-serif", fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', background: 'transparent', border: '1px solid rgba(197,160,89,0.35)', color: '#C5A059', borderRadius: '2px', textDecoration: 'none', transition: 'all 220ms ease' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(197,160,89,0.12)'; e.currentTarget.style.borderColor = '#C5A059'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(197,160,89,0.35)'; }}
        >
          Get a Brand Audit
        </Link>
      </div>
    </aside>
  );
}