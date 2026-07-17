import React from 'react';

export const Hills = () => {
  return (
    <g id="hills-group">
      {/* Background Hill (Deep Teal) */}
      <path
        d="M -50 360 Q 300 240 850 380 L 850 510 L -50 510 Z"
        fill="url(#hillBackGrad)"
      />

      {/* Midground Hill (Surface Teal) */}
      <path
        d="M -50 410 Q 500 280 850 430 L 850 510 L -50 510 Z"
        fill="url(#hillMidGrad)"
      />

      {/* Foreground Hill (Card Teal) */}
      <path
        d="M -50 470 Q 250 340 850 470 L 850 510 L -50 510 Z"
        fill="url(#hillForeGrad)"
      />
    </g>
  );
};

export default Hills;
