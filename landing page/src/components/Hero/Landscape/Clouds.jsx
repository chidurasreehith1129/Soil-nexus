import React from 'react';
import { motion } from 'framer-motion';

export const Clouds = () => {
  return (
    <g id="clouds-group" fill="#F8F5EE" opacity="0.25">
      {/* Cloud 1 */}
      <motion.g
        animate={{ x: [-20, 20, -20] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M 150 90 a 15 15 0 0 1 15 -15 a 22 22 0 0 1 36 3 a 15 15 0 0 1 10 14 a 10 10 0 0 1 -10 10 h -51 a 12 12 0 0 1 -10 -12 z" />
      </motion.g>

      {/* Cloud 2 */}
      <motion.g
        animate={{ x: [25, -25, 25] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M 380 70 a 12 12 0 0 1 12 -12 a 18 18 0 0 1 30 2 a 12 12 0 0 1 8 11 a 8 8 0 0 1 -8 8 h -42 a 10 10 0 0 1 -8 -9 z" />
      </motion.g>

      {/* Cloud 3 */}
      <motion.g
        animate={{ x: [-15, 15, -15] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M 580 115 a 10 10 0 0 1 10 -10 a 15 15 0 0 1 25 2 a 10 10 0 0 1 7 9 a 7 7 0 0 1 -7 7 h -35 a 8 8 0 0 1 -7 -8 z" />
      </motion.g>
    </g>
  );
};

export default Clouds;
