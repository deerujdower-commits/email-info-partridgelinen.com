import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, ShieldCheck, Layers, HandMetal, Truck, Users } from 'lucide-react';

import WhyUsSection from '@/components/WhyUsSection';
import LazyImage from '@/components/LazyImage';

import EnquiryModal from '@/components/EnquiryModal';
import chefJacketWhite from '@/assets/partridge-linen-kitchen-chef-jacket-white.webp';
import chefJacketBlack from '@/assets/partridge-linen-kitchen-chef-jacket-black.webp';
import chefJacketShortWhite from '@/assets/partridge-linen-kitchen-chef-jacket-short-white.webp';
import chefJacketShortBlackNew from '@/assets/partridge-linen-kitchen-chef-jacket-short-black-new.webp';
import chefTrouserCheck from '@/assets/partridge-linen-kitchen-chef-trouser-check.webp';
import chefTrouserBlack from '@/assets/partridge-linen-kitchen-chef-trouser-black.webp';
import apronButchers from '@/assets/partridge-linen-kitchen-apron-butchers.webp';
import apronBlack from '@/assets/partridge-linen-kitchen-apron-black.webp';
import apronWhite from '@/assets/partridge-linen-kitchen-apron-white.webp';
import kitchenHero from '@/assets/partridge-linen-kitchen-hero-chefs.webp';
import kitchenWhyUsChef from '@/assets/partridge-linen-kitchen-why-us-chef.webp';
import kitchenClothWonderdryGreen from '@/assets/partridge-linen-kitchen-cloth-wonderdry-green.webp';
import kitchenClothHerringboneGreen from '@/assets/partridge-linen-kitchen-cloth-herringbone-green.webp';
import kitchenClothHerringboneBlue from '@/assets/partridge-linen-kitchen-cloth-herringbone-blue.webp';
import kitchenClothMicrofibre from '@/assets/partridge-linen-kitchen-cloth-microfibre.webp';
import kitchenClothOven from '@/assets/partridge-linen-kitchen-cloth-oven.webp';
import kitchenClothGlass from '@/assets/partridge-linen-kitchen-cloth-glass.webp';
import kitchenClothPolishing from '@/assets/partridge-linen-kitchen-cloth-polishing.webp';

const chefWear = [
  { name: 'Chef Jacket Long Sleeve - White', image: chefJacketWhite, alt: 'Professional white long sleeve chef jacket for commercial kitchen use' },
  { name: 'Chef Jacket Long Sleeve - Black', image: chefJacketBlack, alt: 'Professional black long sleeve chef jacket for commercial kitchen use' },
  { name: 'Chef Jacket Short Sleeve - White', image: chefJacketShortWhite, alt: 'Professional white short sleeve chef jacket for warm kitchen environments' },
  { name: 'Chef Jacket Short Sleeve - Black', image: chefJacketShortBlackNew, alt: 'Professional black short sleeve chef jacket for warm kitchen environments' },
  { name: 'Chef Trousers - Check', image: chefTrouserCheck, alt: 'Classic black and white check chef trousers for professional kitchens' },
  { name: 'Chef Trousers - Black', image: chefTrouserBlack, alt: 'Professional black chef trousers for commercial kitchen staff' },
  { name: 'Butchers Apron', image: apronButchers, alt: 'Traditional striped butchers apron for meat preparation and kitchen work' },
  { name: 'Black Apron', image: apronBlack, alt: 'Professional black kitchen apron for chefs and kitchen staff' },
  { name: 'White Apron', image: apronWhite, alt: 'Classic white kitchen apron for professional culinary environments' },
];

const kitchenLinens = [
  { name: 'Wonderdry Kitchen Cloth', image: kitchenClothWonderdryGreen, alt: 'Green Wonderdry kitchen cloth for professional drying and cleaning' },
  { name: 'Herringbone Cloth - Green', image: kitchenClothHerringboneGreen, alt: 'Green herringbone weave kitchen cloth for commercial use' },
  { name: 'Herringbone Cloth - Blue', image: kitchenClothHerringboneBlue, alt: 'Blue herringbone weave kitchen cloth for commercial use' },
  { name: 'Microfibre Cloth', image: kitchenClothMicrofibre, alt: 'Professional microfibre cloth for streak-free cleaning' },
  { name: 'Oven Cloth', image: kitchenClothOven, alt: 'Heavy-duty oven cloth for handling hot kitchen equipment safely' },
  { name: 'Glass Cloth', image: kitchenClothGlass, alt: 'Lint-free glass polishing cloth for sparkling glassware' },
  { name: 'Polishing Cloth', image: kitchenClothPolishing, alt: 'Professional polishing cloth for cutlery and surfaces' },
];

const Kitchen = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleProductClick = (productName: string) => {
    setSelectedProduct(productName);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <LazyImage 
          src={kitchenHero} 
          alt="Professional chefs working in a commercial kitchen"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-px bg-white" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Kitchen Workwear & Linens
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Professional Kitchen Essentials
            </h1>
          </div>
        </div>
      </section>
      
      <main className="flex-grow py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Header */}
          <div className="mb-10">
            <p className="text-foreground/70 font-body leading-relaxed text-lg">
              Outfit your kitchen team with premium chef uniforms and professional kitchen laundry. From crisp white jackets to durable aprons and cloths, we provide everything you need to maintain hygienic, professional standards in your kitchen.
            </p>
          </div>

          {/* Chef Wear Section */}
          <div className="mb-16">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-8">
              Chef Wear
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {chefWear.map((item, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer"
                  onClick={() => handleProductClick(item.name)}
                >
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3 relative">
                    <LazyImage
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-body font-medium text-lg">Order Now</span>
                    </div>
                  </div>
                  <p className="text-foreground font-body text-sm text-center">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Kitchen Linens Section */}
          <div className="mb-16">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-foreground mb-8">
              Kitchen Linen
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {kitchenLinens.map((item, index) => (
                <div 
                  key={index} 
                  className="group cursor-pointer"
                  onClick={() => handleProductClick(item.name)}
                >
                  <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3 relative">
                    <LazyImage
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white font-body font-medium text-lg">Order Now</span>
                    </div>
                  </div>
                  <p className="text-foreground font-body text-sm text-center">{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us Section */}
          <WhyUsSection
            heading="Kitchen Laundry You Can Trust"
            subheading=""
            variant="compact"
            features={[
              {
                title: "Hand-Pressed & Folded, Supreme Quality",
                description: "Every uniform and linen is hand-pressed and folded with meticulous care. This attention to detail ensures your chefs and kitchen staff look sharp, professional, and well-presented, enhancing the image of your kitchen and establishment.",
                icon: HandMetal
              },
              {
                title: "Hygiene & Sanitation You Can Trust",
                description: "In a kitchen, cleanliness is essential. All items are professionally laundered to strict hygiene standards, removing bacteria and tough stains. Your kitchen linens and uniforms are kept sanitary and safe for daily use.",
                icon: ShieldCheck
              },
              {
                title: "Durable Workwear Materials",
                description: "We specialise in poly-cotton workwear, offering long-lasting durability, comfort, and easy maintenance. Chef jackets, aprons, and staff uniforms are designed to withstand the rigours of a busy kitchen while keeping your team comfortable throughout their shift.",
                icon: Layers
              },
              {
                title: "Service for All Hospitality Teams",
                description: "Whether you run a restaurant, takeaway, hotel kitchen, or catering operation, our service adapts to your needs. Regular collection and delivery ensure you never run out of clean linen or uniforms, keeping your operations efficient.",
                icon: Users
              },
              {
                title: "Efficient & Large-Load Deliveries",
                description: "We cover the M25 and beyond, handling large volumes with ease. No matter the size of your kitchen or number of sites, our reliable delivery service ensures your laundry arrives on time, every time.",
                icon: Truck
              }
            ]}
            imagePlaceholder={kitchenWhyUsChef}
          />

          {/* CTA Section */}
          <div className="bg-black rounded-lg p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
            
            <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
              Need to kit out your team?
            </h2>
            <p className="text-white/70 font-body leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
              Drop us a message with what you're looking for and we'll sort you out with pricing. Simple as that.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={() => setIsEnquiryOpen(true)}
                variant="outline"
                className="font-body border-white/20 bg-white text-black hover:bg-white/90"
              >
                <Mail className="w-4 h-4 mr-2" />
                Request a Quote
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setSelectedProduct(null);
                  setIsEnquiryOpen(true);
                }}
                className="font-body border-white/20 bg-white text-black hover:bg-white/90"
              >
                <Phone className="w-4 h-4 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer onEmailClick={() => setIsEnquiryOpen(true)} />
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => {
          setIsEnquiryOpen(false);
          setSelectedProduct(null);
        }}
        productName={selectedProduct || undefined}
      />
    </div>
  );
};

export default Kitchen;
