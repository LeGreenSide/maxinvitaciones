import { useCallback, useEffect, useRef, useState } from 'react';

const SLOTS =['izquierda', 'frente', 'derecha'];

const ESTILOS = {
  izquierda: {
    transform: 'translateX(-50%) scale(0.78) rotate(-7deg)',
    zIndex: 10,
    opacity: 0.92,
  },
  frente: {
    transform: 'translateX(0) scale(1) rotate(0deg)',
    zIndex: 30,
    opacity: 1,
  },
  derecha: {
    transform: 'translateX(50%) scale(0.78) rotate(7deg)',
    zIndex: 20,
    opacity: 0.92,
  },
};

const INTERVALO = 10000;
const GIRO = 1200;

const HeroCarousel = ({ items }) => {
  const [paso, setPaso] = useState(0);
  const [pausado, setPausado] = useState(false);
  const videoRefs = useRef([]);

  const avanzar = useCallback(() => setPaso((p) => p + 1), []);

  const traerAlFrente = useCallback((i) => {
    setPaso(
      (p) =>
        p + ((1 - ((i + p) % SLOTS.length) + SLOTS.length) % SLOTS.length)
    );
  }, []);

  useEffect(() => {
    if (pausado) return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (query.matches) return;

    const timer = setInterval(avanzar, INTERVALO);
    return () => clearInterval(timer);
  }, [avanzar, pausado]);

  useEffect(() => {
    items.forEach((_, i) => {
      const video = videoRefs.current[i];
      if (!video) return;

      const slot = SLOTS[(i + paso) % SLOTS.length];
      video.muted = true;

      if (slot === 'frente') {
        const intento = video.play();
        if (intento?.catch) intento.catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [paso, items]);

  return (
    <div
      className="relative h-[280px] select-none sm:h-[440px] lg:h-[520px]"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onFocus={() => setPausado(true)}
      onBlur={() => setPausado(false)}
    >
      {items.map((item, i) => {
        const slot = SLOTS[(i + paso) % SLOTS.length];
        const alFrente = slot === 'frente';
        const estilo = ESTILOS[slot];

        const irAlFrente = (e) => {
          if (alFrente) return;
          e.preventDefault();
          traerAlFrente(i);
        };

        return (
          <a
            key={item.id}
            href={`#inv-${item.id}`}
            onClick={irAlFrente}
            aria-label={
              alFrente
                ? `Ver ${item.title} en el catálogo`
                : `Ver ${item.title} de cerca`
            }
            className="absolute left-1/2 top-1/2 aspect-9/16 h-[92%] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ zIndex: estilo.zIndex }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-[26px] shadow-[0_22px_50px_rgba(26,21,51,0.28)] transition-[transform,opacity] ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: estilo.transform,
                opacity: estilo.opacity,
                backgroundColor: item.bgColor || '#1a1533',
                transitionDuration: `${GIRO}ms`,
              }}
            >
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                src={item.video}
                poster={item.poster}
                width="360"
                height="640"
                loop
                muted
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <img
                src={item.poster}
                alt=""
                width="720"
                height="1280"
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                  alFrente ? 'opacity-0' : 'opacity-100'
                }`}
              />

              <div
                className={`absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-4 pb-4 pt-8 text-left transition-opacity duration-500 ${
                  alFrente ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <p className="text-sm font-semibold text-papel">{item.title}</p>
              </div>
            </div>
          </a>
        );
      })}

      <div className="absolute inset-x-0 -bottom-2 z-40 flex justify-center gap-1.5">
        {items.map((item, i) => (
          <span
            key={item.id}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              SLOTS[(i + paso) % SLOTS.length] === 'frente'
                ? 'w-6 bg-tinta/70'
                : 'w-1.5 bg-tinta/25'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
