import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, X, ChevronRight, ChevronUp } from 'lucide-react';
import { useEnquiry } from '@/contexts/EnquiryContext';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const EnquirySummary = () => {
  const { items, getTotalItems, removeItem } = useEnquiry();
  const navigate = useNavigate();
  const location = useLocation();
  const totalItems = getTotalItems();
  const isMobile = useIsMobile();
  
  // Track if expanded (on mobile, collapsed by default)
  const [isExpanded, setIsExpanded] = useState(false);
  const prevItemCountRef = useRef(totalItems);
  const autoCollapseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-expand when new item added, then auto-collapse after 2s (mobile only)
  useEffect(() => {
    if (isMobile && totalItems > prevItemCountRef.current) {
      // New item was added
      setIsExpanded(true);
      
      // Clear any existing timer
      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
      }
      
      // Auto-collapse after 2 seconds
      autoCollapseTimerRef.current = setTimeout(() => {
        setIsExpanded(false);
      }, 2000);
    }
    
    prevItemCountRef.current = totalItems;
    
    return () => {
      if (autoCollapseTimerRef.current) {
        clearTimeout(autoCollapseTimerRef.current);
      }
    };
  }, [totalItems, isMobile]);

  // Hide on enquiry page to avoid blocking navigation
  if (totalItems === 0 || location.pathname === '/enquiry') return null;

  // On mobile, show minimized button when collapsed
  if (isMobile && !isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-xl flex items-center gap-2 active:scale-95 transition-transform"
        aria-label="View enquiry basket"
      >
        <ShoppingBag className="w-6 h-6" />
        <span className="bg-primary-foreground text-primary text-sm font-bold px-2 py-0.5 rounded-full">
          {totalItems}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto sm:left-auto sm:right-4 sm:mx-0 z-50 max-w-sm w-[calc(100%-2rem)] sm:w-auto">
      <div className="bg-background border-2 border-primary shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary text-primary-foreground px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            <span className="font-display text-sm font-medium">Your Enquiry</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-primary-foreground text-primary text-xs font-bold px-2 py-0.5 rounded-full">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
            {isMobile && (
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
                aria-label="Minimize basket"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Items List */}
        <div className="max-h-48 overflow-y-auto p-3 space-y-2">
          {items.slice(0, 5).map((item) => (
            <div 
              key={item.id} 
              className="flex items-center gap-2 bg-muted/50 rounded-lg p-2 text-sm"
            >
              {item.image && (
                <img 
                  src={item.image} 
                  alt={`${item.color || ''} ${item.name} - ${item.quantity} items in enquiry`.trim()}
                  className="w-8 h-8 object-cover rounded"
                  loading="lazy"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-body text-foreground truncate text-xs">
                  {item.quantity}x {item.color} {item.name.split(' - ')[1] || item.name}
                </p>
                {item.size && (
                  <p className="text-foreground/50 text-xs">{item.size}</p>
                )}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-foreground/40 hover:text-destructive transition-colors p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {items.length > 5 && (
            <p className="text-xs text-foreground/50 text-center">
              +{items.length - 5} more items
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-border p-3">
          <Button 
            onClick={() => navigate('/enquiry')}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="sm"
          >
            View Full Enquiry
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnquirySummary;