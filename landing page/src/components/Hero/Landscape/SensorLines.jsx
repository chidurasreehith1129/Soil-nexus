import React from 'react';
import { motion } from 'framer-motion';

export const SensorLines = () => {
  return (
    <g 
      id="sensor-lines" 
      stroke="#E8C68A" 
      strokeWidth="1.5" 
      strokeDasharray="4,8" 
      fill="none" 
      opacity="0.45" 
      filter="url(#lineGlow)"
    >
      {/* Card 1 (140, 130) to Card 2 (520, 90) */}
      <motion.path 
        d="M 140 130 Q 330 60 520 90" 
        animate={{ strokeDashoffset: [0, -24] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Card 2 (520, 90) to Card 3 (630, 260) */}
      <motion.path 
        d="M 520 90 Q 600 150 630 260" 
        animate={{ strokeDashoffset: [0, -24] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Card 3 (630, 260) to FarmHouse (468, 280) */}
      <motion.path 
        d="M 630 260 Q 560 300 468 280" 
        animate={{ strokeDashoffset: [0, -24] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Pulsing Connection Nodes */}
      <motion.circle 
        cx="140" 
        cy="130" 
        r="4.5" 
        fill="#E8C68A" 
        stroke="rgba(232, 198, 138, 0.4)"
        strokeWidth="1"
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ originX: "140px", originY: "130px" }}
      />
      <motion.circle 
        cx="520" 
        cy="90" 
        r="4.5" 
        fill="#E8C68A" 
        stroke="rgba(232, 198, 138, 0.4)"
        strokeWidth="1"
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ originX: "520px", originY: "90px" }}
      />
      <motion.circle 
        cx="630" 
        cy="260" 
        r="4.5" 
        fill="#E8C68A" 
        stroke="rgba(232, 198, 138, 0.4)"
        strokeWidth="1"
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ originX: "630px", originY: "260px" }}
      />
    </g>
  );
};

export default SensorLines;
