import React from 'react';
import { motion } from 'framer-motion';
import Container from './Common/Container';
import GlassCard from './Common/GlassCard';
import PrimaryButton from './Common/PrimaryButton';
import SecondaryButton from './Common/SecondaryButton';
import { scaleIn } from '../utils/animations';

export const CTA = () => {
  return (
    <section id="cta" className="py-20 lg:py-28 relative overflow-hidden">
      <Container className="max-w-[1280px]">
        {/* Background Glow behind Section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[600px] max-h-[400px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="w-full"
        >
          <GlassCard className="relative overflow-hidden py-16 px-8 md:px-16 border border-brand-border bg-brand-surface/40 backdrop-blur-xl rounded-3xl text-center flex flex-col items-center gap-6 max-w-4xl mx-auto shadow-2xl shadow-black/20">
            {/* Inner Gold/Teal radial glows */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-accent/5 rounded-full blur-[80px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-card/20 rounded-full blur-[80px] pointer-events-none -z-10" />

            {/* Accent badge */}
            <div className="px-3 py-1 rounded-full border border-brand-accent/20 bg-brand-accent/5 text-[10px] font-sans font-bold tracking-widest uppercase text-brand-accent">
              Get Instant Access
            </div>

            {/* Heading */}
            <h2 className="font-serif text-3xl md:text-5xl lg:text-[44px] font-bold text-brand-text max-w-2xl leading-tight">
              Ready to Transform Your Farm?
            </h2>

            {/* Description */}
            <p className="font-sans text-base md:text-lg text-brand-secondary/80 max-w-xl leading-relaxed">
              Experience the future of precision agriculture with FarmSense. Optimize resource usage, automate insights, and scale sustainability.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-4">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <PrimaryButton onClick={() => window.location.href = '/dashboard.html'} className="w-full sm:w-auto px-8 py-3.5 text-base shadow-xl shadow-brand-accent/15 cursor-pointer">
                  Get Started
                </PrimaryButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <SecondaryButton className="w-full sm:w-auto px-8 py-3.5 text-base cursor-pointer">
                  Watch Demo
                </SecondaryButton>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>
      </Container>
    </section>
  );
};

export default CTA;
