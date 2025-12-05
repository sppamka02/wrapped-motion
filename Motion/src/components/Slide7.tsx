// Motion/src/components/Slide7.tsx
// Slide 7: Best Performer - Årets Raketskjutare
import React, { useEffect, useRef } from 'react';
import { animate } from 'motion';
import { translations, getLanguageFromURL } from '../i18n';
import masterData from '../../../Baseapp/src/data/dataSource';

const Slide7: React.FC = () => {
  const rocketRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const currentLanguage = getLanguageFromURL();
  const t = translations[currentLanguage].slides.slide7;

  const slideData = masterData.slides.find(s => s.slideNumber === 7);
  const data = slideData?.data as any;
  const name = data?.name || '';
  const ticker = data?.ticker || '';
  const yourExposureSek = data?.yourExposureSek || 0;
  const percentOfPortfolio = data?.percentOfPortfolio || 0;
  const summary = data?.summary || '';

  useEffect(() => {
    // Animate rocket with floating effect
    if (rocketRef.current) {
      animate(
        rocketRef.current,
        { 
          opacity: [0, 1],
          y: [30, 0],
          rotate: [-10, 5, -5, 0]
        } as any,
        { duration: 1 } as any
      );

      // Continuous floating animation
      animate(
        rocketRef.current,
        { 
          y: [0, -20, 0],
          rotate: [-5, 5, -5]
        } as any,
        { 
          duration: 2,
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

    if (cardRef.current) {
      animate(cardRef.current, { opacity: 1, scale: 1, y: 0 }, { duration: 0.8, delay: 0.6 });
    }
  }, []);

  return (
    <div className="slide" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '2rem',
      height: '100%'
    }}>
      <div ref={rocketRef} style={{
        fontSize: '5rem',
        marginBottom: '1rem',
        opacity: 0
      }}>
        🚀
      </div>

      <h1 ref={titleRef} className="slide-title" style={{ opacity: 0, transform: 'translateY(20px)' }}>
        {slideData?.title || t.title}
      </h1>

      <div ref={cardRef} className="performer-card" style={{
        opacity: 0,
        transform: 'scale(0.9) translateY(20px)',
        background: 'var(--wrapped-surface)',
        borderRadius: '24px',
        padding: '3rem',
        marginTop: '2rem',
        border: '2px solid var(--wrapped-border)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        maxWidth: '900px',
        width: '100%'
      }}>
        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 700,
            color: 'var(--wrapped-text)',
            marginBottom: '0.5rem'
          }}>
            {name}
          </h2>
          <span style={{
            fontSize: '1.2rem',
            color: 'var(--wrapped-text-secondary)',
            fontWeight: 600,
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.25rem 1rem',
            borderRadius: '20px',
            display: 'inline-block'
          }}>
            {ticker}
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px'
          }}>
            <span style={{
              fontSize: '0.9rem',
              color: 'var(--wrapped-text-secondary)'
            }}>
              Din exponering
            </span>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--wrapped-text)'
            }}>
              {yourExposureSek.toLocaleString('sv-SE')} SEK
            </span>
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '1rem',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px'
          }}>
            <span style={{
              fontSize: '0.9rem',
              color: 'var(--wrapped-text-secondary)'
            }}>
              Andel av portfölj
            </span>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: 'var(--wrapped-text)'
            }}>
              {percentOfPortfolio}%
            </span>
          </div>
        </div>

        <div style={{
          fontSize: '1rem',
          color: 'var(--wrapped-text-secondary)',
          fontStyle: 'italic',
          lineHeight: 1.6,
          textAlign: 'center'
        }}>
          <p style={{ margin: 0 }}>{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default Slide7;
