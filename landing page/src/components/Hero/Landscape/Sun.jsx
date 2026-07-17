import React from 'react';
import { motion } from 'framer-motion';

export const Sun = () => {
  return (
    <g id="sun-group">
      {/* Outer soft breathing glow circle */}
      <motion.circle
        cx="680"
        cy="120"
        r="50"
        fill="#E8C68A"
        opacity="0.22"
        filter="url(#sunGlow)"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.18, 0.38, 0.18]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ originX: "680px", originY: "120px" }}
      />

      {/* Main Sun Circle */}
      <circle
        cx="680"
        cy="120"
        r="30"
        fill="#E8C68A"
        opacity="0.95"
        filter="url(#sunGlow)"
      />
    </g>
  );
};

export default Sun;
