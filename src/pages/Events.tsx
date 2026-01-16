import { useState, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Phone, Mail, Images } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ModalSkeleton from '@/components/ModalSkeleton';

// Lazy load heavy modal components
const InstagramGallery = lazy(() => import('@/components/InstagramGallery'));
const EnquiryModal = lazy(() => import('@/components/EnquiryModal'));

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import EventProductSection from '@/components/events/EventProductSection';
import ChairCoversSection from '@/components/events/ChairCoversSection';
import EnquirySummary from '@/components/events/EnquirySummary';
import eventsHero from '@/assets/partridge-linen-events-hero-damask-table.webp';

// Damask swatch images
import damaskSwatchBlue from '@/assets/partridge-linen-events-damask-swatch-blue.webp';
import damaskSwatchBurgundy from '@/assets/partridge-linen-events-damask-swatch-burgundy.webp';
import damaskSwatchLimeGreen from '@/assets/partridge-linen-events-damask-swatch-lime-green.webp';
import damaskSwatchPurple from '@/assets/partridge-linen-events-damask-swatch-purple.webp';
import damaskSwatchSilver from '@/assets/partridge-linen-events-damask-swatch-silver.webp';
import damaskSwatchBabyBlue from '@/assets/partridge-linen-events-damask-swatch-baby-blue.webp';
import damaskSwatchIvory from '@/assets/partridge-linen-events-damask-swatch-ivory.webp';
import damaskSwatchBlack from '@/assets/partridge-linen-events-damask-swatch-black.webp';
import damaskSwatchRed from '@/assets/partridge-linen-events-damask-swatch-red.webp';
import damaskSwatchWhite from '@/assets/partridge-linen-events-damask-swatch-white.webp';
import damaskSwatchPeach from '@/assets/partridge-linen-events-damask-swatch-peach.webp';
import damaskSwatchGold from '@/assets/partridge-linen-events-damask-swatch-gold.webp';
import damaskSwatchChampagne from '@/assets/partridge-linen-events-damask-swatch-champagne.webp';
import damaskSwatchBabyPink from '@/assets/partridge-linen-events-damask-swatch-baby-pink.webp';
import damaskSwatchHotPink from '@/assets/partridge-linen-events-damask-swatch-hot-pink.webp';

// Classic swatch images
import classicSwatchWhite from '@/assets/partridge-linen-events-classic-swatch-white.webp';
import classicSwatchIvory from '@/assets/partridge-linen-events-classic-swatch-ivory.webp';
import classicSwatchRed from '@/assets/partridge-linen-events-classic-swatch-red.webp';
import classicSwatchBlack from '@/assets/partridge-linen-events-classic-swatch-black.webp';


// Gallery images - SEO optimized with Partridge Linen branding
import galleryWhiteDamaskCandles from '@/assets/partridge-linen-white-damask-candles.webp';
import galleryBlackDamaskMarquee from '@/assets/partridge-linen-black-damask-marquee.webp';
import galleryBlackRoundVenue from '@/assets/partridge-linen-black-round-venue.webp';
import galleryBlueDamaskFeathers from '@/assets/partridge-linen-blue-damask-feathers.webp';
import galleryBurgundyDamaskCrystal from '@/assets/partridge-linen-burgundy-damask-crystal.webp';
import galleryChampagneDamaskFloral from '@/assets/partridge-linen-champagne-damask-floral.webp';
import galleryGoldDamaskLanterns from '@/assets/partridge-linen-gold-damask-lanterns.webp';
import galleryHotPinkDamaskMarigold from '@/assets/partridge-linen-hot-pink-damask-marigold.webp';
import galleryIvoryDamaskGoldSetting from '@/assets/partridge-linen-ivory-damask-gold-setting.webp';
import galleryIvoryDamaskNapkinCloseup from '@/assets/partridge-linen-ivory-damask-napkin-closeup.webp';
import galleryIvoryDamaskGardenVenue from '@/assets/partridge-linen-ivory-damask-garden-venue.webp';
import galleryMultiColouredDamaskVenue from '@/assets/partridge-linen-multi-coloured-damask-venue.webp';


import galleryWhiteDamaskWeddingHall from '@/assets/partridge-linen-white-damask-wedding-hall.webp';
import galleryWhiteDamaskYellowSashes from '@/assets/partridge-linen-white-damask-yellow-sashes.webp';
import galleryWhiteDamaskReception from '@/assets/partridge-linen-white-damask-reception.webp';
import galleryWhiteRoundRoseCenterpiece from '@/assets/partridge-linen-white-round-rose-centerpiece.webp';
import galleryWhiteRoundPinkMarquee from '@/assets/partridge-linen-white-round-pink-marquee.webp';

import galleryWhiteGoldCandelabra from '@/assets/partridge-linen-white-gold-candelabra.webp';
import galleryIvoryDamaskMarqueeColorful from '@/assets/partridge-linen-ivory-damask-marquee-colorful.webp';

// New gallery images
import galleryBlackPlainRound from '@/assets/partridge-linen-black-plain-round.webp';
import galleryBlueDamaskFullCloth from '@/assets/partridge-linen-blue-damask-full-cloth.webp';
import galleryWhiteChairCoversPinkSash from '@/assets/partridge-linen-white-chair-covers-pink-sash.webp';
import galleryBlackDamaskGoldRimmed from '@/assets/partridge-linen-black-damask-gold-rimmed.webp';
import galleryWhiteLinenMarquee from '@/assets/partridge-linen-white-linen-marquee.webp';
import galleryWhiteRoundSetup from '@/assets/partridge-linen-white-round-setup.webp';
import galleryWhiteSetupMultiple from '@/assets/partridge-linen-white-setup-multiple.webp';
import galleryGreenGoldNapkins from '@/assets/partridge-linen-green-gold-napkins.webp';
import galleryWhiteRoundDarkLighting from '@/assets/partridge-linen-white-round-dark-lighting.webp';
import galleryWhiteRoundFloralCenterpiece from '@/assets/partridge-linen-white-round-floral-centerpiece.webp';

// Table Linen configuration with color-specific pricing and availability
const tableLinenColors = [
  { name: 'White', hex: '#FFFFFF', image: classicSwatchWhite },
  { name: 'Ivory', hex: '#F5F5DC', image: classicSwatchIvory },
  { name: 'Red', hex: '#B22222', image: classicSwatchRed },
  { name: 'Black', hex: '#1a1a1a', image: classicSwatchBlack },
];

// Product types vary by color - this is the base structure
const getTableLinenProductTypes = (colorName: string) => {
  const isWhite = colorName === 'White';
  const isIvory = colorName === 'Ivory';
  const isRed = colorName === 'Red';
  const isBlack = colorName === 'Black';
  
  // Price adjustments: White is base, others +10p napkin, +50p other sizes
  const napkinPrice = isWhite ? 0.60 : 0.70;
  const priceAdjust = isWhite ? 0 : 0.50;

  const products = [];

  // Napkins - all colors have napkins
  products.push({
    value: 'napkins',
    label: 'Napkins',
    sizes: [
      { value: 'standard', label: '20" x 20"', price: napkinPrice },
    ]
  });

  // Round tablecloths - White has all, Black has 118 & 130 only, Ivory & Red have none
  if (isWhite) {
    products.push({
      value: 'round-tablecloths',
      label: 'Round Tablecloths',
      sizes: [
        { value: '88', label: '88"', price: 8.00 },
        { value: '108', label: '108"', price: 8.50 },
        { value: '118', label: '118"', price: 9.00 },
        { value: '130', label: '130"', price: 9.50 },
      ]
    });
  } else if (isBlack) {
    products.push({
      value: 'round-tablecloths',
      label: 'Round Tablecloths',
      sizes: [
        { value: '118', label: '118"', price: 9.50 },
        { value: '130', label: '130"', price: 10.00 },
      ]
    });
  }
  // Ivory and Red have no round tablecloths

  // Rectangular tablecloths - varies by color
  if (isWhite) {
    products.push({
      value: 'rectangular-tablecloths',
      label: 'Rectangular Tablecloths',
      sizes: [
        { value: '54x54', label: '54" x 54"', price: 4.80 },
        { value: '70x70', label: '70" x 70"', price: 5.70 },
        { value: '90x90', label: '90" x 90"', price: 6.00 },
        { value: '70x108', label: '70" x 108"', price: 6.50 },
        { value: '70x144', label: '70" x 144"', price: 7.50 },
      ]
    });
  } else if (isIvory) {
    products.push({
      value: 'rectangular-tablecloths',
      label: 'Rectangular Tablecloths',
      sizes: [
        { value: '54x54', label: '54" x 54"', price: 5.30 },
        { value: '70x70', label: '70" x 70"', price: 6.20 },
        { value: '90x90', label: '90" x 90"', price: 6.50 },
        { value: '70x108', label: '70" x 108"', price: 7.00 },
        { value: '70x144', label: '70" x 144"', price: 8.00 },
      ]
    });
  } else if (isRed) {
    products.push({
      value: 'rectangular-tablecloths',
      label: 'Rectangular Tablecloths',
      sizes: [
        { value: '70x70', label: '70" x 70"', price: 6.20 },
        { value: '90x90', label: '90" x 90"', price: 6.50 },
        { value: '70x108', label: '70" x 108"', price: 7.00 },
      ]
    });
  } else if (isBlack) {
    products.push({
      value: 'rectangular-tablecloths',
      label: 'Rectangular Tablecloths',
      sizes: [
        { value: '70x70', label: '70" x 70"', price: 6.20 },
        { value: '90x90', label: '90" x 90"', price: 6.50 },
        { value: '70x144', label: '70" x 144"', price: 8.00 },
      ]
    });
  }

  return products;
};

// Damask configuration with image swatches
const damaskColors = [
  { name: 'White', hex: '#FFFFFF', image: damaskSwatchWhite },
  { name: 'Ivory', hex: '#F5F5DC', image: damaskSwatchIvory },
  { name: 'Black', hex: '#1a1a1a', image: damaskSwatchBlack },
  { name: 'Red', hex: '#B22222', image: damaskSwatchRed },
  { name: 'Blue', hex: '#1E90FF', image: damaskSwatchBlue },
  { name: 'Baby Blue', hex: '#89CFF0', image: damaskSwatchBabyBlue },
  { name: 'Baby Pink', hex: '#F4C2C2', image: damaskSwatchBabyPink },
  { name: 'Hot Pink', hex: '#FF69B4', image: damaskSwatchHotPink },
  { name: 'Peach', hex: '#FFDAB9', image: damaskSwatchPeach },
  { name: 'Champagne', hex: '#F7E7CE', image: damaskSwatchChampagne },
  { name: 'Gold', hex: '#D4AF37', image: damaskSwatchGold },
  { name: 'Burgundy', hex: '#800020', image: damaskSwatchBurgundy },
  { name: 'Lime Green', hex: '#9ACD32', image: damaskSwatchLimeGreen },
  { name: 'Purple', hex: '#9966CC', image: damaskSwatchPurple },
  { name: 'Silver', hex: '#C0C0C0', image: damaskSwatchSilver },
];

const damaskProductTypes = [
  {
    value: 'napkins',
    label: 'Napkins',
    sizes: [
      { value: 'standard', label: '20" x 20"', price: 0.80 },
    ]
  },
  {
    value: '70x144',
    label: '70" x 144" (Trestle Table)',
    sizes: [
      { value: '70x144', label: '70" x 144" (Trestle Table)', price: 9.50 },
    ]
  },
  {
    value: '130-round',
    label: '130" Round',
    sizes: [
      { value: '130', label: '130" Round', price: 11.00 },
    ]
  },
];

// Gallery images array for lightbox - SEO optimized with Partridge Linen branding
// Reordered for contrast with alternating colors
const galleryImages: { src: string; alt: string }[] = [
  // 1. Burgundy first
  { src: galleryBurgundyDamaskCrystal, alt: 'Partridge Linen burgundy damask tablecloth with etched crystal glassware and gold charger plates' },
  // 2. White chair covers (moved from 21)
  { src: galleryWhiteChairCoversPinkSash, alt: 'Partridge Linen white round tablecloths with white chair covers and pink satin sashes at wedding reception' },
  // 3. Blue
  { src: galleryBlueDamaskFeathers, alt: 'Partridge Linen royal blue damask tablecloth with gold centrepiece and feather decorations' },
  // 4. White marquee (moved from 22)
  { src: galleryWhiteLinenMarquee, alt: 'Partridge Linen white tablecloths in stunning marquee with blue uplighting and crystal chandeliers' },
  // 5. Black plain (moved from 26)
  { src: galleryBlackPlainRound, alt: 'Partridge Linen black plain round tablecloth with colourful floral centrepiece and purple uplighting at gala event' },
  // 6. White setup (moved from 23)
  { src: galleryWhiteRoundSetup, alt: 'Partridge Linen white round tablecloth with elegant floral centrepiece and chiavari chairs' },
  // 7. Ivory
  { src: galleryIvoryDamaskGoldSetting, alt: 'Partridge Linen ivory damask tablecloth with gold cutlery and glass charger plates at elegant wedding' },
  // 8. White dark lighting (moved from 25)
  { src: galleryWhiteRoundDarkLighting, alt: 'Partridge Linen white round tablecloth with tall floral centrepiece and elegant glassware in dramatic dark lighting' },
  // 9. Black
  { src: galleryBlackRoundVenue, alt: 'Partridge Linen black round tablecloths with gold napkins at large event venue with stage lighting' },
  // 10. White multiple (moved from 24)
  { src: galleryWhiteSetupMultiple, alt: 'Partridge Linen white round tablecloths at wedding venue with tall floral centrepieces and fairy light backdrop' },
  // 11. Champagne
  { src: galleryChampagneDamaskFloral, alt: 'Partridge Linen champagne damask tablecloth with pink roses and hydrangea floral arrangement' },
  // 12. White
  { src: galleryWhiteRoundFloralCenterpiece, alt: 'Partridge Linen white round tablecloths with elegant rose and eucalyptus centrepieces at conservatory wedding venue' },
  // 13. Gold
  { src: galleryGoldDamaskLanterns, alt: 'Partridge Linen gold damask tablecloth with vintage brass lanterns and colourful floral centrepiece' },
  // 14. Ivory
  { src: galleryIvoryDamaskNapkinCloseup, alt: 'Partridge Linen ivory damask napkin with floral pattern on gold charger plate with bokeh lights' },
  // 15. White
  { src: galleryWhiteDamaskCandles, alt: 'Partridge Linen white damask tablecloth with crystal candelabra and floral centrepiece at wedding reception' },
  // 16. Green
  { src: galleryGreenGoldNapkins, alt: 'Partridge Linen emerald green tablecloths with gold napkins and pink floral arrangements at elegant reception' },
  // 17. White
  { src: galleryWhiteDamaskWeddingHall, alt: 'Partridge Linen white damask tablecloths at large wedding hall with tall purple and pink floral centrepieces' },
  // 18. Ivory
  { src: galleryIvoryDamaskGardenVenue, alt: 'Partridge Linen ivory damask tablecloth with gold cutlery at garden conservatory wedding venue' },
  // 19. Blue
  { src: galleryBlueDamaskFullCloth, alt: 'Partridge Linen royal blue damask tablecloth with gold feather decorations and elegant place settings' },
  // 20. White
  { src: galleryWhiteDamaskYellowSashes, alt: 'Partridge Linen white damask tablecloth with yellow chair sashes and white floral centrepiece' },
  // 21. White
  { src: galleryWhiteDamaskReception, alt: 'Partridge Linen white damask round tablecloths at wedding reception with rose gold hoop floral displays' },
  // 22. Multi-coloured
  { src: galleryMultiColouredDamaskVenue, alt: 'Partridge Linen multi-coloured damask tablecloths in pink blue and yellow at party venue with purple uplighting' },
  // 23. White
  { src: galleryWhiteRoundRoseCenterpiece, alt: 'Partridge Linen white round tablecloth with tall glass vase and red rose arrangement at pink marquee wedding' },
  // 24. Ivory
  { src: galleryIvoryDamaskMarqueeColorful, alt: 'Partridge Linen ivory damask tablecloths in white marquee with vibrant pink yellow and orange floral arrangements' },
  // 25. White
  { src: galleryWhiteRoundPinkMarquee, alt: 'Partridge Linen white round tablecloths in elegant pink draped marquee with pastel floral centrepieces' },
  // 26. White with gold
  { src: galleryWhiteGoldCandelabra, alt: 'Partridge Linen white round tablecloth with gold candelabra centrepiece and matching gold charger plates' },
  // 27. Navy/Black gold rimmed
  { src: galleryBlackDamaskGoldRimmed, alt: 'Partridge Linen navy blue damask tablecloth with gold rimmed plates and chiavari chairs at conservatory venue' },
  // 28. Black damask marquee
  { src: galleryBlackDamaskMarquee, alt: 'Partridge Linen black damask tablecloths with gold chiavari chairs in marquee with fairy lights' },
  // 29. Hot pink near end
  { src: galleryHotPinkDamaskMarigold, alt: 'Partridge Linen hot pink damask tablecloth with marigold garlands for Indian wedding celebration' },
  // 30. Hero image last
  { src: eventsHero, alt: 'Partridge Linen damask tablecloth with elegant fine dining place setting and crystal glassware' },
];

const Events = () => {
  const navigate = useNavigate();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Event Linen Hire London | Wedding & Party Tablecloths | Partridge Linen</title>
        <meta name="description" content="Premium event linen hire for weddings, parties & corporate events. Damask tablecloths, chair covers & napkins in 15+ colours. London & South East delivery." />
        <link rel="canonical" href="https://partridgelinen.com/events" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Event Linen Hire",
            "description": "Premium event linen hire for weddings, parties and corporate events. Damask tablecloths, chair covers and napkins in 15+ colours with London and South East delivery.",
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
              "name": "Event Linen Products",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Damask Tablecloths",
                    "description": "Elegant damask tablecloths in 15+ colours for weddings and events"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Classic Tablecloths",
                    "description": "Plain tablecloths in white, ivory, black and red for events"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Chair Covers",
                    "description": "Elegant chair covers in white and black with optional sashes"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Napkins",
                    "description": "Quality napkins in damask and classic styles to match tablecloths"
                  }
                }
              ]
            }
          })}
        </script>
      </Helmet>
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img 
          src={eventsHero} 
          alt="Elegant damask tablecloth with fine dining place setting"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-px bg-white" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Event Hire
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              Elegant Linens for <span className="text-white">Your Special Events</span>
            </h1>
          </div>
        </div>
      </section>

      <main className="py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Intro text with Gallery button */}
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-foreground/70 font-body leading-relaxed text-base">
              From weddings and private parties to corporate events, we provide premium tablecloths, damask linens, and accessories to make every occasion unforgettable. All items are available to hire and can be added straight to your basket for ultimate convenience.
            </p>
            <Button 
              onClick={() => setGalleryOpen(true)}
              className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0"
            >
              <Images className="w-4 h-4 mr-2" />
              View Gallery
            </Button>
          </div>

          {/* 2x2 Grid Layout */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Top Left - Classic Linen */}
            <div>
              <EventProductSection
                title="Classic Linen"
                colors={tableLinenColors}
                getProductTypesForColor={getTableLinenProductTypes}
                sizeGuideType="both"
                showColorNote={true}
              />
            </div>

            {/* Top Right - Damask Linen */}
            <div>
              <EventProductSection
                title="Damask Linen"
                colors={damaskColors}
                productTypes={damaskProductTypes}
                sizeGuideType="both"
              />
            </div>

            {/* Bottom Left - Chair Covers */}
            <ChairCoversSection />

            {/* Bottom Right - Gallery */}
            <div id="event-gallery">
              <div className="bg-muted/30 border border-border rounded-lg overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:bg-muted/40 flex flex-col">
                <h2 className="font-display text-lg font-medium text-foreground p-4 pb-3 text-center sm:text-left">Event Gallery</h2>
                {/* Preview grid - 3x3, no gaps, Instagram-style flush layout */}
                <div className="grid grid-cols-3 gap-0 lg:flex-1 lg:grid-rows-3">
                  {galleryImages.slice(0, 9).map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setGalleryOpen(true)}
                      className="relative overflow-hidden bg-muted focus:outline-none aspect-square lg:aspect-auto lg:w-full lg:h-full"
                      aria-label={`View event gallery - ${image.alt}`}
                    >
                      <img 
                        src={image.src} 
                        alt={image.alt} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-110" 
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
                
                {/* View all button */}
                <button
                  onClick={() => setGalleryOpen(true)}
                  className="m-3 py-2 px-4 bg-primary hover:bg-primary/90 rounded-lg flex items-center justify-center gap-2 text-primary-foreground transition-colors"
                  aria-label="View all event gallery images"
                >
                  <span className="font-body text-sm">View all</span>
                </button>
              </div>
            </div>
          </div>

          {/* Instagram-style Gallery Lightbox */}
          {galleryOpen && (
            <Suspense fallback={<ModalSkeleton type="gallery" />}>
              <InstagramGallery
                images={galleryImages}
                isOpen={galleryOpen}
                onClose={() => setGalleryOpen(false)}
              />
            </Suspense>
          )}

          {/* FAQ Section - Centered */}
          <div className="max-w-3xl mx-auto my-12 bg-muted-foreground/10 border border-border/50 rounded-xl p-6 md:p-10">
            <h2 className="font-display text-2xl font-light text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-display text-sm text-left">
                  What is the lead time for placing an order?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  We recommend submitting your order at least 5 working days prior to your event date. While same-week orders can often be accommodated, we must check stock availability before confirming.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="font-display text-sm text-left">
                  What are the collection and delivery options?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  Collection and return are free from our premises in Thornton Heath, Croydon. If you require delivery, you can request this option at checkout. Your invoice will be sent within one working day, giving us time to check stock and give an accurate delivery quote for your location.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="font-display text-sm text-left">
                  How does the refundable damage deposit work?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  <p className="mb-3">A fully refundable deposit is required for all hire items. The deposit is returned after items are checked at our premises.</p>
                  <p className="font-medium text-foreground mb-2">Deposit amounts:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2 mb-4">
                    <li><span className="font-medium">Classic Tablecloths:</span> £8.00 deposit (except 54" x 54" which is £4.00)</li>
                    <li><span className="font-medium">Classic Napkins:</span> Deposit same as hire price</li>
                    <li><span className="font-medium">Damask Tablecloths (70" x 144" & Round):</span> £12.50 deposit</li>
                    <li><span className="font-medium">Damask Napkins:</span> £1.00 deposit</li>
                  </ul>
                  <p className="font-medium text-foreground mb-2">Deposit deductions apply for:</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Permanent and indelible stains</li>
                    <li>Burns or heat damage</li>
                    <li>Tears, holes, or fabric damage</li>
                    <li>Chemical and mould damage</li>
                    <li>Stubborn chewing gum</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="font-display text-sm text-left">
                  What is the standard hire period?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  Our standard hire period is 3 days. If you need the items for longer, please let us know and we can arrange an extended hire.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-invoice">
                <AccordionTrigger className="font-display text-sm text-left">
                  When will I receive my invoice/payment link?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  Your full invoice, including any delivery charges, will be emailed to you within one working day of placing your order. This gives us time to check stock and give an accurate delivery quote for your location. A SumUp payment link will be included in the email, allowing you to pay securely by credit or debit card.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="font-display text-sm text-left">
                  Do I need to wash the items before returning?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body leading-relaxed text-sm">
                  No, you don't need to wash the items. Simply return them in a bag or box. We handle all the cleaning professionally.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Why Choose Us Section */}
          <div className="my-10">
            <h2 className="font-display text-2xl font-light text-foreground mb-6 text-center">
              Why Choose Partridge Linen?
            </h2>
            
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">✨</span>
                </div>
                <h3 className="font-display text-base font-medium text-foreground mb-1">Premium Quality</h3>
                <p className="text-foreground/60 text-sm">
                  Professionally cleaned and maintained to the highest standards.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">🚚</span>
                </div>
                <h3 className="font-display text-base font-medium text-foreground mb-1">Flexible Delivery</h3>
                <p className="text-foreground/60 text-sm">
                  Free collection from Croydon or convenient delivery to your venue.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-xl">💬</span>
                </div>
                <h3 className="font-display text-base font-medium text-foreground mb-1">Personal Service</h3>
                <p className="text-foreground/60 text-sm">
                  Family-run business with over 40 years of experience.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-black rounded-lg p-6 md:p-10 my-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
            
            <h2 className="font-display text-xl md:text-2xl font-light text-white mb-3">
              Ready to Make Your Event Special?
            </h2>
            <p className="text-white/70 font-body leading-relaxed mb-6 max-w-xl mx-auto">
              Get in touch with us to discuss your requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="tel:02086536066"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-black rounded hover:bg-white/90 transition-colors font-body text-sm"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Us
              </a>
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="inline-flex items-center justify-center px-5 py-2.5 bg-white text-black rounded hover:bg-white/90 transition-colors font-body text-sm"
              >
                <Mail className="w-4 h-4 mr-2" />
                Email Us
              </button>
            </div>
          </div>
        </div>
      </main>

      <EnquirySummary />
      <Footer onEmailClick={() => setIsEnquiryOpen(true)} />
      {isEnquiryOpen && (
        <Suspense fallback={<ModalSkeleton type="form" />}>
          <EnquiryModal
            isOpen={isEnquiryOpen}
            onClose={() => setIsEnquiryOpen(false)}
            productName="Event Hire"
          />
        </Suspense>
      )}
    </div>
  );
};

export default Events;