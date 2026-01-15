import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import CompactAboutSection from '@/components/CompactAboutSection';
import ServicesSection from '@/components/ServicesSection';
import StatsSection from '@/components/StatsSection';
import SoftCTA from '@/components/SoftCTA';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import EnquiryModal from '@/components/EnquiryModal';

const Index = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Partridge Linen | Premium Commercial Linen Hire London</title>
        <meta name="description" content="Premium commercial linen services for restaurants, hotels & events across London & South East. Damask tablecloths, chef uniforms & luxury event linens. 20+ years experience." />
        <link rel="canonical" href="https://partridgelinen.com/" />
      </Helmet>
      <Navigation />
      <Hero />
      <div id="services">
        <ServicesSection />
      </div>
      <div id="about">
        <CompactAboutSection onEnquireClick={() => setIsEnquiryOpen(true)} />
      </div>
      <StatsSection />
      <SoftCTA />
      <div id="contact">
        <ContactSection onEnquireClick={() => setIsEnquiryOpen(true)} />
      </div>
      <Footer onEmailClick={() => setIsEnquiryOpen(true)} />
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
};

export default Index;