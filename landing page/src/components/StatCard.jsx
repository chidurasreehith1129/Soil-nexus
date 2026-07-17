import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import GlassCard from './Common/GlassCard';
import { fadeUp } from '../utils/animations';

export const StatCard = ({ to, label, index }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const numString = to.replace(/[^0-9]/g, '');
  const suffix = to.replace(/[0-9]/g, '');
  const targetNum = parseInt(numString, 10);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1.8; // Duration in seconds
    const totalFrames = Math.round(duration * 60); // 60 FPS
    
    let frame = 0;
    const counterInterval = setInterval(() => {
      frame++;
      // Cubic ease out count-up calculation
      const progress = frame / totalFrames;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentCount = Math.round(easeOutProgress * targetNum);
      
      if (frame >= totalFrames) {
        setCount(targetNum);
        clearInterval(counterInterval);
      } else {
        setCount(currentCount);
      }
    }, 1000 / 60);

    return () => clearInterval(counterInterval);
  }, [isInView, targetNum]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={{ delay: index * 0.12 }}
      className="w-full"
    >
      <GlassCard className="py-12 px-6 flex flex-col items-center justify-center text-center border border-brand-border bg-brand-card/25 shadow-lg shadow-black/5 hover:border-brand-accent/15 transition-colors duration-300">
        {/* Value */}
        <span className="font-serif text-5xl md:text-6xl font-bold text-brand-accent tracking-tight mb-2">
          {count}
          {suffix}
        </span>
        
        {/* Label */}
        <span className="font-sans text-xs md:text-sm font-semibold tracking-wider text-brand-secondary/80 uppercase">
          {label}
        </span>
      </GlassCard>
    </motion.div>
  );
};

export default StatCard;
