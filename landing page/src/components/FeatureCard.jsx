import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './Common/GlassCard';
import { fadeUp } from '../utils/animations';

export const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={{ delay: index * 0.12 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="h-full"
    >
      <GlassCard className="p-8 h-full flex flex-col items-start gap-4 border border-brand-border bg-brand-card/20 shadow-lg shadow-black/5 hover:border-brand-accent/20 hover:bg-brand-card/30 transition-colors duration-300 group">
        {/* Icon wrapper */}
        <div className="p-3 rounded-2xl bg-brand-surface/40 border border-brand-border/60 text-brand-accent transition-all duration-300 group-hover:rotate-6">
          <Icon size={24} />
        </div>
        
        {/* Title */}
        <h3 className="font-serif text-xl font-bold text-brand-text mt-2">
          {title}
        </h3>

        {/* Description */}
        <p className="font-sans text-sm text-brand-secondary/80 leading-relaxed">
          {description}
        </p>
      </GlassCard>
    </motion.div>
  );
};

export default FeatureCard;
