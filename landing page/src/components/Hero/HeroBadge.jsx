import React from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export const HeroBadge = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, borderColor: 'rgba(232, 198, 138, 0.3)' }}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-border bg-white/[0.03] backdrop-blur-md cursor-pointer transition-colors duration-300"
    >
      <Leaf size={14} className="text-brand-accent animate-pulse" />
      <span className="text-xs font-sans font-medium tracking-wide text-brand-secondary hover:text-brand-text transition-colors duration-300">
        AI Powered Agriculture
      </span>
    </motion.div>
  );
};

export default HeroBadge;
