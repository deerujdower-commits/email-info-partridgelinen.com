import { useEffect, memo } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LazyImage from './LazyImage';

interface SuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestions: Array<{ name: string; reason: string; image: string }>;
  onAddSuggestion: (name: string) => void;
}

const SuggestionModal = memo(({ isOpen, onClose, suggestions, onAddSuggestion }: SuggestionModalProps) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || suggestions.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto animate-fade-in">
      <div className="bg-background border border-border rounded-lg max-w-2xl w-full my-8 flex flex-col max-h-[calc(100vh-4rem)] animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border flex-shrink-0">
          <div>
            <h3 className="text-xl font-display text-foreground">You might also need</h3>
            <p className="text-sm text-foreground/60 font-body mt-1">Complete your order with these items</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close suggestions">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Suggestions Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto flex-1">
          {suggestions.map((suggestion, index) => (
            <div 
              key={index}
              className="group bg-muted/30 rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors duration-200 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <LazyImage
                  src={suggestion.image}
                  alt={`Partridge Linen suggested product: ${suggestion.name} - ${suggestion.reason}`}
                  className="w-full h-full transition-transform duration-300 group-hover:scale-105"
                  priority={index < 2}
                />
              </div>
              <div className="p-4">
                <h4 className="font-display text-lg text-foreground mb-1">{suggestion.name}</h4>
                <p className="text-sm text-foreground/60 font-body mb-3">{suggestion.reason}</p>
                <Button 
                  className="w-full"
                  onClick={() => {
                    onAddSuggestion(suggestion.name);
                    onClose();
                  }}
                >
                  Add to Enquiry
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-end gap-3 flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            No thanks
          </Button>
        </div>
      </div>
    </div>
  );
});

SuggestionModal.displayName = 'SuggestionModal';

export default SuggestionModal;
