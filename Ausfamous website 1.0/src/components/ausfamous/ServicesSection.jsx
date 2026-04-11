import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';

const SERVICES = [
  { num: '01', title: 'Media Placement', desc: 'We secure features, interviews, and press coverage in outlets that matter. From Forbes and ABC to multicultural publications. Your story, told in the right room, to the right audience.' },
  { num: '02', title: 'Personal Brand Strategy', desc: 'Before we build anything, we architect your narrative. Who you are, what you stand for, and how you sound across every platform and every language.' },
  { num: '03', title: 'Social Media Management', desc: 'Full-service management of LinkedIn, YouTube, Facebook, and Reddit. Content written in your voice, engineered for engagement and authority. Not vanity metrics.' },
  { num: '04', title: 'Content Creation', desc: 'Articles, thought leadership pieces, video scripts, captions, bios, and speaking intros. Every word crafted to position you as the undisputed authority in your field.' },
  { num: '05', title: 'Multilingual & Multicultural', desc: 'We position your brand across the communities that make Australia. In their language, their media, and their cultural context. 60+ languages. Real trust.' },
  { num: '06', title: 'Narrative Drafting', desc: 'For professionals who need their story told with precision. Immigration, credentialing, awards submissions. Drafted with purpose and elite standards.' },
];

export default function ServicesSection() {
  const [ref, visible] = useScrollReveal();

  return (
    <section id="services" className="relative py-16 md:py-28 lg:py-40 bg-obsidian overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-5">The Ausfamous Service Stack</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-platinum leading-tight mb-4">
            Everything your personal brand needs.<br/>Built to your voice. <em className="text-gold italic not-italic">Deployed at scale.</em>
          </h2>
          <p className="text-platinum/40 max-w-xl mx-auto text-sm">One integrated system. Six disciplines. One outcome: authority that compounds.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.num}
              initial={{ opacity: 0, y: 30 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-white/[0.02] border border-gold/10 rounded-2xl p-8 md:p-10 hover:bg-white/[0.04] hover:border-gold/30 hover:-translate-y-3 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold to-gold/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <span className="font-display text-sm font-medium text-gold mb-5 block">{s.num}</span>
              <h3 className="font-display text-lg md:text-xl font-medium text-platinum mb-4 leading-snug">{s.title}</h3>
              <p className="text-sm text-platinum/45 leading-relaxed">{s.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}