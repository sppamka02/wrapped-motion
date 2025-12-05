// Motion/src/components/Slide1.tsx
// Slide 1: Top Holdings - Using motion.dev
import React, { useEffect, useRef } from 'react';
import { animate } from 'motion';
import { translations, getLanguageFromURL } from '../i18n';
import masterData from '../../../Baseapp/src/data/master.json';

const Slide1: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const currentLanguage = getLanguageFromURL();
  const t = translations[currentLanguage].slides.slide1;

  const slideData = masterData.slides.find(s => s.slideNumber === 1);
  const topHoldings = slideData?.data.holdings || [];

  useEffect(() => {
    console.log('Slide1 mounted, holdings count:', topHoldings.length);
    console.log('Top holdings:', topHoldings);
    
    if (titleRef.current) {
      animate(titleRef.current, { opacity: 1, y: 0 }, { duration: 0.8 });
    }

    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.holding-item');
      console.log('Found holding items:', items.length);
      items.forEach((item, i) => {
        animate(
          item as HTMLElement,
          { opacity: 1, x: 0 },
          { duration: 0.6, delay: 0.3 + i * 0.1 }
        );
      });
    }
  }, []); // Run once on mount

  return (
    <div className="slide">
      <h1 
        ref={titleRef} 
        className="slide-title" 
        style={{ opacity: 0, transform: 'translateY(-50px)' }}
      >
        {slideData?.title || t.title}
      </h1>

      <p className="slide-subtitle" style={{ marginBottom: '2rem' }}>
        {slideData?.subtitle || t.subtitle}
      </p>

      <ul ref={listRef} className="holdings-list">
        {topHoldings.map((holding, index) => (
          <li
            key={holding.name}
            className="holding-item"
            style={{ opacity: 0, transform: 'translateX(-50px)' }}
          >
            <div className="holding-rank">#{index + 1}</div>
            <div className="holding-info">
              <div className="holding-name">{holding.name}</div>
              <div className="holding-details">
                <span className="holding-percent">{holding.percentOfPortfolio.toFixed(1)}%</span>
                <span className="holding-amount">
                  {holding.amountInvestedSek.toLocaleString('sv-SE')} kr
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Slide1;
