import React from 'react';

export const FarmHouse = () => {
  return (
    <g id="farmhouse-group">
      {/* Soft Ambient Glow behind the house */}
      <circle cx="468" cy="285" r="40" fill="url(#houseGlow)" />

      {/* Chimney */}
      <rect x="478" y="267" width="5" height="10" fill="#0D4F46" />
      
      {/* House Base Walls */}
      <rect x="450" y="280" width="36" height="24" rx="1" fill="#F8F5EE" />
      
      {/* Roof */}
      <polygon points="445,280 468,264 491,280" fill="#0D4F46" />
      
      {/* Door */}
      <rect x="465" y="292" width="6" height="12" rx="0.5" fill="#2D6C5F" />

      {/* Windows (Glowing warm light) */}
      <rect x="455" y="285" width="4" height="4" rx="0.5" fill="#E8C68A" />
      <rect x="477" y="285" width="4" height="4" rx="0.5" fill="#E8C68A" />
    </g>
  );
};

export default FarmHouse;
