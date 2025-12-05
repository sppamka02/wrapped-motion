// Motion/src/components/Slide2.tsx
// Slide 2: Your Portfolio in Numbers - Using motion.dev
import React, { useEffect, useState, useRef } from 'react';
import { animate } from 'motion';
import { translations, getLanguageFromURL } from '../i18n';
import masterData from '../../../Baseapp/src/data/dataSource';

const AnimatedNumber: React.FC<{ 
  value: number; 
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}> = ({ value, duration = 2, prefix = '', suffix = '', decimals = 0 }) => {
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

  return (
    <span>
      {prefix}
      {count.toLocaleString('sv-SE', { 
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals 
      })}
      {suffix}
    </span>
  );
};

const Slide2: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const currentLanguage = getLanguageFromURL();
  const t = translations[currentLanguage].slides.slide2;

  const slideData = masterData.slides.find(s => s.slideNumber === 2);
  const totalInvested = slideData?.data.totalInvested || 0;
  const numberOfHoldings = slideData?.data.numberOfHoldings || 0;
  const averagePosition = slideData?.data.averagePosition || 0;

  const stats = [
    { value: totalInvested, label: t.totalInvested, prefix: '', suffix: '', decimals: 0 },
    { value: numberOfHoldings, label: t.numberOfHoldings, prefix: '', suffix: '', decimals: 0 },
    { value: averagePosition, label: 'Genomsnittlig Position', prefix: '', suffix: ' kr', decimals: 0 },
  ];

  useEffect(() => {
    if (titleRef.current) {
      animate(titleRef.current, { opacity: 1, scale: 1 }, { duration: 0.8 });
    }

    if (gridRef.current) {
      const boxes = gridRef.current.querySelectorAll('.stat-box');
      boxes.forEach((box, i) => {
        animate(
          box as HTMLElement,
          { opacity: 1, y: 0 },
          { duration: 0.6, delay: i * 0.15 }
        );
      });
    }
  }, []);

  return (
    <div className="slide">
      <h1 
        ref={titleRef} 
        className="slide-title" 
        style={{ opacity: 0, transform: 'scale(0.8)' }}
      >
        {slideData?.title || t.title}
      </h1>

      <div ref={gridRef} className="stats-grid">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stat-box"
            style={{ opacity: 0, transform: 'translateY(50px)' }}
          >
            <div className="stat-value">
              <AnimatedNumber 
                value={stat.value} 
                prefix={stat.prefix}
                suffix={stat.suffix}
                decimals={stat.decimals}
              />
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide2;
