import Navigation from '../components/ausfamous/Navigation';
import HeroSection from '../components/ausfamous/HeroSection';
import StatsBar from '../components/ausfamous/StatsBar';
import WhyPersonalBrand from '../components/ausfamous/WhyPersonalBrand';
import MissionValues from '../components/ausfamous/MissionValues';
import ProcessSection from '../components/ausfamous/ProcessSection';
import ServicesSection from '../components/ausfamous/ServicesSection';
import MediaLogos from '../components/ausfamous/MediaLogos';
import BelongSection from '../components/ausfamous/BelongSection';
import SectorsSection from '../components/ausfamous/SectorsSection';
import WhatChanges from '../components/ausfamous/WhatChanges';
import PricingSection from '../components/ausfamous/PricingSection';
import AuthorityCalculator from '../components/ausfamous/AuthorityCalculator';
import ContactSection from '../components/ausfamous/ContactSection';
import InGoodCompanySection from '../components/ausfamous/InGoodCompanySection';
import Footer from '../components/ausfamous/Footer';
import ScrollProgress from '../components/ausfamous/ScrollProgress';
import SectionDivider from '../components/ausfamous/SectionDivider';
import WhatsAppFab from '../components/ausfamous/WhatsAppFab';

// Generated images
const IMAGES = {
  hero: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/47a9a209c_generated_63951add.png',
  luxury: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/8cb50975c_generated_facf38d1.png',
  executive: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/aedaf8827_generated_5aa9fca5.png',
  mountain: 'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/e3c727105_generated_9a80f2bf.png',
  sectors: [
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/1d28f8ae5_generated_b78fd0b4.png',  // Law
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/aff00d6dc_generated_730a888b.png',  // Healthcare
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/524600496_generated_a76fcc0a.png',  // Finance
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/e693c8ea7_generated_8b9be2a5.png',  // Real Estate
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/c6766c019_generated_86631cff.png',  // Construction
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/5bfbe27cc_generated_6dc13eb7.png',  // Corporate
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/aaf060153_generated_01e68410.png',  // Founders
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/25d8e15f2_generated_43798169.png',  // Academics
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/afb68f649_generated_f7ed91bd.png',  // Government
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/40f4c01b4_generated_43a54926.png',  // Media
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/6653bfdfd_generated_1c4436fb.png',  // Sports
    'https://media.base44.com/images/public/69d7417eefb273dfd04436bb/6b0779d69_generated_858473ea.png',  // Consulting
  ],
};

export default function Home() {
  return (
    <div className="bg-obsidian min-h-screen overflow-x-hidden">
      <Navigation />
      <ScrollProgress />
      <HeroSection heroImg={IMAGES.hero} />
      <StatsBar />
      <SectionDivider direction="dark-to-light" />
      <WhyPersonalBrand luxuryImg={IMAGES.luxury} />
      <SectionDivider direction="light-to-dark" />
      <InGoodCompanySection />
      <SectionDivider direction="dark-to-light" />
      <ProcessSection />
      <SectionDivider direction="light-to-dark" />
      <ServicesSection />
      <SectionDivider direction="dark-to-light" />
      <MediaLogos />
      <BelongSection mountainImg={IMAGES.mountain} />
      <SectorsSection sectorImages={IMAGES.sectors} />
      <SectionDivider direction="dark-to-light" />
      <WhatChanges />
      <SectionDivider direction="light-to-dark" />
      <AuthorityCalculator />
      <SectionDivider direction="dark-to-light" />
      <PricingSection />
      <SectionDivider direction="light-to-dark" />
      <ContactSection />
      <SectionDivider direction="dark-to-light" />
      <MissionValues executiveImg={IMAGES.executive} />
      <SectionDivider direction="light-to-dark" />
      <Footer />
      <WhatsAppFab />
    </div>
  );
}