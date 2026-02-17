import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useInterval } from '@/hooks/use-interval';

export default function HeroSection() {
  // Simpler, positional carousel
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
    skipSnaps: false,
    dragFree: false,
  });

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const AUTOPLAY_MS = 6000;

  // ✅ India-context, HD images (Unsplash). Replace any if you prefer.
  const slides = [
    {
      title:
        "<span class='bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700'>Transform</span> Students into <span class='bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-600'>Independent Consultants</span>",
      description:
        'Ottobon Academy empowers students and freshers with job-ready skills in Salesforce, Oracle, Cloud Computing, and Full Stack Development through AI-enhanced learning paths.',
      image:
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1920&auto=format&fit=crop',
      alt: 'Indian students collaborating in a modern campus workspace',
    },
    {
      title:
        "AI-First <span class='bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600'>Learning</span> for the <span class='bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600'>Future</span>",
      description:
        'Learn from AI to become faster, smarter, and more effective. Our curriculum blends education with real consulting experience, preparing you for an AI-powered world.',
      image:
        'https://images.unsplash.com/photo-1587614382346-4ec71c37a2ab?q=80&w=1920&auto=format&fit=crop',
      alt: 'Indian professionals discussing AI solutions on laptops',
    },
    {
      title:
        "Your <span class='bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-pink-500'>Consulting</span> Career Starts Here",
      description:
        'Take our Talent Compass Assessment to discover your ideal learning path in high-demand technologies and qualify for up to 90% tuition reduction based on your unique profile.',
      image:
        'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1920&auto=format&fit=crop',
      alt: 'Young Indian consultant reviewing career opportunities',
    },
  ];

  const onSelect = useCallback(() => {
    if (!embla) return;
    setActive(embla.selectedScrollSnap());
  }, [embla]);

  const scrollTo = useCallback(
    (i: number) => embla && embla.scrollTo(i),
    [embla]
  );
  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  // Autoplay (pauses on hover)
  useInterval(() => !paused && embla?.scrollNext(), paused ? null : AUTOPLAY_MS);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
    return () => embla?.off('select', onSelect);
  }, [embla, onSelect]);

  return (
    <section className="relative bg-white pt-24 md:pt-28 pb-14 md:pb-16">
      <div className="container mx-auto px-4">
        {/* Carousel */}
        <div
          className="embla overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white"
          ref={viewportRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="embla__container flex">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className="embla__slide flex-[0_0_100%] min-w-0"
                aria-roledescription="slide"
                aria-label={`Slide ${idx + 1} of ${slides.length}`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10 p-6 md:p-10">
                  {/* Text */}
                  <div className="md:w-1/2">
                    <h1
                      className="text-3xl md:text-5xl font-bold leading-tight mb-4"
                      dangerouslySetInnerHTML={{ __html: slide.title }}
                    />
                    <p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 max-w-xl">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <a
                        href="#enroll"
                        className="inline-flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 transition"
                      >
                        Start Your Journey
                        <svg
                          className="ml-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </a>
                      <a
                        href="#assessment"
                        className="inline-flex items-center justify-center rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 transition"
                      >
                        Take Assessment
                      </a>
                    </div>
                    <div className="mt-4 text-sm rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800">
                      <p className="font-medium flex items-center">
                        <svg
                          className="mr-2 h-5 w-5 text-emerald-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Qualify for up to 90% tuition discount through our assessment
                      </p>
                    </div>
                  </div>

                  {/* Image */}
                  <div className="md:w-1/2 w-full">
                    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="h-64 sm:h-72 md:h-[26rem] w-full object-cover"
                        loading="eager"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                        <p className="text-white text-sm">{slide.alt}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm"
          >
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next slide"
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-sm"
          >
            <svg
              className="h-5 w-5 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center gap-2 rounded-full bg-white border border-gray-200 px-3 py-2 shadow-sm">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === active ? 'w-6 bg-blue-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
