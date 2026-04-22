const NAVIGATE = [
{ label: 'Services', href: '#services' },
{ label: 'Industries', href: '#sectors' },
{ label: 'How It Works', href: '#process' },
{ label: 'Pricing', href: '#pricing' },
{ label: 'Contact', href: '#contact' }];


export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0D0C0B] border-t border-gold/5">
      <div className="max-w-7xl mx-auto px-5 md:px-10 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 pb-12 border-b border-platinum/[0.04]">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="font-display text-2xl font-medium text-platinum">
              Aus<span className="text-gold italic">Famous</span>
            </span>
            <p className="text-sm text-platinum/40 leading-relaxed mt-4 max-w-xs">
              We position accomplished professionals where credibility becomes influence, visibility becomes authority, and presence leads.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gold mb-6">Navigate</h4>
            <ul className="space-y-3">
              {NAVIGATE.map((l) =>
              <li key={l.href}>
                  <button onClick={() => scrollTo(l.href)} className="text-sm text-platinum/40 hover:text-gold transition-colors">
                    {l.label}
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gold mb-6">Company</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-platinum/40">Privacy Policy</span></li>
              <li><span className="text-sm text-platinum/40">Terms of Service</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gold mb-6">Contact</h4>
            <ul className="space-y-3">
              <li><a href="tel:+61434820067" className="text-sm text-platinum/40 hover:text-gold transition-colors">+61 434 820 067</a></li>
              <li><a href="mailto:hello@ausfamous.com.au" className="text-sm text-platinum/40 hover:text-gold transition-colors">become@ausfamous.com
</a></li>
              <li><span className="text-sm text-platinum/40">Melbourne, Australia</span></li>
            </ul>
          </div>
        </div>

        {/* Acknowledgement of Country */}
        <div className="py-6 border-b border-platinum/[0.04] mb-8">
          <p className="text-xs text-platinum/25 leading-relaxed text-center max-w-3xl mx-auto">
            Ausfamous acknowledges the Traditional Custodians of the lands on which we work across Australia — the Aboriginal and Torres Strait Islander peoples. We pay our deepest respects to their Elders past, present and emerging, and recognise their continuing connection to land, waters and culture.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-platinum/20">© 2026 Ausfamous. All rights reserved.</p>
          <div className="flex gap-3">
            {[
              { name: 'LinkedIn', href: '#' },
              { name: 'Instagram', href: 'https://www.instagram.com/aus.famous/' },
              { name: 'TikTok', href: 'https://www.tiktok.com/@ausfamous.com' },
              { name: 'Facebook', href: '#' },
              { name: 'YouTube', href: '#' },
            ].map(({ name, href }) => (
              <a
                key={name}
                href={href}
                target={href !== '#' ? '_blank' : undefined}
                rel={href !== '#' ? 'noopener noreferrer' : undefined}
                className="w-10 h-10 rounded-full bg-platinum/[0.03] flex items-center justify-center hover:bg-gold transition-colors group"
                aria-label={name}
              >
                <span className="text-[10px] font-bold text-platinum/30 group-hover:text-obsidian">{name[0]}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>);

}