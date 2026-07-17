import React from 'react';
import { motion } from 'framer-motion';

export const HeroText = () => {
  const line1 = "Smart Farming.";
  const line2 = "Powered by AI.";
  const line3 = "Built for Tomorrow.";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const lineVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 text-center items-center lg:text-left lg:items-start w-full">
      {/* Heading Line by Line */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-[72px] xl:text-[84px] leading-[1.03] tracking-tight text-brand-text max-w-5xl"
      >
        <span className="overflow-hidden block py-0.5">
          <motion.span variants={lineVariants} className="block">
            {line1}
          </motion.span>
        </span>
        <span className="overflow-hidden block py-0.5 text-brand-accent">
          <motion.span variants={lineVariants} className="block">
            {line2}
          </motion.span>
        </span>
        <span className="overflow-hidden block py-0.5">
          <motion.span variants={lineVariants} className="block">
            {line3}
          </motion.span>
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="font-sans text-base md:text-lg text-brand-secondary/80 leading-relaxed max-w-[600px]"
      >
        FarmSense transforms agricultural data into intelligent recommendations, helping farmers monitor crops, optimize resources, and make confident decisions with AI.
      </motion.p>
    </div>
  );
};

export default HeroText;
