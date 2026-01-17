import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus, Minus, Send, X, Grid3x3, Info, Truck, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Import images from collection page
const studioFittedWhiteTablecloth = '/lovable-uploads/cf54b1ce-fef7-4ac1-8bbc-34b126347063.png';
const studioFittedWhiteNapkins = '/lovable-uploads/ba361677-0711-413a-901e-2ef6e8e9905c.png';
const chefJacketNew = '/lovable-uploads/d6d4a833-19ec-475e-bc4c-d85c2ba88188.png';
const chefTrousersNew = '/lovable-uploads/005231c4-59e0-4684-9317-0f2b0a3f6c5a.png';
const towelImage = '/lovable-uploads/92183863-59d1-46cc-b1d8-7cd663c0a9db.png';

const Enquiry = () => {
  const { items, removeItem, updateQuantity, clearEnquiry, getTotalItems } = useEnquiry();
  const { toast } = useToast();
  const [showFormModal, setShowFormModal] = useState(false);
  const [wantsDelivery, setWantsDelivery] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Calculate deposit for an item
  const calculateItemDeposit = (item: typeof items[0]): number => {
    const name = item.name.toLowerCase();
    const size = item.size?.toLowerCase() || '';
    
    // Chair covers and sashes
    if (name.includes('chair cover sash') || name.includes('sash')) {
      return 0.50 * item.quantity; // Chair sash: £0.50 deposit
    }
    if (name.includes('chair cover')) {
      return 1.00 * item.quantity; // Chair cover: £1 deposit
    }
    
    // Damask items
    if (name.includes('damask')) {
      if (name.includes('napkin')) {
        return 1.00 * item.quantity; // Damask napkin: £1 deposit
      }
      // Damask tablecloths (70x144 or round): £12.50 deposit
      return 12.50 * item.quantity;
    }
    
    // Classic items
    if (name.includes('napkin')) {
      // Classic napkins: deposit same as price - need to extract price from item
      // Assuming classic napkins are around £0.50-£0.80, we'll use the item price
      return 0.50 * item.quantity; // Default napkin deposit matches typical price
    }
    
    if (name.includes('tablecloth') || name.includes('linen')) {
      // Check for 54x54 size
      if (size.includes('54') && size.includes('54')) {
        return 4.00 * item.quantity; // 54x54: £4 deposit
      }
      return 8.00 * item.quantity; // Other classic tablecloths: £8 deposit
    }
    
    // Default deposit for other items
    return 0;
  };

  // Calculate totals
  const calculateTotals = () => {
    let orderPrice = 0;
    let totalDeposit = 0;
    
    items.forEach(item => {
      // Calculate order price from item price
      if (item.price) {
        orderPrice += item.price * item.quantity;
      }
      totalDeposit += calculateItemDeposit(item);
    });
    
    return { orderPrice, totalDeposit };
  };

  const { orderPrice, totalDeposit } = calculateTotals();

  const handleSubmitClick = () => {
    setShowFormModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message with pricing
    const itemsList = items.map(item => {
      let itemDetails = `- ${item.name} (Qty: ${item.quantity})`;
      if (item.size) itemDetails += ` - Size: ${item.size}`;
      if (item.color) itemDetails += ` - Color: ${item.color}`;
      if (item.price) itemDetails += ` - £${item.price.toFixed(2)} each = £${(item.price * item.quantity).toFixed(2)}`;
      if (item.hireDate) {
        const startDate = new Date(item.hireDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        const endDate = new Date(new Date(item.hireDate).getTime() + 72 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
        itemDetails += ` - Hire: ${startDate} to ${endDate}`;
      }
      return itemDetails;
    }).join('\n');
    
    // Add pricing summary
    const pricingSummary = `\n\nPricing Summary:\nTotal Price: £${orderPrice.toFixed(2)}\nRefundable Deposit: £${totalDeposit.toFixed(2)}\nEstimated Total: £${(orderPrice + totalDeposit).toFixed(2)}`;
    
    const deliveryOption = wantsDelivery 
      ? `\n\nDelivery: Yes, please quote for delivery\nDelivery Address: ${formData.address}` 
      : '\n\nDelivery: No, I will collect';
    const message = `New Enquiry from ${formData.name}\n\nEmail: ${formData.email}\nPhone: ${formData.phone}${deliveryOption}\n\nItems Requested:\n${itemsList}${pricingSummary}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/442086536066?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Enquiry sent!",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Clear form and enquiry
    clearEnquiry();
    setFormData({ name: '', email: '', phone: '', address: '' });
    setShowFormModal(false);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Enquiry Basket | Partridge Linen</title>
          <meta name="description" content="Review your linen hire enquiry basket. Request quotes for tablecloths, napkins, chair covers & event linens from Partridge Linen." />
          <link rel="canonical" href="https://partridgelinen.com/enquiry" />
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
                  "name": "Enquiry Basket",
                  "item": "https://partridgelinen.com/enquiry"
                }
              ]
            })}
          </script>
        </Helmet>
        <Navigation />
        <main className="pt-32 pb-12">
          <div className="max-w-4xl mx-auto px-6 md:px-12">
            <div className="text-center mb-12">
              <div className="flex items-center gap-4 mb-6 justify-center">
                <div className="w-16 h-px bg-gradient-to-r from-accent to-accent-blue" />
                <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
                  Your Enquiry
                </span>
                <div className="w-16 h-px bg-gradient-to-l from-accent to-accent-blue" />
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-light text-foreground tracking-tight mb-6">
                Your basket is empty
              </h1>
              <p className="text-foreground/70 font-body leading-relaxed text-lg mb-8">
                Browse our collection and add items you're interested in
              </p>
              <Link to="/events">
                <Button variant="gradient" className="font-body">
                  <Grid3x3 className="w-4 h-4 mr-2" />
                  Browse Collection
                </Button>
              </Link>
            </div>

            {/* Delivery Option */}
            <div className="bg-secondary/30 border border-border rounded-lg p-6 mb-8">
              <div className="flex items-center gap-3">
                <Checkbox 
                  id="delivery-empty" 
                  checked={wantsDelivery}
                  onCheckedChange={(checked) => setWantsDelivery(checked as boolean)}
                  className="h-5 w-5"
                />
                <label htmlFor="delivery-empty" className="font-body text-foreground cursor-pointer flex items-center gap-2">
                  <Truck className="w-4 h-4 text-accent" />
                  I would like delivery (instead of free collection)
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button type="button" className="text-foreground/60 hover:text-accent transition-colors">
                      <Info className="w-4 h-4" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm">
                    Delivery price is calculated based on distance and route availability. See FAQ below for details.
                  </PopoverContent>
                </Popover>
              </div>
              {!wantsDelivery && (
                <p className="text-sm text-foreground/60 font-body mt-2 ml-8">
                  Free collection available from our premises
                </p>
              )}
            </div>

            {/* Delivery FAQ */}
            <div className="bg-secondary/20 border border-border rounded-lg p-6">
              <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-accent" />
                Delivery Information
              </h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="how-delivery-works" className="border-border">
                <AccordionTrigger className="font-body text-foreground hover:text-accent text-left">
                    How does delivery pricing work?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 font-body text-left">
                    Delivery costs are calculated based on the distance from our premises to your location. Your delivery quote will be included in your invoice, which is sent by email within one working day of your order.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="reduced-price" className="border-border">
                <AccordionTrigger className="font-body text-foreground hover:text-accent text-left">
                    Can delivery be cheaper?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 font-body text-left">
                    Yes! If on the date of your order we have a driver already heading in your direction, your delivery price will be reduced. We always try to consolidate routes to offer the best possible rates.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="invoice-timing" className="border-border">
                <AccordionTrigger className="font-body text-foreground hover:text-accent text-left">
                    When will I receive my invoice/payment link?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 font-body text-left">
                    Your full invoice, including any delivery charges, will be emailed to you within one working day of placing your order. This gives us time to check stock and give an accurate delivery quote for your location. A SumUp payment link will be included in the email, allowing you to pay securely by credit or debit card.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="free-collection" className="border-border">
                <AccordionTrigger className="font-body text-foreground hover:text-accent text-left">
                    What about collection?
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 font-body text-left">
                    Collection from our premises is always free. Simply leave the delivery checkbox unticked and we'll arrange a convenient collection time with you.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Enquiry Basket | Partridge Linen</title>
        <meta name="description" content="Review your linen hire enquiry basket. Request quotes for tablecloths, napkins, chair covers & event linens from Partridge Linen." />
        <link rel="canonical" href="https://partridgelinen.com/enquiry" />
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
                "name": "Enquiry Basket",
                "item": "https://partridgelinen.com/enquiry"
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How does delivery pricing work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Delivery costs are calculated based on the distance from our premises to your location. Your delivery quote will be included in your invoice, which is sent by email within one working day of your order."
                }
              },
              {
                "@type": "Question",
                "name": "Can delivery be cheaper?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! If on the date of your order we have a driver already heading in your direction, your delivery price will be reduced. We always try to consolidate routes to offer the best possible rates."
                }
              },
              {
                "@type": "Question",
                "name": "When will I receive my invoice/payment link?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Your full invoice, including any delivery charges, will be emailed to you within one working day of placing your order. This gives us time to check stock and give an accurate delivery quote for your location. A SumUp payment link will be included in the email, allowing you to pay securely by credit or debit card."
                }
              },
              {
                "@type": "Question",
                "name": "What about collection?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Collection from our premises is always free. Simply leave the delivery checkbox unticked and we'll arrange a convenient collection time with you."
                }
              },
              {
                "@type": "Question",
                "name": "How do deposits work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "All hire items require a fully refundable deposit, returned when items come back in good condition. Classic Tablecloths have £8 deposit (£4 for 54x54 size), Classic Napkins deposit matches hire price, Damask Napkins have £1 deposit, Damask Tablecloths (70x144 & Round) have £12.50 deposit, Chair Covers have £1 deposit, and Chair Sashes have £0.50 deposit. Deductions apply for permanent stains, burns, tears, chemical damage, or stubborn chewing gum."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <Navigation />
      
      <main className="pt-32 pb-12">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-accent to-accent-blue" />
              <span className="font-body text-sm font-light uppercase tracking-[0.2em] text-foreground/60">
                Your Enquiry
              </span>
            </div>
            
            <div className="flex items-end justify-between">
              <h1 className="font-display text-3xl md:text-4xl font-light text-foreground leading-tight">
                Selected Items
                <span className="block text-accent text-2xl md:text-3xl mt-2">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'}
                </span>
              </h1>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearEnquiry}
                className="text-destructive border-destructive hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          </div>

          {/* Enquiry Items */}
          <div className="space-y-4 mb-8">
            {items.map((item) => {
              // Extract size and color from description
              const sizeMatch = item.description?.match(/Size:\s*([^-]+)/);
              const colorMatch = item.description?.match(/Color:\s*([^-]+)/);
              const size = item.size || sizeMatch?.[1]?.trim();
              const color = item.color || colorMatch?.[1]?.trim();
              
              return (
                <div 
                  key={item.id} 
                  className="bg-secondary/30 border border-border rounded-lg p-4 md:p-6 hover:border-accent/50 transition-colors duration-300"
                >
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={`${item.name} - ${item.color || ''} ${item.size || ''} linen product in enquiry basket`.trim()}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0"
                      loading="lazy"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-display text-lg md:text-xl text-foreground">{item.name}</h3>
                        {item.price && (
                          <span className="font-body text-accent font-medium">£{item.price.toFixed(2)} each</span>
                        )}
                      </div>
                      <p className="text-xs text-foreground/60 font-body mb-2">3 Day Hire</p>
                      
                      <div className="space-y-1 mb-3">
                        {size && (
                          <p className="text-sm text-foreground/70 font-body">
                            <span className="font-medium">Size:</span> {size}
                          </p>
                        )}
                        {color && (
                          <p className="text-sm text-foreground/70 font-body">
                            <span className="font-medium">Color:</span> {color}
                          </p>
                        )}
                        {item.hireDate && (
                          <p className="text-sm text-foreground/70 font-body">
                            <span className="font-medium">Hire Date:</span> {new Date(item.hireDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} - {new Date(new Date(item.hireDate).getTime() + 72 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          
                          <span className="w-10 text-center font-body font-medium text-foreground">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        {item.price && (
                          <span className="font-body text-foreground font-medium">
                            = £{(item.price * item.quantity).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary with Checkout */}
          {items.length > 0 && (
            <div className="bg-accent-blue rounded-lg overflow-hidden shadow-lg mb-8">
              {/* Summary Section */}
              <div className="p-6 border-b border-white/20">
                <h3 className="font-display text-xl text-white mb-4">Order Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center font-body text-white/80">
                    <span>Hire Price <span className="text-white/60 text-sm">inc. VAT</span></span>
                    <span className="text-white font-medium">£{orderPrice.toFixed(2)}</span>
                  </div>
                  {totalDeposit > 0 && (
                    <div className="flex justify-between items-center font-body">
                      <div className="flex items-center gap-2">
                        <span className="text-white/80">Refundable Deposit</span>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button type="button" className="text-white/60 hover:text-white transition-colors">
                              <Info className="w-4 h-4" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="max-w-xs text-sm" side="top">
                            Deposit is fully refundable when items are returned in good condition. See FAQ below for details.
                          </PopoverContent>
                        </Popover>
                      </div>
                      <span className="text-white font-medium">£{totalDeposit.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-3 mt-3">
                    <div className="flex justify-between items-center font-body">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-white font-display text-2xl">£{(orderPrice + totalDeposit).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Option */}
              <div className="p-6 border-b border-white/20 bg-white/5">
                <div className="flex items-center gap-3">
                  <Checkbox 
                    id="delivery" 
                    checked={wantsDelivery}
                    onCheckedChange={(checked) => setWantsDelivery(checked as boolean)}
                    className="h-5 w-5 border-white/50 data-[state=checked]:bg-white data-[state=checked]:text-accent-blue"
                  />
                  <label htmlFor="delivery" className="font-body text-white cursor-pointer flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    I would like delivery (instead of free collection)
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button type="button" className="text-white/60 hover:text-white transition-colors">
                        <Info className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-xs text-sm" side="top">
                      Delivery price is calculated based on distance and route availability. See FAQ below for details.
                    </PopoverContent>
                  </Popover>
                </div>
                {!wantsDelivery && (
                  <p className="text-sm text-white/60 font-body mt-2 ml-8">
                    Free collection available from our premises
                  </p>
                )}
              </div>

              {/* Checkout Button */}
              <div className="p-6 text-center">
                <p className="text-white/80 font-body mb-4 text-sm">
                  Payment link will be sent to you by email after checking stock within one working day.
                </p>
                <Button 
                  onClick={handleSubmitClick}
                  size="lg"
                  className="bg-white text-accent-blue hover:bg-white/90 font-body px-12 py-6 text-lg shadow-lg"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Checkout
                </Button>
              </div>
            </div>
          )}

          {/* Delivery & Deposit FAQ */}
          <div className="bg-secondary/20 border border-border rounded-lg p-6">
            <h3 className="font-display text-xl text-foreground mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-accent" />
              Delivery & Deposit Information
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="how-delivery-works" className="border-border">
                <AccordionTrigger className="font-body text-foreground hover:text-accent text-left">
                  How does delivery pricing work?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body text-left">
                  Delivery costs are calculated based on the distance from our premises to your location. Your delivery quote will be included in your invoice, which is sent by email within one working day of your order.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="reduced-price" className="border-border">
                <AccordionTrigger className="font-body text-foreground hover:text-accent text-left">
                  Can delivery be cheaper?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body text-left">
                  Yes! If on the date of your order we have a driver already heading in your direction, your delivery price will be reduced. We always try to consolidate routes to offer the best possible rates.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="invoice-timing" className="border-border">
                <AccordionTrigger className="font-body text-foreground hover:text-accent text-left">
                  When will I receive my invoice/payment link?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body text-left">
                  Your full invoice, including any delivery charges, will be emailed to you within one working day of placing your order. This gives us time to check stock and give an accurate delivery quote for your location. A SumUp payment link will be included in the email, allowing you to pay securely by credit or debit card.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="free-collection" className="border-border">
                <AccordionTrigger className="font-body text-foreground hover:text-accent text-left">
                  What about collection?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body text-left">
                  Collection from our premises is always free. Simply leave the delivery checkbox unticked and we'll arrange a convenient collection time with you.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="deposit-info" className="border-border">
                <AccordionTrigger className="font-body text-foreground hover:text-accent text-left">
                  How do deposits work?
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 font-body text-left">
                  All hire items require a fully refundable deposit, returned when items come back in good condition. Deposit amounts vary by product type:
                  <ul className="list-disc list-inside mt-2 space-y-1 mb-3">
                    <li><strong>Classic Tablecloths:</strong> £8 deposit (£4 for 54x54 size)</li>
                    <li><strong>Classic Napkins:</strong> Deposit matches the hire price</li>
                    <li><strong>Damask Napkins:</strong> £1 deposit</li>
                    <li><strong>Damask Tablecloths (70x144 & Round):</strong> £12.50 deposit</li>
                    <li><strong>Chair Covers:</strong> £1 deposit</li>
                    <li><strong>Chair Sashes:</strong> £0.50 deposit</li>
                  </ul>
                  <p className="font-medium text-foreground mb-2">Deposit deductions apply for:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Permanent and indelible stains</li>
                    <li>Burns or heat damage</li>
                    <li>Tears, holes, or fabric damage</li>
                    <li>Chemical and mould damage</li>
                    <li>Stubborn chewing gum</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </main>

      {/* Form Modal */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background border border-border rounded-lg max-w-md w-full animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="text-xl font-display text-foreground">Just a few details</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowFormModal(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-body text-foreground/80 mb-2">
                  Name *
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  required
                  className="font-body"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-body text-foreground/80 mb-2">
                  Email *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  required
                  className="font-body"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-body text-foreground/80 mb-2">
                  Phone Number *
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Your phone number"
                  required
                  className="font-body"
                />
              </div>
              
              {wantsDelivery && (
                <div>
                  <label htmlFor="address" className="block text-sm font-body text-foreground/80 mb-2">
                    Delivery Address *
                  </label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Your delivery address"
                    required
                    className="font-body"
                  />
                </div>
              )}
              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowFormModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Enquiry
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Enquiry;
