import { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useAnimation } from '@/hooks/use-animation';

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
  background: string;
  character?: {
    name: string;
    role: string;
    quote: string;
    image: string;
  };
}

export default function IntegratedHeroJourney() {
  // Hero section states
  const [heroViewportRef, heroEmbla] = useEmblaCarousel({ 
    loop: true,
    skipSnaps: false,
    align: "center",
    containScroll: "trimSnaps" 
  });

  const [heroActiveIndex, setHeroActiveIndex] = useState(0);
  const autoplayInterval = 5000;
  const autoplayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const heroSlides = [
    {
      title: "<span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Transform</span> Your Career <span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Potential</span>",
      description: "Ottobon equips you with in-demand technology consulting skills through personalized mentorship and industry-aligned curriculum that accelerates your career path.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Technology professional in modern workspace"
    },
    {
      title: "<span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Learn</span> Today,<br /> Lead <span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Tomorrow</span>",
      description: "Our immersive programs focus on practical applications and real-world projects, guided by industry experts who have implemented enterprise technologies at scale.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Collaborative learning environment"
    },
    {
      title: "<span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Build</span> Your Enterprise Support Services <span class='bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 drop-shadow-sm'>Career</span>",
      description: "Whether you're pivoting careers or enhancing existing skills, our program bridges the gap between traditional education and industry requirements.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      alt: "Professional working on advanced technology"
    }
  ];

  // Auto scroll for the hero carousel
  const autoplayCallback = useCallback(() => {
    if (!heroEmbla || !isAutoplay) return;
    if (autoplayTimeoutRef.current) clearTimeout(autoplayTimeoutRef.current);

    autoplayTimeoutRef.current = setTimeout(() => {
      if (!heroEmbla) return;
      heroEmbla.scrollNext();
    }, autoplayInterval);
  }, [heroEmbla, isAutoplay, autoplayInterval]);

  // When the carousel scrolls, update the active index
  const onHeroSelect = useCallback(() => {
    if (!heroEmbla) return;
    setHeroActiveIndex(heroEmbla.selectedScrollSnap());
    autoplayCallback();
  }, [heroEmbla, autoplayCallback]);

  // Add scroll to specific slide functionality
  const scrollTo = useCallback((index: number) => {
    if (!heroEmbla) return;
    heroEmbla.scrollTo(index);
  }, [heroEmbla]);

  useEffect(() => {
    if (!heroEmbla) return;

    onHeroSelect();
    heroEmbla.on('select', onHeroSelect);
    autoplayCallback();

    return () => {
      heroEmbla.off('select', onHeroSelect);
      if (autoplayTimeoutRef.current) {
        clearTimeout(autoplayTimeoutRef.current);
      }
    };
  }, [heroEmbla, onHeroSelect, autoplayCallback]);

  const handleMouseEnter = () => setIsAutoplay(false);
  const handleMouseLeave = () => setIsAutoplay(true);

  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-8 overflow-hidden bg-gradient-to-r from-[#CDFFD8] to-[#94B9FF]">
      <div className="container mx-auto px-1 sm:px-3 md:px-4 relative z-10 overflow-hidden" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="mb-12 md:mb-16">
          <div className="overflow-hidden" ref={heroViewportRef}>
            <div className="flex">
              {heroSlides.map((slide, index) => (
                <div key={index} className="min-w-full flex-shrink-0 w-screen max-w-full">
                  <h1 dangerouslySetInnerHTML={{ __html: slide.title }}></h1>
                  <p>{slide.description}</p>
                  <img src={slide.image} alt={slide.alt} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <button onClick={() => heroEmbla && heroEmbla.scrollPrev()} className="bg-blue-600 text-white py-2 px-4 rounded">Prev</button>
            <button onClick={() => heroEmbla && heroEmbla.scrollNext()} className="bg-blue-600 text-white py-2 px-4 rounded">Next</button>
          </div>

          {/* Indicators for active slide */}
          <div className="flex items-center justify-center mt-8">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`w-3 h-3 rounded-full bg-gray-300 ${
                  index === heroActiveIndex ? 'bg-blue-600 w-6' : ''
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}