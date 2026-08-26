import WhatsAppButton from './WhatsAppButton';
import { useRef, useState, useEffect } from 'react';

const InvitationSection = ({ data }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const stopVideo = () => {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
        setIsPlaying(false);
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
            if (e.detail.id !== data.id) {
                stopVideo();
            }
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

    return (
        <div
            ref={containerRef}
            class="w-full max-w-55 mx-auto rounded-2xl overflow-hidden relative"
        >
            <video
                ref={videoRef}
                src={data.video}
                poster={data.poster}
                loop
                playsInline
                preload="metadata"
                class="w-full h-auto block aspect-9/16"
            />

            <button
                onClick={isPlaying ? handlePauseClick : handlePlayClick}
                class="absolute top-3 left-3 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center transition-colors"
                aria-label={isPlaying ? 'Pausar invitación' : 'Reproducir invitación'}
            >
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4" fill="white">
                        <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 ml-0.5" fill="white">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </button>

            {!isPlaying && (
                <div class="absolute inset-x-0 bottom-0 p-4 bg-linear-to-t from-black/90 via-black/50 to-transparent">
                    <h2 class="text-white text-base font-bold mb-1.5">{data.title}</h2>
                    <p class="text-white/75 text-xs leading-snug mb-3 line-clamp-2">{data.description}</p>
                    <WhatsAppButton invitationTitle={data.title} fullWidth />
                </div>
            )}
        </div>
    );
};

export default InvitationSection;