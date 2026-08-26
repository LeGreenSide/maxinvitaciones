import { useRef, useState, useEffect } from 'react';
import invitations from '../data/invitations.json';
import InvitationSection from './InvitationSection.jsx';

const ITEMS_PER_VIEW = 4;

const InvitationCarousel = () => {
  const scrollRef = useRef(null);
  const [activePage, setActivePage] = useState(0);
  const totalPages = Math.ceil(invitations.length / ITEMS_PER_VIEW);

  const scrollToPage = (page) => {
    const container = scrollRef.current;
    if (!container) return;
    const clamped = Math.max(0, Math.min(page, totalPages - 1));
    const pageWidth = container.clientWidth;
    container.scrollTo({ left: clamped * pageWidth, behavior: 'smooth' });
    setActivePage(clamped);
  };

  const handlePrev = () => scrollToPage(activePage - 1);
  const handleNext = () => scrollToPage(activePage + 1);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const page = Math.round(container.scrollLeft / container.clientWidth);
        setActivePage(page);
      }, 100);
    };

    container.addEventListener('scroll', handleScroll);
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div class="max-w-7xl mx-auto px-4 pt-12">
      <div class="flex items-center gap-3">
        <button
          onClick={handlePrev}
          disabled={activePage === 0}
          class="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 items-center justify-center disabled:opacity-30 hover:bg-gray-100 transition-colors"
          aria-label="Anterior"
        >
          <span class="text-xl">‹</span>
        </button>

        <div
          ref={scrollRef}
          class="flex-1 flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none' }}
        >
          {invitations.map((inv) => (
            <div
              key={inv.id}
              class="snap-start flex-shrink-0 w-[45%] sm:w-[31%] lg:w-[calc(25%-12px)]"
            >
              <InvitationSection data={inv} />
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={activePage === totalPages - 1}
          class="hidden sm:flex flex-shrink-0 w-10 h-10 rounded-full border border-gray-300 items-center justify-center disabled:opacity-30 hover:bg-gray-100 transition-colors"
          aria-label="Siguiente"
        >
          <span class="text-xl">›</span>
        </button>
      </div>

      <div class="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToPage(i)}
            class={`w-2 h-2 rounded-full transition-colors ${
              i === activePage ? 'bg-gray-800' : 'bg-gray-300'
            }`}
            aria-label={`Ir a página ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default InvitationCarousel;