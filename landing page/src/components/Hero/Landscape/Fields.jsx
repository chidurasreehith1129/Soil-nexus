import React from 'react';

export const Fields = () => {
  return (
    <g id="fields-group">
      {/* Midground Hill Field Strip 1 (Lighter Green fill) */}
      <path
        d="M 120 375 Q 400 290 750 380 L 720 395 Q 400 305 90 390 Z"
        fill="#356F62"
        opacity="0.3"
      />

      {/* Midground Hill Field Strip 2 (Tractor track contours) */}
      <path
        d="M 180 370 Q 400 300 700 375"
        fill="none"
        stroke="#E8C68A"
        strokeWidth="1.5"
        strokeDasharray="4,10"
        opacity="0.2"
      />
      <path
        d="M 195 372 Q 400 303 710 377"
        fill="none"
        stroke="#E8C68A"
        strokeWidth="1.5"
        strokeDasharray="4,10"
        opacity="0.2"
      />

      {/* Foreground Hill Contour Fills */}
      <path
        d="M -50 470 Q 250 340 850 470 L 800 480 Q 250 355 -50 480 Z"
        fill="#356F62"
        opacity="0.4"
      />
      
      {/* Foreground Hill Crop Rows */}
      <path
        d="M 20 460 Q 250 350 780 460"
        fill="none"
        stroke="#C8D5CF"
        strokeWidth="1"
        strokeDasharray="6,6"
        opacity="0.25"
      />
      <path
        d="M 40 463 Q 250 355 760 463"
        fill="none"
        stroke="#C8D5CF"
        strokeWidth="1"
        strokeDasharray="6,6"
        opacity="0.25"
      />
      <path
        d="M 60 466 Q 250 360 740 466"
        fill="none"
        stroke="#C8D5CF"
        strokeWidth="1"
        strokeDasharray="6,6"
        opacity="0.25"
      />
    </g>
  );
};

export default Fields;
