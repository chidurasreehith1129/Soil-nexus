import React from 'react';

export const GlowEffects = () => {
  return (
    <defs>
      {/* Sky Gradient */}
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#104E45" stopOpacity="1" />
        <stop offset="100%" stopColor="#0D4F46" stopOpacity="0" />
      </linearGradient>

      {/* Sun Glow Filter */}
      <filter id="sunGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="15" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>

      {/* Ambient Glows */}
      <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E8C68A" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#E8C68A" stopOpacity="0" />
      </radialGradient>

      <radialGradient id="houseGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E8C68A" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#E8C68A" stopOpacity="0" />
      </radialGradient>

      {/* Hill Gradients to give depth */}
      <linearGradient id="hillBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0F443B" />
        <stop offset="100%" stopColor="#08221D" />
      </linearGradient>
      
      <linearGradient id="hillMidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1B5A50" />
        <stop offset="100%" stopColor="#092B25" />
      </linearGradient>

      <linearGradient id="hillForeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2D6C5F" />
        <stop offset="100%" stopColor="#0E332C" />
      </linearGradient>

      {/* Connection Line Glow */}
      <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  );
};

export default GlowEffects;
