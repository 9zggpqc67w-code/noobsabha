import React, { useState, useEffect } from 'react';
import { germanyBackgroundImages, GermanyBackgroundImage } from '../data/germanyBackgrounds';
import { useTheme } from '../theme/ThemeContext';

interface GermanyBackgroundProps {
  intervalMs?: number; // default 6000ms (6 seconds)
}

export const GermanyBackground: React.FC<GermanyBackgroundProps> = ({
  intervalMs = 6000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images] = useState<GermanyBackgroundImage[]>(germanyBackgroundImages);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const currentImage = images[currentIndex];
  const isLight = resolvedTheme === 'light';

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
    >
      {/* Fallback architectural gradient background */}
      <div className={`absolute inset-0 transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-[#050505]'}`} />

      {/* Rotating Background Images */}
      {images.map((img, idx) => {
        const isActive = idx === currentIndex;
        const isFailed = failedImages[img.id];

        if (isFailed) return null;

        return (
          <div
            key={img.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={img.url}
              alt={img.alt}
              onError={() => handleImageError(img.id)}
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-linear"
            />
          </div>
        );
      })}

      {/* Theme-Adaptive Gradient Overlays for optimal readability & image presence */}
      {isLight ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/70" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/95 via-[#050505]/65 to-[#050505]/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60" />
        </>
      )}

      {/* Landmark Indicator in Bottom Left */}
      {currentImage && !failedImages[currentImage.id] && (
        <div
          className={`absolute bottom-5 left-6 z-10 hidden md:flex items-center gap-2.5 text-[11px] font-mono font-medium tracking-wide px-3.5 py-1.5 rounded-full backdrop-blur-md border shadow-xl ${
            isLight
              ? 'bg-white/90 text-neutral-800 border-neutral-200'
              : 'bg-[#151515]/90 text-[#E8E8E8] border-[#262626]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#FFD21C] animate-pulse shadow-[0_0_8px_#FFD21C]" />
          <span className={`font-bold ${isLight ? 'text-black' : 'text-white'}`}>{currentImage.title}</span>
          <span className="opacity-30">/</span>
          <span className={isLight ? 'text-neutral-600' : 'text-neutral-400'}>{currentImage.location}</span>
        </div>
      )}
    </div>
  );
};
