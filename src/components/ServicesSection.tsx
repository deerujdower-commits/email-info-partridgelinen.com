import { useEffect, useRef, useState } from 'react';
import { ChefHat, Utensils, Building2, ArrowRight, Sparkles, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import restaurantWhiteMinimal from '@/assets/partridge-linen-restaurant-tile-white-table.webp';
import restaurantHero from '@/assets/partridge-linen-restaurant-hero-table-setting.webp';
import kitchenClothHerringboneGreen from '@/assets/partridge-linen-kitchen-cloth-herringbone-green.webp';
import apronModel from '@/assets/partridge-linen-restaurant-apron-model.webp';
import chefJacketWhiteModel from '@/assets/partridge-linen-kitchen-chef-jacket-white-model.webp';
import eventBurgundyDamask from '@/assets/partridge-linen-burgundy-damask-crystal.webp';
import eventWhiteRoundDarkLighting from '@/assets/partridge-linen-white-round-dark-lighting.webp';
import eventWhiteDamaskWeddingHall from '@/assets/partridge-linen-white-damask-wedding-hall.webp';
import hotelBedLinen1 from '@/assets/partridge-linen-hotel-bed-linen-white.webp';
import hotelBedLinenMain from '@/assets/partridge-linen-hotel-bed-linen-main.webp';
import hotelTowelStack from '@/assets/partridge-linen-hotel-towel-stack-white.webp';

type Service = {
  title: string;
  description: string;
  images: string[];
  icon: typeof Utensils;
  slug: string;
  colors?: { name: string; hex: string }[];
};

const services: Service[] = [{
  title: 'Restaurant',
  description: 'Premium tablecloths and napkins for fine dining.',
  images: [restaurantWhiteMinimal, restaurantHero],
  icon: Utensils,
  slug: 'restaurant'
}, {
  title: 'Event Hire',
  description: 'Classic linen and damask for weddings and corporate events.',
  images: [eventBurgundyDamask, eventWhiteRoundDarkLighting, eventWhiteDamaskWeddingHall],
  icon: Sparkles,
  slug: 'events'
}, {
  title: 'Hotel',
  description: 'Complete linen service with towels and bedding.',
  images: [hotelBedLinen1, hotelTowelStack, hotelBedLinenMain],
  icon: Building2,
  slug: 'bed-linen'
}, {
  title: 'Kitchen',
  description: 'Chef uniforms and professional kitchen cloths.',
  images: [apronModel, kitchenClothHerringboneGreen, chefJacketWhiteModel],
  icon: ChefHat,
  slug: 'kitchen-work'
}];
// Static image indices: Restaurant=0, Event Hire=1, Hotel=2, Kitchen=0
const staticImageIndices = [0, 1, 2, 0];

const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0');
          setVisibleCards(prev => [...prev, cardIndex]);
        }
      });
    }, {
      threshold: 0.2
    });
    const cards = sectionRef.current?.querySelectorAll('.service-card');
    cards?.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);
  return <section ref={sectionRef} className="pt-6 md:pt-10 pb-12 md:pb-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-foreground/10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-foreground/10" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-px bg-accent" />
            <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
              What We Do
            </span>
          </div>
        
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-foreground leading-tight mb-8">
          Services
        </h2>

        {/* Story Section */}
        <div className="mb-12">
          <p className="text-foreground/70 font-body leading-relaxed text-lg">Looking for table linen for your restaurant? Need fresh bed linen for your hotel? Planning an event and want it to look perfect? We've got you covered.</p>
        </div>

        {/* Services Grid - 4x1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
          const IconComponent = service.icon;
          return <div key={index} data-index={index} className={`service-card group transition-all duration-700 ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
            transitionDelay: `${index * 200}ms`
          }}>
                <div className="bg-card border border-border overflow-hidden h-full hover:shadow-[var(--shadow-elegant)] transition-all duration-500 rounded-lg flex flex-col">
                  {/* Image Section */}
                  <div className="aspect-[4/3] overflow-hidden relative block cursor-pointer" onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                    if (service.slug === 'events') {
                      navigate('/events');
                    } else if (service.slug === 'bed-linen') {
                      navigate('/hotel-linens');
                    } else if (service.slug === 'kitchen-work') {
                      navigate('/kitchen');
                    } else if (service.slug === 'restaurant') {
                      navigate('/restaurant');
                    } else {
                      navigate('/collection');
                    }
                  }}>
                    <img 
                      src={service.images[staticImageIndices[index]]} 
                      alt={`Partridge Linen ${service.title.toLowerCase()} service - ${service.description}`} 
                      loading="lazy" 
                      className="w-full h-full object-cover object-center"
                      style={{ imageRendering: 'crisp-edges' }} 
                    />
                    <div className="absolute inset-0 bg-black/10" />
                    
                    {/* Icon - Always Visible */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-primary flex items-center justify-center z-10">
                      <IconComponent className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="font-display text-base font-light text-foreground leading-tight mb-2">
                      {service.title}
                    </h3>
                    
                    <p className="text-foreground/70 font-body leading-relaxed text-sm mb-4 flex-grow">
                      {service.description}
                    </p>

                    <Button 
                      variant="gradient" 
                      size="sm"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'instant' });
                        if (service.slug === 'events') {
                          navigate('/events');
                        } else if (service.slug === 'bed-linen') {
                          navigate('/hotel-linens');
                        } else if (service.slug === 'kitchen-work') {
                          navigate('/kitchen');
                        } else if (service.slug === 'restaurant') {
                          navigate('/restaurant');
                        } else {
                          navigate('/collection');
                        }
                      }}
                      className="w-full font-body mt-auto"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      <span className="text-xs uppercase tracking-wider">View Details</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
};
export default ServicesSection;