import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Sparkles, Truck, Building2, Search } from 'lucide-react';

import WhyUsSection from '@/components/WhyUsSection';
import LazyImage from '@/components/LazyImage';

import EnquiryModal from '@/components/EnquiryModal';
import CollectionModal from '@/components/CollectionModal';
import hotelBedFreshLinens from '@/assets/partridge-linen-hotel-bed-fresh-linens.webp';
import hotelTowelStack from '@/assets/partridge-linen-hotel-towel-stack-white.webp';
import hotelTowelBath from '@/assets/partridge-linen-hotel-towel-bath.webp';
import hotelTowelRolled from '@/assets/partridge-linen-hotel-towel-rolled.webp';
import hotelHero from '@/assets/partridge-linen-hotel-hero-bedroom.webp';
import hotelWhyusPillows from '@/assets/partridge-linen-hotel-why-us-pillows.webp';
import hotelBedLinenMain from '@/assets/partridge-linen-hotel-bed-linen-main.webp';
import hotelBedLinen1 from '@/assets/partridge-linen-hotel-bed-linen-white.webp';
import hotelBedLinen2 from '@/assets/partridge-linen-hotel-bed-linen-fresh.webp';

const HotelLinens = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState<{ id: number; title: string; description: string; images: string[]; slug: string } | null>(null);

  const modalData = {
    'bed-linen': {
      id: 7,
      title: 'Bed Linen',
      description: 'Luxury bed linens including duvet covers, bedsheets, and pillow cases for hospitality use.',
      images: [hotelBedLinen1, hotelBedLinenMain, hotelBedLinen2],
      slug: 'bed-linen'
    },
    'towel': {
      id: 8,
      title: 'Towel',
      description: 'Premium quality towels for hospitality use.',
      images: [hotelTowelStack, hotelTowelBath, hotelTowelRolled],
      slug: 'towel'
    }
  };

  const hotelProducts = [
    {
      title: 'Bed Linens',
      description: 'Premium quality bed sheets, duvet covers, and pillowcases for ultimate guest comfort.',
      images: [hotelBedLinen1, hotelBedLinenMain, hotelBedLinen2],
      modalSlug: 'bed-linen',
      alt: 'Crisp white hotel bed linen with fresh duvet cover and pillowcases'
    },
    {
      title: 'Bath Towels',
      description: 'Soft, absorbent towels in various sizes - bath sheets, hand towels, and face cloths.',
      images: [hotelTowelStack, hotelTowelBath, hotelTowelRolled],
      modalSlug: 'towel',
      alt: 'Stack of fluffy white hotel bath towels neatly folded'
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Hotel Linen Hire London | Bed Sheets & Towels | Partridge Linen</title>
        <meta name="description" content="Professional hotel linen hire across London & South East. Premium bed sheets, duvet covers, pillowcases & bath towels for hotels, B&Bs, and Airbnbs." />
        <link rel="canonical" href="https://partridgelinen.com/hotel-linens" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://partridgelinen.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Hotel Linen Hire",
                "item": "https://partridgelinen.com/hotel-linens"
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Hotel Linen Hire",
            "description": "Professional hotel linen hire service including premium bed sheets, duvet covers, pillowcases and bath towels for hotels, B&Bs and Airbnbs across London and the South East.",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Partridge Linen",
              "telephone": "+44-20-8653-6066",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "1-5 The Drive",
                "addressLocality": "Thornton Heath",
                "addressRegion": "Greater London",
                "postalCode": "CR7 8LB",
                "addressCountry": "GB"
              }
            },
            "areaServed": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "51.5074",
                "longitude": "-0.1278"
              },
              "geoRadius": "80000"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Hotel Linen Products",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Bed Linens",
                    "description": "Premium bed sheets, duvet covers, and pillowcases for ultimate guest comfort"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Bath Towels",
                    "description": "Soft, absorbent towels including bath sheets, hand towels, and face cloths"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <LazyImage 
          src={hotelHero} 
          alt="Luxury hotel bedroom with crisp white linens"
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-px bg-white" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Hotel Linens
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Complete Linen Service for Hotels
            </h1>
          </div>
        </div>
      </section>
      
      <main className="flex-grow py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Header */}
          <div className="mb-10">
            <p className="text-foreground/70 font-body leading-relaxed text-lg">
              Whether you run a hotel, boutique property, Airbnb, golf club, or gym, Partridge Laundry is your trusted partner for professional linen and towel hire across London and the South East, combining expertise and flexibility to meet the unique demands of every accommodation and leisure setting.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {hotelProducts.map((product, index) => (
              <div 
                key={index} 
                className="bg-card rounded-lg overflow-hidden hover:shadow-[var(--shadow-elegant)] transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedModal(modalData[product.modalSlug as keyof typeof modalData])}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <LazyImage
                    src={product.images[0]}
                    alt={product.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-light text-foreground mb-3">
                    {product.title}
                  </h3>
                  <p className="text-foreground/70 font-body leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center text-foreground/60 hover:text-foreground transition-colors duration-300">
                    <span className="text-sm font-light uppercase tracking-wide">View Collection</span>
                    <div className="w-4 h-px bg-current ml-3 transition-all duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <WhyUsSection
            heading="Hotel Linen That Scales With You"
            subheading=""
            imagePlaceholder={hotelWhyusPillows}
            variant="compact"
            features={[
              {
                title: "Linen Solutions for Every Hotel",
                description: "From high-volume commercial hotels to premium boutique properties, we provide tailored linen hire that fits your scale and style. Whether you need standard bed sheets, towels, or specialist luxury fabrics, we can supply exactly what your property requires.",
                icon: Building2
              },
              {
                title: "Premium Quality & Presentation",
                description: "Our professional laundering and finishing ensure crisp sheets, soft towels, and polished bedding every time. Guests notice the difference - well-presented linen enhances comfort and reflects the quality of your establishment.",
                icon: Sparkles
              },
              {
                title: "Reliable Large-Scale Deliveries",
                description: "We can handle large loads efficiently, collecting and delivering on schedules that suit your housekeeping operations. Serving all areas within the M25 and beyond, including Brighton, Sevenoaks, and west past Southall, we ensure your linen is always where and when you need it.",
                icon: Truck
              },
              {
                title: "Bespoke & Specialist Sourcing",
                description: "Need something unique? We can source all types of linen, towels, and bedding, no matter how specific your requirements. From luxurious fabrics for boutique hotels to practical high-turnover items for larger properties, we provide customised commercial laundry solutions that match your style and operational needs.",
                icon: Search
              }
            ]}
          />

          {/* CTA Section */}
          <div className="bg-black rounded-lg p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
            
            <h2 className="font-display text-2xl md:text-3xl font-light text-white mb-4">
              Want to refresh your hotel linens?
            </h2>
            <p className="text-white/70 font-body leading-relaxed text-lg mb-8 max-w-2xl mx-auto">
              Let us know what you need and we'll get you a quote. We handle everything from beds to towels.
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

export default HotelLinens;
