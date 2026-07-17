import React from 'react';

export const Sky = () => {
  return (
    <g id="sky-group">
      {/* Base Sky Gradient */}
      <rect x="0" y="0" width="800" height="450" fill="url(#skyGrad)" opacity="0.95" />
      
      {/* Subtle Radial Lighting from top center/right */}
      <circle cx="680" cy="120" r="380" fill="url(#sunGrad)" opacity="0.2" />
    </g>
  );
};

export default Sky;
