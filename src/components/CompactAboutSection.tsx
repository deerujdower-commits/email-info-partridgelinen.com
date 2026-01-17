import { useEffect, useState, useRef } from 'react';
import laundryFacility from '@/assets/partridge-linen-about-laundry-facility.webp';

interface CompactAboutSectionProps {
  onEnquireClick?: () => void;
}

const CompactAboutSection = ({ onEnquireClick }: CompactAboutSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="compact-about-section py-12 md:py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-foreground/10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-foreground/10" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-px bg-accent" />
            <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
              About Us
            </span>
          </div>
          
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-foreground leading-tight mb-8">
            <span className="text-accent">30+ Years of Excellence</span>
          </h2>
          
          {/* Mobile: Image at top, Desktop: floated with text wrap */}
          {/* Image - shown at top on mobile */}
          <div className="relative mb-6 sm:float-left sm:mr-8 sm:mb-4 w-full sm:w-1/2 lg:w-[42%]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <img 
                src={laundryFacility} 
                alt="Partridge Linen industrial laundry facility with commercial washing machines" 
                className="w-full h-full object-cover brightness-[1.35] contrast-105" 
                loading="lazy"
                width={600}
                height={450}
                decoding="async"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent/20 rounded-full blur-xl" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </div>
          
          {/* Text content */}
          <p className="text-foreground/70 font-body leading-relaxed text-lg mb-4">Founded in 1993, Partridge Laundry & Linen Hire Limited has been supporting businesses across London and the South East for over three decades. From our beginnings as a small family business, we have built a strong reputation for reliability, quality, and attention to detail.</p>
          
          <p className="text-foreground/70 font-body leading-relaxed text-lg mb-4">We combine expert knowledge with flexible, customer-focused service. Every item we launder, press, and deliver, whether it is chef uniforms, hotel towels, or event linens, is handled with care and attention to detail to ensure it meets the highest standards.</p>
          
          <p className="text-foreground/70 font-body leading-relaxed text-lg">At Partridge Laundry, every customer is more than just a client. We see you as our partner, your mission is our mission, and we provide a friendly, accommodating service that adapts to your needs. We believe quality linen is about more than appearance; it is about trust, consistency, and making daily operations effortless. Our goal is simple: to provide a service that businesses can rely on, day after day.</p>
          
          {/* Clear float */}
          <div className="clear-both" />
        </div>
      </div>
    </section>
  );
};

export default CompactAboutSection;