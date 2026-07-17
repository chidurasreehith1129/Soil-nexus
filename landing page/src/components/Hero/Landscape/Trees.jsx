import React from 'react';
import { motion } from 'framer-motion';

export const Trees = () => {
  return (
    <g id="trees-group">
      {/* Tree 1 (Left of house) */}
      <g>
        <rect x="430" y="278" width="2" height="14" fill="#0D352F" />
        <motion.circle
          cx="431"
          cy="274"
          r="9"
          fill="#1B5A50"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "431px", originY: "285px" }}
        />
      </g>

      {/* Tree 2 (Far left of house - smaller, darker) */}
      <g>
        <rect x="415" y="285" width="1.5" height="12" fill="#0D352F" />
        <motion.circle
          cx="416"
          cy="282"
          r="7"
          fill="#0F443B"
          animate={{ rotate: [0, -3, 3, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "416px", originY: "292px" }}
        />
      </g>

      {/* Tree 3 (Right of house) */}
      <g>
        <rect x="502" y="278" width="2" height="14" fill="#0D352F" />
        <motion.circle
          cx="503"
          cy="274"
          r="9"
          fill="#2D6C5F"
          animate={{ rotate: [0, 3, -3, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "503px", originY: "285px" }}
        />
      </g>

      {/* Tree 4 (Far right of house - smallest, lighter) */}
      <g>
        <rect x="516" y="284" width="1.5" height="10" fill="#0D352F" />
        <motion.circle
          cx="517"
          cy="281"
          r="5"
          fill="#356F62"
          animate={{ rotate: [0, -2, 2, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ originX: "517px", originY: "290px" }}
        />
      </g>
    </g>
  );
};

export default Trees;
