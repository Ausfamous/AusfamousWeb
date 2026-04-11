import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';

const CORE_VALUES = [
  { name: 'Brilliance', desc: 'Multilingual, diverse and all-inclusive ethos' },
  { name: 'Honesty', desc: 'Honesty and integrity above all' },
  { name: 'Trust', desc: 'Fostering win-win long term relationships' },
];

export default function MissionValues({ executiveImg }) {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="relative" ref={ref}>
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left - Mission (Dark) */}
        <div className="relative bg-obsidian flex items-center justify-center px-6 md:px-16 py-16 md:py-24">
          <div className="absolute inset-0 overflow-hidden">
            <img src={executiveImg} alt="" className="w-full h-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-obsidian/80" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative max-w-md"
          >
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-6">Our Mission</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-platinum leading-tight mb-6">
              To position professionals where influence compounds credibility.
            </h2>
            <p className="text-platinum/50 leading-relaxed text-lg">
              Visibility becomes authority, and presence leads to create history. Told the way you want it to be told.
            </p>
          </motion.div>
        </div>

        {/* Right - Values (Graphene) */}
        <div className="bg-graphene flex items-center justify-center px-6 md:px-16 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={visible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md"
          >
            <p className="text-[11px] font-bold tracking-[0.25em] uppercase text-gold mb-6">Our Values</p>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium text-platinum leading-tight mb-8">
              What We Stand For
            </h2>

            <div className="space-y-0">
              {CORE_VALUES.map((v, i) => (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, x: 30 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
                  className="flex items-start gap-5 py-6 border-b border-gold/10 last:border-0"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-gold" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-platinum mb-1">{v.name}</p>
                    <p className="text-sm text-platinum/50">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}