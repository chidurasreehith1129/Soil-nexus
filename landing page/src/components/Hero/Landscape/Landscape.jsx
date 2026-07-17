import React from 'react';
import { motion } from 'framer-motion';
import GlowEffects from './GlowEffects';
import Sky from './Sky';
import Sun from './Sun';
import Clouds from './Clouds';
import Hills from './Hills';
import Fields from './Fields';
import FarmHouse from './FarmHouse';
import Trees from './Trees';
import Birds from './Birds';
import SensorLines from './SensorLines';
import SensorCards from './SensorCards';

export const Landscape = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="w-full relative aspect-video select-none group"
    >
      {/* Ambient background glow circle behind card */}
      <div className="absolute inset-2 bg-brand-accent/5 rounded-3xl blur-2xl group-hover:bg-brand-accent/10 transition-all duration-500 -z-10" />

      {/* SVG Canvas Drawing */}
      <svg
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full rounded-3xl border border-brand-border bg-brand-surface/20 shadow-2xl shadow-black/15 group-hover:border-brand-accent/20 group-hover:shadow-[0_0_50px_rgba(232,198,138,0.06)] transition-all duration-500 overflow-hidden"
      >
        <GlowEffects />
        <Sky />
        <Sun />
        <Birds />
        <Clouds />
        <Hills />
        <FarmHouse />
        <Trees />
        <Fields />
        <SensorLines />

        {/* Floating Glowing Particle Seeds */}
        <g id="glowing-particles">
          <motion.circle 
            cx="260" 
            cy="200" 
            r="2" 
            fill="#E8C68A" 
            filter="url(#lineGlow)"
            animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -12, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} 
          />
          <motion.circle 
            cx="480" 
            cy="180" 
            r="1.8" 
            fill="#E8C68A" 
            filter="url(#lineGlow)"
            animate={{ opacity: [0.3, 0.9, 0.3], y: [0, -18, 0] }} 
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} 
          />
          <motion.circle 
            cx="210" 
            cy="280" 
            r="2.2" 
            fill="#E8C68A" 
            filter="url(#lineGlow)"
            animate={{ opacity: [0.15, 0.75, 0.15], y: [0, -10, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }} 
          />
          <motion.circle 
            cx="580" 
            cy="330" 
            r="2" 
            fill="#E8C68A" 
            filter="url(#lineGlow)"
            animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -15, 0] }} 
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2.2 }} 
          />
          <motion.circle 
            cx="340" 
            cy="250" 
            r="1.5" 
            fill="#E8C68A" 
            filter="url(#lineGlow)"
            animate={{ opacity: [0.4, 0.9, 0.4], y: [0, -8, 0] }} 
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 3.1 }} 
          />
        </g>
      </svg>

      {/* Floating HTML Glass Cards Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <SensorCards />
      </div>
    </motion.div>
  );
};

export default Landscape;
