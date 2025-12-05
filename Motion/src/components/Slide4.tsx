// Motion/src/components/Slide4.tsx
// Slide 4: Your Future Awaits - Inspirational closing slide
import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';
import { translations, getLanguageFromURL } from '../i18n';
import masterData from '../../../Baseapp/src/data/master.json';

const Slide4: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const [showImage, setShowImage] = useState(false);
  const currentLanguage = getLanguageFromURL();
  const t = translations[currentLanguage].slides.slide4;

  const slideData = masterData.slides.find(s => s.slideNumber === 4);
  const emojis = slideData?.data.emojis || ['🎯', '💰', '📈', '🚀', '✨', '🌟', '💎', '🏆'];

  useEffect(() => {
    // First show emojis
    if (emojiRef.current) {
      const emojiElements = emojiRef.current.querySelectorAll('.emoji');
      emojiElements.forEach((emoji, i) => {
        animate(
          emoji as HTMLElement,
          { opacity: 1, scale: 1, rotate: 360 },
          { duration: 0.6, delay: i * 0.1 }
        );
      });
    }

    // Then reveal image after emojis
    const timer = setTimeout(() => {
      setShowImage(true);
      if (emojiRef.current) {
        animate(emojiRef.current, { opacity: 0 }, { duration: 0.5 });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showImage) {
      if (imageRef.current) {
        animate(
          imageRef.current,
          { opacity: 1, scale: 1 },
          { duration: 1 }
        );
      }

      if (textRef.current) {
        animate(
          textRef.current,
          { opacity: 1, y: 0 },
          { duration: 0.8, delay: 0.5 }
        );
      }
    }
  }, [showImage]);

  return (
    <div className="slide slide-future" ref={containerRef}>
      {/* Emoji animation */}
      {!showImage && (
        <div ref={emojiRef} className="emoji-container">
          {emojis.map((emoji, i) => (
            <span
              key={i}
              className="emoji"
              style={{ 
                opacity: 0, 
                transform: 'scale(0)',
                animationDelay: `${i * 0.1}s` 
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}

      {/* Image */}
      {showImage && (
        <div 
          ref={imageRef}
          className="future-image-wrapper"
          style={{ opacity: 0, transform: 'scale(0.8)' }}
        >
          <img 
            src="/src/data/generate-image.png"
            alt="Your future journey"
            className="future-image"
            onError={(e) => {
              console.error('Image failed to load');
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Text content */}
      {showImage && (
        <div 
          ref={textRef}
          className="future-content"
          style={{ opacity: 0, transform: 'translateY(30px)' }}
        >
          <h1 className="slide-title future-title">{slideData?.title || t.title}</h1>
          <p className="future-message">{slideData?.data.message || t.message}</p>
          <p className="future-subtitle">{slideData?.data.subtitle || t.subtitle}</p>
        </div>
      )}
    </div>
  );
};

export default Slide4;
