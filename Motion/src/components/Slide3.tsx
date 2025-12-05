// Motion/src/components/Slide3.tsx
// Slide 3: Your Year at a Glance - Using motion.dev
import React, { useEffect, useState, useRef } from 'react';
import { animate } from 'motion';
import { translations, getLanguageFromURL } from '../i18n';
import masterData from '../../../Baseapp/src/data/dataSource';

const AnimatedNumber: React.FC<{ 
  value: number; 
  duration?: number;
  suffix?: string;
}> = ({ value, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controls = animate(
      0,
      value,
      {
        duration,
        onUpdate: (latest) => setCount(latest),
      }
    );
    return () => controls.stop();
  }, [value, duration]);

  return <span>{Math.floor(count)}{suffix}</span>;
};

const Slide3: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const currentLanguage = getLanguageFromURL();
  const t = translations[currentLanguage].slides.slide3;

  const slideData = masterData.slides.find(s => s.slideNumber === 3);
  const numberOfHoldings = slideData?.data.numberOfHoldings || 0;
  const diversificationScore = slideData?.data.diversificationScore || 0;
  const message = slideData?.data.message || t.message;

  useEffect(() => {
    if (titleRef.current) {
      animate(titleRef.current, { opacity: 1, rotateX: 0 }, { duration: 0.8 });
    }

    if (contentRef.current) {
      animate(contentRef.current, { opacity: 1 }, { duration: 1, delay: 0.3 });
      
      const highlightStat = contentRef.current.querySelector('.highlight-stat');
      if (highlightStat) {
        animate(
          highlightStat as HTMLElement,
          { scale: 1, rotate: 0 },
          { duration: 1, delay: 0.6 }
        );
      }
    }
  }, []);

  return (
    <div className="slide">
      <h1 
        ref={titleRef} 
        className="slide-title" 
        style={{ opacity: 0, transform: 'rotateX(-90deg)' }}
      >
        {slideData?.title || t.title}
      </h1>

      <div ref={contentRef} className="summary-content" style={{ opacity: 0 }}>
        <p className="summary-text">
          Du har byggt en portfölj med <strong>{numberOfHoldings} aktier</strong>, 
          vilket visar ditt engagemang för din ekonomiska framtid. Din diversifieringsstrategi 
          demonstrerar genomtänkta investeringar.
        </p>

        <div 
          className="highlight-stat" 
          style={{ transform: 'scale(0) rotate(-180deg)' }}
        >
          <AnimatedNumber value={diversificationScore} suffix="%" />
        </div>
        <p className="stat-label" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>
          Diversifieringspoäng
        </p>

        <p className="summary-text" style={{ marginTop: '3rem' }}>
          {message}
        </p>
      </div>
    </div>
  );
};

export default Slide3;
