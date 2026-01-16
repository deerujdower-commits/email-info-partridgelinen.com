import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, Award, Truck, Users } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import WhyUsSection from '@/components/WhyUsSection';
import LazyImage from '@/components/LazyImage';

import EnquiryModal from '@/components/EnquiryModal';
import CollectionModal from '@/components/CollectionModal';
// Tablecloth images
const studioFittedWhiteTablecloth = '/lovable-uploads/cf54b1ce-fef7-4ac1-8bbc-34b126347063.png';
const studioFittedBlackTableclothV2 = '/lovable-uploads/e059eed4-9708-4d5a-8545-42094ce503da.png';
const studioFittedIvoryTableclothV2 = '/lovable-uploads/788eb1d4-c9b5-434b-8d56-65ffdcd67cb8.png';

// Napkin images
import napkinWhiteFolded from '@/assets/partridge-linen-restaurant-napkin-white.webp';
import napkinBlackFolded from '@/assets/partridge-linen-restaurant-napkin-black.webp';
import napkinIvoryFolded from '@/assets/partridge-linen-restaurant-napkin-ivory.webp';

// Kitchen images
import kitchenClothWonderdryGreen from '@/assets/partridge-linen-kitchen-cloth-wonderdry-green.webp';
import kitchenClothHerringboneGreen from '@/assets/partridge-linen-kitchen-cloth-herringbone-green.webp';
import kitchenClothHerringboneBlue from '@/assets/partridge-linen-kitchen-cloth-herringbone-blue.webp';
import kitchenClothMicrofibre from '@/assets/partridge-linen-kitchen-cloth-microfibre.webp';
import kitchenClothOven from '@/assets/partridge-linen-kitchen-cloth-oven.webp';
import kitchenClothGlass from '@/assets/partridge-linen-kitchen-cloth-glass.webp';
import kitchenClothPolishing from '@/assets/partridge-linen-kitchen-cloth-polishing.webp';

// Workwear images
import chefSuitWhiteFull from '@/assets/partridge-linen-restaurant-chef-suit-white.webp';
import chefSuitBlackFull from '@/assets/partridge-linen-restaurant-chef-suit-black.webp';
import chefJacketWhite from '@/assets/partridge-linen-kitchen-chef-jacket-white.webp';
import chefJacketWhiteModel from '@/assets/partridge-linen-kitchen-chef-jacket-white-model.webp';
import chefJacketBlack from '@/assets/partridge-linen-kitchen-chef-jacket-black.webp';
import chefJacketBlackModel from '@/assets/partridge-linen-kitchen-chef-jacket-black-model.webp';
import chefJacketShortWhite from '@/assets/partridge-linen-kitchen-chef-jacket-short-white.webp';
import chefJacketShortWhiteModel from '@/assets/partridge-linen-kitchen-chef-jacket-short-white-model.webp';
import chefJacketShortBlackModel from '@/assets/partridge-linen-kitchen-chef-jacket-short-black-model.webp';
import chefJacketShortBlackNew from '@/assets/partridge-linen-kitchen-chef-jacket-short-black-new.webp';
import chefTrouserCheck from '@/assets/partridge-linen-kitchen-chef-trouser-check.webp';
import chefTrouserCheckModel from '@/assets/partridge-linen-kitchen-chef-trouser-check-model.webp';
import chefTrouserBlack from '@/assets/partridge-linen-kitchen-chef-trouser-black.webp';
import chefTrouserBlackModel from '@/assets/partridge-linen-kitchen-chef-trouser-black-model.webp';
import apron from '@/assets/partridge-linen-restaurant-apron-striped.webp';
import apronModel from '@/assets/partridge-linen-restaurant-apron-model.webp';
import apronBlack from '@/assets/partridge-linen-kitchen-apron-black.webp';
import apronWhite from '@/assets/partridge-linen-kitchen-apron-white.webp';
import restaurantHero from '@/assets/partridge-linen-restaurant-hero-table-setting.webp';
import restaurantClient1 from '@/assets/partridge-linen-restaurant-why-us-venue.webp';

const Restaurant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fromNav = location.state?.fromNav === true;
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState<{ id: number; title: string; description: string; images: string[]; slug: string } | null>(null);

  const modalData = {
    'tablecloths': {
      id: 1,
      title: 'Tablecloths',
      description: 'Available in any colour, supplied in durable polyester or premium cotton - ideal for everyday service and special occasions.',
      images: [studioFittedWhiteTablecloth, studioFittedIvoryTableclothV2, studioFittedBlackTableclothV2],
      slug: 'tablecloths'
    },
    'napkins': {
      id: 3,
      title: 'Napkins',
      description: 'Available in any colour, in polyester or cotton, offering a crisp, professional finish for consistent table presentation.',
      images: [napkinWhiteFolded, napkinIvoryFolded, napkinBlackFolded],
      slug: 'napkins'
    },
    'kitchen-linen': {
      id: 6,
      title: 'Kitchen Linen',
      description: 'Professional kitchen towels and cloths in various patterns and colours for commercial and domestic use.',
      images: [kitchenClothWonderdryGreen, kitchenClothHerringboneGreen, kitchenClothHerringboneBlue, kitchenClothMicrofibre, kitchenClothOven, kitchenClothGlass, kitchenClothPolishing],
      slug: 'kitchen-linen'
    },
    'work-wear': {
      id: 5,
      title: 'Work Wear',
      description: 'Professional chef jackets, trousers, and aprons designed for comfort and durability in commercial kitchens.',
      images: [
        chefSuitWhiteFull,
        chefSuitBlackFull,
        chefJacketWhite, 
        chefJacketWhiteModel,
        chefJacketBlack,
        chefJacketBlackModel,
        chefJacketShortWhite,
        chefJacketShortWhiteModel,
        chefJacketShortBlackNew,
        chefJacketShortBlackModel,
        chefTrouserCheck,
        chefTrouserCheckModel,
        chefTrouserBlack,
        chefTrouserBlackModel,
        apron,
        apronModel,
        apronBlack,
        apronWhite
      ],
      slug: 'work-wear'
    }
  };

  const restaurantProducts = [
    {
      title: 'Tablecloths',
      description: 'Classic tablecloths in any colour, perfect for fine dining.',
      images: [studioFittedWhiteTablecloth],
      modalSlug: 'tablecloths',
      alt: 'White fitted tablecloth for fine dining restaurant table setting'
    },
    {
      title: 'Napkins',
      description: 'Premium cloth napkins to complement any table setting.',
      images: [napkinWhiteFolded],
      modalSlug: 'napkins',
      alt: 'Elegantly folded white cloth napkin for restaurant table'
    },
    {
      title: 'Kitchen Linen',
      description: 'Professional kitchen towels and cloths for commercial use.',
      images: [kitchenClothWonderdryGreen],
      modalSlug: 'kitchen-linen',
      alt: 'Green Wonderdry kitchen cloth for professional commercial kitchen'
    },
    {
      title: 'Work Wear',
      description: 'Professional chef uniforms designed for comfort and durability.',
      images: [chefJacketWhiteModel],
      modalSlug: 'work-wear',
      alt: 'Professional chef wearing white chef jacket in commercial kitchen'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Restaurant Linen Hire London | Tablecloths & Napkins | Partridge Linen</title>
        <meta name="description" content="Premium restaurant linen hire across London & South East. Tablecloths, napkins, chef uniforms & kitchen linen for fine dining and hospitality." />
        <link rel="canonical" href="https://partridgelinen.com/restaurant" />
      </Helmet>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <LazyImage 
          src={restaurantHero} 
          alt="Elegant restaurant table setting with white tablecloth and napkins"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-px bg-white" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Restaurant Linens
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Restaurant Linen Hire Across London & the South East
            </h1>
          </div>
        </div>
      </section>
      
      <main className="flex-grow py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Back Button - only show if not from nav dropdown */}
          {!fromNav && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Button>
          )}

          {/* Header */}
          <div className="mb-10">
            <p className="text-foreground/70 font-body leading-relaxed text-lg">
              From tablecloths and napkins to kitchen linen and chef uniforms, Partridge Laundry delivers reliable, high-quality restaurant linen hire across London and the South East - supporting smooth service and a professional presentation every day.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {restaurantProducts.map((product, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-all duration-500 cursor-pointer flex flex-col h-full"
                onClick={() => setSelectedModal(modalData[product.modalSlug as keyof typeof modalData])}
              >
                <div className="aspect-[4/3] lg:aspect-square overflow-hidden">
                  <LazyImage
                    src={product.images[0]}
                    alt={product.alt}
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-display text-xl font-light text-foreground mb-3">
                    {product.title}
                  </h3>
                  <p className="text-foreground/70 font-body leading-relaxed mb-4 flex-grow">
                    {product.description}
                  </p>
                  <div className="flex items-center text-foreground/60 hover:text-foreground transition-colors duration-300 mt-auto">
                    <span className="text-sm font-light uppercase tracking-wide">View Collection</span>
                    <div className="w-4 h-px bg-current ml-3 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <WhyUsSection
            heading="Trusted for Over 30 Years and Counting"
            subheading=""
            imagePlaceholder={restaurantClient1}
            variant="compact"
            features={[
              {
                title: "Impeccable Linen Quality & Presentation",
                description: "Crisp, well-finished linen plays a vital role in your guests' dining experience. Our professional laundering, pressing, and finishing processes ensure tablecloths, napkins, chef uniforms, and kitchen wear are returned clean, fresh, and consistently presented to the highest standard.",
                icon: Award
              },
              {
                title: "Reliable Delivery Across London & South East",
                description: "We provide reliable restaurant linen hire throughout London, within the M25, and across the South East, including Brighton, Sevenoaks, and west beyond Southall. Our collection and delivery schedules are planned around your service times, ensuring your linen arrives on time, every time.",
                icon: Truck
              },
              {
                title: "Bespoke Linen Hire & Specialist Sourcing",
                description: "From daily linen requirements to specific colours, fabrics, or specialist items, we offer tailored commercial laundry solutions to suit your restaurant. We can source a wide range of table linen, napery, and chef wear, allowing you to maintain a consistent brand image.",
                icon: Users
              }
            ]}
          />

          {/* CTA Section */}
          <div className="bg-black rounded-lg p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
            
            <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
              Like what you see?
            </h2>
            <p className="text-white/70 font-body leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
              Tell us what you need and we'll put together a quote for you. Whether it's for a single event or regular service, we're here to help.
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
                onClick={() => setIsEnquiryOpen(true)}
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
        onClose={() => setIsEnquiryOpen(false)}
      />
      <CollectionModal
        isOpen={selectedModal !== null}
        onClose={() => setSelectedModal(null)}
        category={selectedModal ? {
          id: selectedModal.id,
          title: selectedModal.title,
          subtitle: '',
          description: selectedModal.description,
          images: selectedModal.images,
          slug: selectedModal.slug
        } : { id: 0, title: '', subtitle: '', description: '', images: [], slug: '' }}
      />
    </div>
  );
};

export default Restaurant;
