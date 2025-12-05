// Motion/src/components/Slide8.tsx
// Slide 8: Goodbye slide with countdown and redirect
import React, { useEffect, useRef, useState } from 'react';
import { animate } from 'motion';
import { translations, getLanguageFromURL } from '../i18n';
import masterData from '../../../Baseapp/src/data/dataSource';

const Slide8: React.FC = () => {
  const waveRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const currentLanguage = getLanguageFromURL();
  const t = translations[currentLanguage].slides.slide8;

  const slideData = masterData.slides.find(s => s.slideNumber === 8);

  useEffect(() => {
    // Animate wave emoji
    if (waveRef.current) {
      animate(
        waveRef.current,
        { opacity: [0, 1], scale: [0.5, 1] } as any,
        { duration: 0.8 } as any
      );

      // Continuous waving animation
      animate(
        waveRef.current,
        { rotate: [-10, 10, -10] } as any,
        { 
          duration: 1.5,
          repeat: Infinity
        } as any
      );
    }

    if (titleRef.current) {
      animate(titleRef.current, { opacity: 1, y: 0 }, { duration: 0.8, delay: 0.2 });
    }

    if (subtitleRef.current) {
      animate(subtitleRef.current, { opacity: 1, y: 0 }, { duration: 0.8, delay: 0.4 });
    }

    if (sparklesRef.current) {
      animate(sparklesRef.current, { opacity: 1 } as any, { duration: 1, delay: 0.6 });
      
      // Sparkle animation
      animate(
        sparklesRef.current,
        { opacity: [1, 0.6, 1], scale: [1, 1.2, 1] } as any,
        { 
          duration: 2,
          repeat: Infinity
        } as any
      );
    }
  }, []);

  return (
    <div className="slide" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      height: '100%',
      background: 'linear-gradient(135deg, var(--wrapped-background) 0%, var(--wrapped-surface) 100%)'
    }}>
      <div ref={waveRef} style={{
        fontSize: '8rem',
        marginBottom: '1rem',
        opacity: 0,
        display: 'inline-block'
      }}>
        👋
      </div>

      <h1 ref={titleRef} className="slide-title" style={{ 
        opacity: 0, 
        transform: 'translateY(20px)',
        marginBottom: '1rem'
      }}>
        {slideData?.title || t.title}
      </h1>
      
      <p ref={subtitleRef} className="slide-subtitle" style={{ 
        opacity: 0, 
        transform: 'translateY(20px)',
        marginBottom: '3rem'
      }}>
        {slideData?.subtitle || t.subtitle}
      </p>

      <div ref={sparklesRef} style={{
        fontSize: '3rem',
        marginTop: '2rem',
        opacity: 0
      }}>
        ✨ ⭐ ✨
      </div>
    </div>
  );
};

export default Slide8;
