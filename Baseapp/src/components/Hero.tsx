import React from 'react';
import './Hero.css';
import masterData from '../data/master.json';
import { translations, getLanguageFromURL } from '../i18n';


interface HeroProps {
  onViewWrapped: () => void;
}

const Hero: React.FC<HeroProps> = ({ onViewWrapped }) => {
  const currentLanguage = getLanguageFromURL();
  const t = translations[currentLanguage].hero;
  
  // Get landing slide data from master.json
  const landingSlide = masterData.slides.find(s => s.isLanding === true);
  const stats = landingSlide?.data?.stats || [];
  
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1 className="hero-title">{landingSlide?.title || t.title}</h1>
        <p className="hero-subtitle">
          {landingSlide?.subtitle || t.subtitle}
        </p>
        
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-card ${index === 1 ? 'highlight' : ''}`}>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.description}</div>
              {stat.hint && <div className="stat-hint">{stat.hint}</div>}
            </div>
          ))}
        </div>

        <button className="cta-button" onClick={onViewWrapped}>{t.viewFullWrapped}</button>
        {/* include esaga icon here */}
        

      </div>
    </div>
  );
};

export default Hero;
