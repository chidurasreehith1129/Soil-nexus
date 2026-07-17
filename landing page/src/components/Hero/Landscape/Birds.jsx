import React from 'react';
import { motion } from 'framer-motion';

export const Birds = () => {
  return (
    <g id="birds-group" stroke="#C8D5CF" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6">
      {/* Bird 1 */}
      <motion.g
        animate={{
          x: [220, 230, 220],
          y: [100, 92, 100]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <path d="M 0 3 Q 4 -1 8 3 Q 12 -1 16 3" />
      </motion.g>

      {/* Bird 2 */}
      <motion.g
        animate={{
          x: [250, 262, 250],
          y: [85, 78, 85]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        <path d="M 0 2.5 Q 3 -1 6 2.5 Q 9 -1 12 2.5" />
      </motion.g>

      {/* Bird 3 */}
      <motion.g
        animate={{
          x: [290, 298, 290],
          y: [110, 105, 110]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8
        }}
      >
        <path d="M 0 2 Q 2.5 -0.5 5 2 Q 7.5 -0.5 10 2" />
      </motion.g>
    </g>
  );
};

export default Birds;
