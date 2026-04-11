import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function SectorsSection({ sectorImages }) {
  const [ref, visible] = useScrollReveal();

  const SECTORS = [
    { title: 'Law & Legal', desc: 'Media placements, controlled LinkedIn presence and Google authority position you as the lawyer clients trust before first contact.', img: sectorImages[0] },
    { title: 'Healthcare', desc: 'Build patient trust at scale through media features, strong Google visibility, and multilingual outreach.', img: sectorImages[1] },
    { title: 'Finance', desc: 'Position yourself in financial conversations through media placements and market-led commentary.', img: sectorImages[2] },
    { title: 'Real Estate', desc: 'Every sale becomes a story. Dominate Google with authority content tied to your name.', img: sectorImages[3] },
    { title: 'Construction', desc: 'Turn projects into credibility assets. From ground-breaking to delivery, we secure media and authority.', img: sectorImages[4] },
    { title: 'Leadership', desc: 'Make executives visible where decisions are made. Your name carries authority across business networks.', img: sectorImages[5] },
    { title: 'Founders', desc: "Align the founder's identity with the company's growth. Attract investors and partnerships.", img: sectorImages[6] },
    { title: 'Academics', desc: 'Take your work beyond journals into public recognition through media and multilingual outreach.', img: sectorImages[7] },
    { title: 'Government', desc: 'Strengthen public trust through structured visibility and consistent communication.', img: sectorImages[8] },
    { title: 'Media & Public Figures', desc: 'Through media, controlled narratives, and platform management, your name carries authority.', img: sectorImages[9] },
    { title: 'Sports', desc: 'Build athlete brands that extend beyond performance. Sponsorship-ready authority.', img: sectorImages[10] },
    { title: 'Consulting', desc: 'Position consultants where decisions are made. Authority that converts into high-value engagements.', img: sectorImages[11] },
  ];

  return (
    <section id="sectors" className="relative py-16 md:py-28 lg:py-40 bg-obsidian" ref={ref}>
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-5">Sectors</p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-platinum leading-tight mb-4">
            Where we drive <em className="text-gold italic not-italic">excellence</em>
          </h2>
          <p className="text-platinum/40 max-w-md mx-auto">Depth over breadth — each sector lead is a practitioner, not a generalist.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {SECTORS.map((s, i) => (
            <SectorCard key={s.title} sector={s} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorCard({ sector, index, visible }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.05, duration: 0.6 }}
      className="relative h-48 md:h-72 rounded-xl overflow-hidden cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
    >
      <img
        src={sector.img}
        alt={sector.title}
        className="absolute inset-0 w-full h-full object-cover brightness-[0.3] saturate-75 group-hover:brightness-[0.2] group-hover:scale-110 transition-all duration-700"
      />
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end z-10">
        <h3 className="font-display text-base md:text-xl font-medium text-platinum transition-transform duration-500 group-hover:-translate-y-2">
          {sector.title}
        </h3>
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs md:text-sm text-platinum/60 leading-relaxed mt-2 overflow-hidden"
            >
              {sector.desc}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}