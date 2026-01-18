import { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon?: LucideIcon;
}

interface WhyUsSectionProps {
  heading: string;
  subheading: string;
  features: Feature[];
  imagePlaceholder?: string;
  images?: string[];
  variant?: 'default' | 'compact';
}

const WhyUsSection = ({ heading, subheading, features, imagePlaceholder, images, variant = 'default' }: WhyUsSectionProps) => {
  // Take first 4 features for the 2x2 grid, or all for compact
  const displayFeatures = variant === 'compact' ? features : features.slice(0, 4);

  // Use images array if provided, otherwise fall back to single imagePlaceholder
  const displayImages = images && images.length > 0 ? images : imagePlaceholder ? [imagePlaceholder] : [];

  if (variant === 'compact') {
    return (
      <section className="bg-accent rounded-lg overflow-hidden mb-12">
        <div className="grid lg:grid-cols-3 gap-0">
          {/* Image Section - narrower */}
          <div className="lg:min-h-[400px] bg-accent/80 relative">
            {displayImages.length > 0 ? (
              <img 
                src={displayImages[0]} 
                alt={`Partridge Linen - ${heading}`} 
                className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
                loading="lazy"
                width={600}
                height={450}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/20 aspect-[4/3] lg:aspect-auto">
                <span className="text-white/40 font-body text-sm uppercase tracking-wide">Add Image Here</span>
              </div>
            )}
          </div>

          {/* Content - takes 2 columns */}
          <div className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-center">
            <h2 className="font-display text-2xl sm:text-3xl font-light text-white mb-6 uppercase tracking-wide">
              {heading}
            </h2>
            
            {subheading && (
              <p className="text-white/70 font-body leading-relaxed mb-8">
                {subheading}
              </p>
            )}

            {/* Vertical Feature List */}
            <div className="space-y-6">
              {displayFeatures.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  {feature.icon && (
                    <feature.icon className="w-5 h-5 text-white/80 mt-1 flex-shrink-0" />
                  )}
                  <div>
                    <h3 className="font-display text-lg font-light text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-white/70 font-body text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-accent rounded-lg overflow-hidden mb-12">
      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image Section */}
        <div className="lg:min-h-[500px] bg-accent/80 relative">
          {displayImages.length > 0 ? (
            <div className="grid grid-cols-1 h-full">
              {displayImages.length === 1 ? (
                <img 
                  src={displayImages[0]} 
                  alt={`Partridge Linen - ${heading}`} 
                  className="w-full h-full object-cover aspect-[4/3] lg:aspect-auto"
                  loading="lazy"
                  width={600}
                  height={450}
                />
              ) : displayImages.length === 2 ? (
                <div className="grid grid-cols-2 h-full">
                    {displayImages.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={`Partridge Linen ${heading} - image ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={300}
                      height={450}
                    />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 grid-rows-2 h-full">
                  <img 
                    src={displayImages[0]} 
                    alt={`Partridge Linen ${heading} - featured image`} 
                    className="w-full h-full object-cover row-span-2"
                    loading="lazy"
                    width={300}
                    height={500}
                  />
                  <img 
                    src={displayImages[1]} 
                    alt={`Partridge Linen ${heading} - detail image 1`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={300}
                    height={250}
                  />
                  <img 
                    src={displayImages[2]} 
                    alt={`Partridge Linen ${heading} - detail image 2`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={300}
                    height={250}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/20 aspect-[4/3] lg:aspect-auto">
              <span className="text-white/40 font-body text-sm uppercase tracking-wide">Add Image Here</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 uppercase tracking-wide">
            {heading}
          </h2>
          
          {subheading && (
            <p className="text-white/70 font-body leading-relaxed mb-10">
              {subheading}
            </p>
          )}

          {/* 2x2 Feature Grid */}
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
            {displayFeatures.map((feature, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-2">
                  {feature.icon && (
                    <feature.icon className="w-5 h-5 text-white/80" />
                  )}
                  <h3 className="font-display text-lg md:text-xl font-light text-white">
                    {feature.title}
                  </h3>
                </div>
                <div className="w-full h-px bg-white/30 mb-4" />
                <p className="text-white/70 font-body text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;