import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HERO_SLIDES } from '../lib/homepage';

type Slide = (typeof HERO_SLIDES)[number];

interface Props {
  slides?: Slide[];
}

export const HeroCarousel: React.FC<Props> = ({ slides = HERO_SLIDES }) => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slides.length, paused]);

  if (!slides.length) return null;

  const go = (next: number) => {
    const count = slides.length;
    setIndex((next + count) % count);
  };

  return (
    <section
      className="relative bg-[#1C140C] overflow-hidden"
      aria-label="Featured fragrances"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative h-[320px] sm:h-[460px] lg:h-[560px]">
        {slides.map((slide, slideIndex) => (
          <a
            key={slide.src}
            href={slide.href}
            className={`absolute inset-0 block transition-opacity duration-700 ${
              slideIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={slideIndex !== index}
            tabIndex={slideIndex === index ? 0 : -1}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C140C]/80 via-[#1C140C]/15 to-[#1C140C]/10" />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:pb-12 text-center text-white">
              <p className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
                {slide.kicker}
              </p>
              <p className="font-['Cormorant_Garamond',serif] text-[34px] sm:text-[52px] font-medium leading-none mt-1 tracking-[0.04em]">
                {slide.title}
              </p>
            </div>
          </a>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#1C140C] hover:bg-white flex items-center justify-center cursor-pointer"
            aria-label="Previous hero image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-[#1C140C] hover:bg-white flex items-center justify-center cursor-pointer"
            aria-label="Next hero image"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => go(slideIndex)}
                className={`h-2 rounded-full cursor-pointer transition-all ${
                  slideIndex === index ? 'w-6 bg-white' : 'w-2 bg-white/55'
                }`}
                aria-label={`Show ${slide.title}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};
