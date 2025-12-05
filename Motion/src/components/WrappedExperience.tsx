// Motion/src/components/WrappedExperience.tsx
// Main container component - Using motion.dev
import React, { useEffect, useState, useRef } from 'react';
import { animate } from 'motion';
import { WrappedProps } from '../types';
import IntroSlide from './IntroSlide';
import Slide1 from './Slide1';
import Slide2 from './Slide2';
import Slide3 from './Slide3';
import Slide4 from './Slide4';
import Slide5 from './Slide5';
import Slide6 from './Slide6';
import { translations, getLanguageFromURL } from '../i18n';
import '../styles/theme.less';
import { i } from 'motion/react-client';

const WrappedExperience: React.FC<WrappedProps> = ({ holdings, theme, onExit }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = 6;
  const currentLanguage = getLanguageFromURL();
  const t = translations[currentLanguage].slides;

  // Apply theme colors
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--wrapped-primary', theme.primary);
    root.style.setProperty('--wrapped-secondary', theme.secondary);
    root.style.setProperty('--wrapped-background', theme.background);
    root.style.setProperty('--wrapped-accent', theme.accent);
  }, [theme]);

  // Animate slide transitions
  useEffect(() => {
    if (containerRef.current) {
      const slideElement = containerRef.current.querySelector('.slide-wrapper');
      if (slideElement) {
        animate(
          slideElement as HTMLElement,
          { opacity: 1, x: 0 },
          { duration: 0.5 }
        );
      }
    }
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const resetToStart = () => {
    setCurrentSlide(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
      if (e.key === 'Home') resetToStart();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  // Mouse wheel / trackpad scroll navigation
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: number;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      isScrolling = true;

      if (e.deltaY > 0) {
        nextSlide();
      } else if (e.deltaY < 0) {
        prevSlide();
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 800); // Prevent rapid scrolling
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(scrollTimeout);
    };
  }, [currentSlide]);

  const slides = [
    <Slide1 key={`slide1-${currentSlide}`} />,
    <Slide2 key={`slide2-${currentSlide}`} />,
    <Slide3 key={`slide3-${currentSlide}`} />,
    <Slide4 key={`slide4-${currentSlide}`} />,
    <Slide5 key={`slide5-${currentSlide}`} />,
    <Slide6 key={`slide6-${currentSlide}`} />
  ];

  if (showIntro) {
    return (
      <div ref={containerRef} className="wrapped-container">
        <IntroSlide onComplete={() => setShowIntro(false)} />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="wrapped-container">
      {/* Slide Indicators */}
      <div className="slide-indicators">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>

      {/* Current Slide */}
      <div 
        key={currentSlide}
        className="slide-wrapper" 
        style={{ opacity: 0, transform: 'translateX(20px)' }}
      >
        {slides[currentSlide]}
      </div>

      {/* Navigation Buttons */}
      <div className="navigation">
        <button
          className="nav-button"
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          ← Föregående
        </button>
        
        {currentSlide === totalSlides - 1 ? (
          <button
            className="nav-button nav-button-primary"
            onClick={onExit}
          >
            {t.backToHome}
          </button>
        ) : (
          <button
            className="nav-button"
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
          >
            Nästa →
          </button>
        )}
      </div>
    </div>
  );
};

export default WrappedExperience;
