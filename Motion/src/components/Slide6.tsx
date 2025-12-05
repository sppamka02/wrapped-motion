// Motion/src/components/Slide6.tsx
// Slide 6: Closing/Thank You slide with animated emojis
import React, { useEffect, useRef } from 'react';
import { animate } from 'motion';
import { translations, getLanguageFromURL } from '../i18n';
import masterData from '../../../Baseapp/src/data/dataSource';

const Slide6: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const emojisRef = useRef<HTMLDivElement>(null);
  const currentLanguage = getLanguageFromURL();
  const t = translations[currentLanguage].slides.slide6;

  const slideData = masterData.slides.find(s => s.slideNumber === 6) || masterData.slides.find(s => s.slideNumber === 4);
  const { message = '', subtitle = '', emojis = [] } = slideData?.data || {};

  useEffect(() => {
    if (titleRef.current) {
      animate(titleRef.current, { opacity: 1, y: 0 }, { duration: 0.8 });
    }

    if (messageRef.current) {
      animate(messageRef.current, { opacity: 1, scale: 1 }, { duration: 0.8, delay: 0.3 });
    }

    if (subtitleRef.current) {
      animate(subtitleRef.current, { opacity: 1, y: 0 }, { duration: 0.8, delay: 0.6 });
    }

    // Animate emojis one by one
    if (emojisRef.current) {
      const emojiElements = emojisRef.current.children;
      Array.from(emojiElements).forEach((emoji, index) => {
        animate(
          emoji as HTMLElement,
          { opacity: [0, 1], scale: [0, 1], rotate: [0, 360] },
          { 
            duration: 0.6, 
            delay: 0.9 + index * 0.1,
            easing: [0.34, 1.56, 0.64, 1] // Bounce effect
          }
        );
      });
    }
  }, []);

  return (
    <div className="slide" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1 
        ref={titleRef} 
        className="slide-title" 
        style={{ 
          opacity: 0, 
          transform: 'translateY(-50px)',
          marginBottom: '2rem'
        }}
      >
        {slideData?.title || t.title}
      </h1>

      <p 
        ref={messageRef}
        className="slide-message" 
        style={{ 
          opacity: 0, 
          transform: 'scale(0.9)',
          fontSize: '2rem',
          fontWeight: 600,
          color: 'var(--wrapped-text-primary)',
          marginBottom: '1.5rem',
          maxWidth: '800px'
        }}
      >
        {message}
      </p>

      <p 
        ref={subtitleRef}
        className="slide-subtitle" 
        style={{ 
          opacity: 0, 
          transform: 'translateY(20px)',
          fontSize: '1.3rem',
          color: 'var(--wrapped-text-secondary)',
          marginBottom: '3rem',
          maxWidth: '700px'
        }}
      >
        {subtitle}
      </p>

      <div 
        ref={emojisRef}
        className="emoji-container"
        style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {emojis.map((emoji: string, index: number) => (
          <span
            key={index}
            style={{
              fontSize: '4rem',
              opacity: 0,
              transform: 'scale(0)',
              display: 'inline-block'
            }}
          >
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Slide6;
