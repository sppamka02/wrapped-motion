// BaseApp/src/App.tsx
// IMPORTANT: Before running, install Framer Motion in the Motion folder:
// cd ../Motion && npm install framer-motion && cd ../Baseapp

import React, { useState } from 'react';
import Hero from './components/Hero';
import './App.css';

// Import the WrappedExperience component from Motion folder
import { WrappedExperience, WrappedTheme, Holding } from '../../Motion/src';

// Import mock portfolio data
import portfolioData from './data/portfolio.json';

function App() {
  const [showWrapped, setShowWrapped] = useState(false);

  // Define SPP theme matching hooli-client experience
const spotifyTheme: WrappedTheme = {
  primary: '#C8102E',      // Deeper SPP red (closer to text)
  secondary: '#8B0000',    // Dark red
  background: '#1C1917',   // Deep warm brown-black (SPP tone)
  accent: '#E30613',       // Bright SPP red for accents
};

  // Alternative theme options (uncomment to use):
  
  // Purple theme:
  // const purpleTheme: WrappedTheme = {
  //   primary: '#9D4EDD',
  //   secondary: '#240046',
  //   background: '#10002B',
  //   accent: '#E0AAFF',
  // };

  // Blue theme:
  // const blueTheme: WrappedTheme = {
  //   primary: '#4CC9F0',
  //   secondary: '#023047',
  //   background: '#001219',
  //   accent: '#F72585',
  // };

  // Type assertion for JSON data
  const holdings = portfolioData as Holding[];

  if (showWrapped) {
    return (
      <WrappedExperience 
        holdings={holdings} 
        theme={spotifyTheme}
        onExit={() => setShowWrapped(false)}
      />
    );
  }

  return (
    <div className="App">
      <Hero onViewWrapped={() => setShowWrapped(true)} />
    </div>
  );
}

export default App;
