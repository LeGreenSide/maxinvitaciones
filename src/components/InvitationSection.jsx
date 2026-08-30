import WhatsAppButton from './WhatsAppButton';
import { precioDe } from '../data/pricing.js';
import { useRef, useState, useEffect } from 'react';

const CAPAS_BLUR = [
    { blur: 2, mascara: 'linear-gradient(to top, #000 0%, #000 40%, transparent 72%)' },
    { blur: 7, mascara: 'linear-gradient(to top, #000 0%, #000 20%, transparent 48%)' },
    { blur: 16, mascara: 'linear-gradient(to top, #000 0%, #000 6%, transparent 26%)' },
];

const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return null;
    const total = Math.round(seconds);
    const m = Math.floor(total / 60);
    const s = total % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
};

const InvitationSection = ({ data }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [destello, setDestello] = useState(0);
    const destacada = destello > 0;
    const [duration, setDuration] = useState(null);

    const stopVideo = () => {
        setIsPlaying(false);
        const video = videoRef.current;
        if (!video) return;
        video.pause();
        video.load();
    };

    const handlePlayClick = (e) => {
        e.stopPropagation();
        document.dispatchEvent(
            new CustomEvent('invitation-play', { detail: { id: data.id } })
        );
        videoRef.current?.play();
        setIsPlaying(true);
    };

    const handlePauseClick = (e) => {
        e.stopPropagation();
        stopVideo();
    };

    useEffect(() => {
        const handleOtherPlay = (e) => {
            if (e.detail.id === data.id) return;

            const video = videoRef.current;
            if (!video || video.paused) {
                setIsPlaying(false);
                return;
            }
            stopVideo();
        };

        document.addEventListener('invitation-play', handleOtherPlay);
        return () => document.removeEventListener('invitation-play', handleOtherPlay);
    }, [data.id]);

    useEffect(() => {
        if (!isPlaying) return;

        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                stopVideo();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleClickOutside);
        };
    }, [isPlaying]);

    useEffect(() => {
        const miHash = `#inv-${data.id}`;
        let temporizador;

        const encender = () => {
            clearTimeout(temporizador);
            temporizador = setTimeout(() => setDestello((n) => n + 1), 380);
        };

        const porHash = () => {
            if (window.location.hash === miHash) encender();
        };

        const porClic = (e) => {
            const enlace = e.target.closest?.(`a[href="${miHash}"]`);
            if (enlace) encender();
        };

        porHash();
        window.addEventListener('hashchange', porHash);
        document.addEventListener('click', porClic);

        return () => {
            clearTimeout(temporizador);
            window.removeEventListener('hashchange', porHash);
            document.removeEventListener('click', porClic);
        };
    }, [data.id]);

    useEffect(() => {
        if (!destello) return;

        const tarjeta = containerRef.current;
        if (tarjeta) {
            tarjeta.style.animation = 'none';
            void tarjeta.offsetWidth;
            tarjeta.style.animation = '';
        }

        const t = setTimeout(() => setDestello(0), 2500);
        return () => clearTimeout(t);
    }, [destello]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const readDuration = () => {
            if (Number.isFinite(video.duration)) setDuration(video.duration);
        };

        readDuration();
        video.addEventListener('loadedmetadata', readDuration);
        return () => video.removeEventListener('loadedmetadata', readDuration);
    }, [data.video]);

    const totalLabel = formatTime(duration) ?? data.duration ?? null;
    const precio = precioDe(data.tipo);

    return (
        <div
            ref={containerRef}
            id={`inv-${data.id}`}
            className={`tarjeta-inv @container relative aspect-9/16 w-full scroll-mt-8 overflow-hidden rounded-[22px] ${
                destacada ? 'destacada' : ''
            }`}
            style={{ backgroundColor: data.bgColor || '#1a1533' }}
        >
            {destacada && (
                <span key={destello} className="destacada-aro" aria-hidden="true" />
            )}

            <video
                ref={videoRef}
                src={data.video}
                poster={data.poster}
                loop
                playsInline
                preload="metadata"
                className="absolute inset-0 block h-full w-full object-cover"
            />

            <img
                src={data.poster}
                alt={`Invitación de cumpleaños ${data.title} animada`}
                width="720"
                height="1280"
                className={`pointer-events-none absolute inset-0 block h-full w-full object-cover transition-opacity duration-300 ${
                    isPlaying ? 'opacity-0' : 'opacity-100'
                }`}
            />

            <button
                onClick={isPlaying ? handlePauseClick : handlePlayClick}
                className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm transition-colors hover:bg-black/65"
                aria-label={isPlaying ? `Pausar invitación ${data.title}` : `Reproducir invitación ${data.title}`}
            >
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" fill="#faf4ea">
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="ml-0.5 h-[18px] w-[18px]" fill="#faf4ea">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </button>

            {!isPlaying && totalLabel && (
                <span className="absolute right-3 top-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-papel backdrop-blur-sm">
                    {totalLabel}
                </span>
            )}

            {!isPlaying && (
                <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[72%] rounded-b-[22px]"
                    aria-hidden="true"
                >
                    {CAPAS_BLUR.map(({ blur, mascara }) => (
                        <div
                            key={blur}
                            className="absolute inset-0 rounded-b-[22px]"
                            style={{
                                backdropFilter: `blur(${blur}px)`,
                                WebkitBackdropFilter: `blur(${blur}px)`,
                                maskImage: mascara,
                                WebkitMaskImage: mascara,
                            }}
                        />
                    ))}
                    <div className="absolute inset-0 rounded-b-[22px] bg-linear-to-t from-black/82 via-black/38 via-45% to-transparent" />
                </div>
            )}

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 px-3 pb-3 sm:px-4 sm:pb-4">
                {!isPlaying && (
                    <>
                        <h3 className="line-clamp-2 text-[15px] font-semibold leading-tight text-papel sm:text-[17px] lg:text-[19px]">
                            {data.title}
                        </h3>
                        <p className="line-clamp-2 text-[13px] leading-snug text-papel/80 sm:text-[13px] lg:text-[14px]">
                            {data.description}
                        </p>
                    </>
                )}

                <div
                    className={`mt-1.5 flex-col gap-2 @min-[12rem]:flex-row @min-[12rem]:items-center ${
                        isPlaying
                            ? 'hidden @min-[12rem]:flex @min-[12rem]:justify-end'
                            : 'flex @min-[12rem]:justify-between'
                    }`}
                >
                    {!isPlaying && precio && (
                        <span className="text-[16px] font-bold leading-none text-papel tabular-nums lg:text-[18px]">
                            {precio.precio}
                        </span>
                    )}
                    <WhatsAppButton
                        invitationTitle={data.title}
                        detalle={precio ? precio.precio : null}
                        compact
                        className="w-full justify-center @min-[12rem]:w-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default InvitationSection;
