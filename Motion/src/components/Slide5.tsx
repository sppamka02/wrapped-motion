// Motion/src/components/Slide5.tsx
// Slide 5: Your Year Journey with animated line - Using motion.dev
import React, { useEffect, useState, useRef } from 'react';
import { animate } from 'motion';
import { translations, getLanguageFromURL } from '../i18n';
import masterData from '../../../Baseapp/src/data/dataSource';

const Slide5: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const currentLanguage = getLanguageFromURL();
  const t = translations[currentLanguage].slides.slide5;

  const slideData = masterData.slides.find(s => s.slideNumber === 5);
  const monthlyData = slideData?.data.monthlyPerformance || [];

  const width = 800;
  const height = 400;
  const padding = 100;

  // Calculate scale for smooth curve
  const maxValue = Math.max(...monthlyData.map((d: any) => d.value));
  const minValue = Math.min(...monthlyData.map((d: any) => d.value));
  const valueRange = maxValue - minValue;

  const getX = (index: number) => {
    return padding + (index / (monthlyData.length - 1)) * (width - 2 * padding);
  };

  const getY = (value: number) => {
    return height - padding - ((value - minValue) / valueRange) * (height - 2 * padding);
  };

  // Generate smooth path
  const generatePath = (progress: number) => {
    const pointsToShow = Math.ceil(monthlyData.length * progress);
    const points = monthlyData.slice(0, pointsToShow);
    
    if (points.length === 0) return '';
    
    let path = `M ${getX(0)} ${getY(points[0].value)}`;
    
    for (let i = 1; i < points.length; i++) {
      const x = getX(i);
      const y = getY(points[i].value);
      path += ` L ${x} ${y}`;
    }
    
    return path;
  };

  useEffect(() => {
    if (titleRef.current) {
      animate(titleRef.current, { opacity: 1, y: 0 }, { duration: 0.8 });
    }

    if (subtitleRef.current) {
      animate(subtitleRef.current, { opacity: 1, y: 0 }, { duration: 0.8, delay: 0.3 });
    }

    if (containerRef.current) {
      animate(containerRef.current, { opacity: 1, scale: 1 }, { duration: 0.8, delay: 0.5 });
    }

    // Animate the line drawing
    const timer = setTimeout(() => {
      animate(
        (progress: number) => setAnimationProgress(progress),
        {
          duration: 4,
          easing: [0.22, 1, 0.36, 1],
        }
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const currentIndex = Math.floor(animationProgress * (monthlyData.length - 1));
  const currentPoint = monthlyData[currentIndex];

  return (
    <div className="slide">
      <h1 
        ref={titleRef} 
        className="slide-title" 
        style={{ opacity: 0, transform: 'translateY(-50px)' }}
      >
        {slideData?.title || t.title}
      </h1>

      <p 
        ref={subtitleRef}
        className="slide-subtitle" 
        style={{ opacity: 0, transform: 'translateY(-20px)', marginBottom: '2rem', color: 'var(--wrapped-text-secondary)', fontSize: '1.2rem' }}
      >
        {slideData?.subtitle || t.subtitle}
      </p>

      <div 
        ref={containerRef}
        className="simple-chart-container"
        style={{ opacity: 0, transform: 'scale(0.9)' }}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          style={{ overflow: 'visible' }}
        >
          {/* Animated line */}
          <path
            d={generatePath(animationProgress)}
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Current position dot */}
          {currentPoint && animationProgress > 0 && (
            <circle
              cx={getX(currentIndex)}
              cy={getY(currentPoint.value)}
              r="10"
              fill="#FFFFFF"
              stroke="#E43C2F"
              strokeWidth="3"
              style={{
                filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8))'
              }}
            />
          )}
        </svg>
      </div>
    </div>
  );
};

export default Slide5;
