import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeatureGrid } from '../components/FeatureGrid';
import { ChallengeImpact } from '../components/ChallengeImpact';

export const HomePage: React.FC = () => {
  const scrollToFeatures = () => {
    const el = document.getElementById('features-grid-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12">
      <HeroSection onExploreClick={scrollToFeatures} />
      <FeatureGrid />
      <ChallengeImpact />
    </div>
  );
};
