import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './Common/GlassCard';
import { fadeUp } from '../utils/animations';

export const TechnologyCard = ({ icon: Icon, title, index }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={{ delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="w-full h-full"
    >
      <GlassCard className="p-8 flex flex-col items-center justify-center text-center gap-4 border border-brand-border bg-brand-card/15 hover:bg-brand-card/25 shadow-lg shadow-black/5 hover:border-brand-accent/25 hover:shadow-[0_0_25px_rgba(232,198,138,0.12)] transition-all duration-500 rounded-2xl group h-full">
        {/* Icon */}
        <div className="p-4 rounded-full bg-brand-surface/30 border border-brand-border text-brand-accent group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
          <Icon size={28} />
        </div>

        {/* Title */}
        <h3 className="font-serif text-lg font-bold text-brand-text">
          {title}
        </h3>
      </GlassCard>
    </motion.div>
  );
};

export default TechnologyCard;
