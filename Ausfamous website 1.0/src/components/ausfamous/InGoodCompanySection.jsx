import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import useScrollReveal from '../../hooks/useScrollReveal';

const CLIENTS_ROW1 = [
  { name: 'Bakshish', industry: 'Manufacturing', title: 'Industrialist', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/ea9157b42_Bakshish-Industrialist.png' },
  { name: 'Ethan', industry: 'Retail & E-Commerce', title: 'Online Fashion Store Owner', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/584300b58_Ethan-OnlineFashionStoreOwner.jpg' },
  { name: 'Mandy', industry: 'Migration & Education', title: 'Migration & Education Consultant', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/cd0243ff6_Mandy-MigrationandEducation.jpg' },
  { name: 'Dr. Vikram', industry: 'Healthcare', title: 'Cardiologist, MBBS MD', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/7c3adc8f1_DrVikramMBBSMDCardio.jpg' },
  { name: 'Salma', industry: 'Higher Education', title: 'Associate Dean', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/248d7b425_Salma-AssociateDean.jpg' },
  { name: 'Amber', industry: 'Finance & Tax, QLD', title: 'Tax Accountant', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/acb0707ce_Amber-TaxAccountantQLD.png' },
  { name: 'James', industry: 'Finance & Investment', title: 'CPA & CFA', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/1ae765d6c_JamesCPACFA.jpg' },
  { name: 'Sienna', industry: 'Health & Wellness, VIC', title: 'Pilates & Wellness Founder', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/5aeabb0b6_Sienna-PilatesandWellness-Vic.jpg' },
  { name: 'Meera', industry: 'Training & Education, VIC', title: 'RTO Director', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/69c49a971_Meera-RegisteredTrainingOrganisationRTODirector-VIC.png' },
  { name: 'Olivia', industry: 'Property, VIC', title: 'Licensed Real Estate Agent', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/323d3251e_Olivia-Realtor-VIC.png' },
  { name: 'You are Next!', industry: '', title: '', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/5d35592fe_Youarenext.jpg' },
];

const CLIENTS_ROW2 = [
  { name: 'Graham', industry: 'Construction, VIC', title: 'Construction Director', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/852b91b40_Graham-CMDconstruction.png' },
  { name: 'Farhan', industry: 'Arts & Academia', title: 'Professor of Creative Arts & Music', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/ec2801426_Farhan-ProfCreativeArtsandMusic.png' },
  { name: 'Grant', industry: 'Architecture, SA', title: 'Architect & Interior Designer', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/062397fcb_Grant-ArchitectandInteriorSolutionsSA.jpg' },
  { name: 'Wang', industry: 'Research & Academia', title: 'PhD Candidate', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/366bce4eb_Wang-PhDStudent.png' },
  { name: 'Tracy', industry: 'Property, NSW', title: 'Licensed Real Estate Agent', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/c98b14702_Tracy-RealtorNSW.jpg' },
  { name: 'Prof. Hamid', industry: 'Higher Education, NSW', title: 'Faculty Dean', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/c9f51783f_ProfHamid-DeanNSW.jpg' },
  { name: 'Agatha', industry: 'Wine & Agriculture, VIC', title: 'Vigneron & Estate Owner', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/003689aab_Agatha-Vigneron.png' },
  { name: 'Gurpreet', industry: 'Health & Fitness', title: 'Fitness & Supplement Entrepreneur', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/13b88e774_Gurpreet-FitnessandSupplements.png' },
  { name: 'Kirra', industry: 'Technology, WA', title: 'Founder & CEO', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/2e4f2ab2d_Kirra-FounderCEOWA.png' },
  { name: 'James', industry: 'Commercial Property', title: 'Commercial Real Estate Principal', img: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/7317357d5_James-CommercialRealestate.jpg' },
];

function ClientCard({ client }) {
  return (
    <div className="flex-shrink-0 w-[180px] md:w-[210px] mx-[10px] group cursor-default">
      <div className="relative overflow-hidden rounded-sm" style={{ aspectRatio: '4/5.5' }}>
        <img
          src={client.img}
          alt={client.name}
          className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute top-2 left-2">
          <span className="text-[8px] font-bold tracking-widest uppercase text-white/70 bg-black/40 px-2 py-1 backdrop-blur-sm">
            {client.industry}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="font-display text-base font-medium text-white leading-tight">{client.name}</p>
          <p className="text-[9px] text-white/60 mt-0.5 leading-tight">{client.title}</p>
        </div>
      </div>
    </div>
  );
}

function AutoScrollTrack({ clients, direction = 'left', speed = 35 }) {
  const trackRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);
  const doubled = [...clients, ...clients];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cardW = 220; // 210px + 20px gap
    const halfWidth = clients.length * cardW;

    const animate = () => {
      if (direction === 'left') {
        posRef.current -= speed / 60;
        if (posRef.current <= -halfWidth) posRef.current = 0;
      } else {
        posRef.current += speed / 60;
        if (posRef.current >= 0) posRef.current = -halfWidth;
      }
      track.style.transform = `translateX(${posRef.current}px)`;
      animRef.current = requestAnimationFrame(animate);
    };

    if (direction === 'right') posRef.current = -clients.length * cardW / 2;
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex" style={{ willChange: 'transform' }}>
        {doubled.map((client, i) => (
          <ClientCard key={i} client={client} />
        ))}
      </div>
    </div>
  );
}

export default function InGoodCompanySection() {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="relative py-24 md:py-36 bg-[#F8F6F1] overflow-hidden" ref={ref}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16 px-5"
      >
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold mb-4">
          800+ Professionals Positioned Across Australia
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-medium text-obsidian leading-tight">
          In <em className="italic text-gold">Good Company</em>
        </h2>
        <p className="text-obsidian/50 text-sm mt-4 max-w-md mx-auto leading-relaxed">
          A cross-section of the professionals we have positioned — across every major industry and state.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-16 h-px bg-gold/30" />
          <div className="w-1.5 h-1.5 rotate-45 bg-gold" />
          <div className="w-16 h-px bg-gold/30" />
        </div>
      </motion.div>

      {/* Row 1 — scrolls left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-5"
      >
        <AutoScrollTrack clients={CLIENTS_ROW1} direction="left" speed={30} />
      </motion.div>

      {/* Row 2 — scrolls right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        <AutoScrollTrack clients={CLIENTS_ROW2} direction="right" speed={25} />
      </motion.div>

      {/* CTA card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="text-center mt-10 px-5"
      >
        <p className="text-[10px] text-obsidian/30 tracking-wider">
          Names and identifying details have been anonymised. Real results. Real people.
        </p>
      </motion.div>
    </section>
  );
}