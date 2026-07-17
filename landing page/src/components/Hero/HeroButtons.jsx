import React from 'react';
import { motion } from 'framer-motion';
import PrimaryButton from '../Common/PrimaryButton';

export const HeroButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-center lg:justify-start w-full mt-2"
    >
      <motion.div 
        whileHover={{ scale: 1.04, y: -2 }} 
        whileTap={{ scale: 0.98 }}
        className="w-full sm:w-auto min-w-[220px] sm:min-w-[250px]"
      >
        <PrimaryButton 
          aria-label="Get Started with FarmSense"
          onClick={() => window.location.href = '/dashboard.html'}
          className="w-full px-12 py-3.5 text-base font-semibold shadow-lg shadow-brand-accent/15 hover:shadow-brand-accent/25 hover:translate-y-[-1px] transition-all duration-300"
        >
          Get Started
        </PrimaryButton>
      </motion.div>
    </motion.div>
  );
};

export default HeroButtons;
