import React, { useRef, useEffect, useState } from "react";

interface CinematicOverlayProps {
    videoSrc: string;
    isVisible: boolean;
    onComplete?: () => void;
}

/**
 * CinematicOverlay - Global component for app intros, outros, and transitions.
 * 
 * Features:
 * - Full-screen video with transparent black background (mix-blend-mode: screen)
 * - Non-blocking interaction (pointer-events: none)
 * - Auto-play on visibility with smooth fade-out transition
 */
const CinematicOverlay: React.FC<CinematicOverlayProps> = ({
    videoSrc,
    isVisible,
    onComplete,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [opacity, setOpacity] = useState(0);

    // Handle visibility changes - auto-play and fade transitions
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isVisible) {
            // Fade in and play
            setOpacity(1);
            video.currentTime = 0;
            video.play().catch((err) => {
                console.warn("[CinematicOverlay] Autoplay blocked:", err);
            });
        } else {
            // Fade out
            setOpacity(0);
        }
    }, [isVisible]);

    // Handle video end event
    const handleVideoEnded = () => {
        setOpacity(0);
        onComplete?.();
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                pointerEvents: "none",
                opacity: opacity,
                transition: "opacity 0.5s ease-out",
            }}
        >
            <video
                ref={videoRef}
                src={videoSrc}
                muted
                playsInline
                onEnded={handleVideoEnded}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    mixBlendMode: "screen", // Critical: Makes black background transparent
                }}
            />
        </div>
    );
};

export default CinematicOverlay;
