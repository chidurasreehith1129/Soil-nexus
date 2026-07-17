import React from 'react';
import { motion } from 'framer-motion';
import { Users, CheckCircle, ShieldCheck } from 'lucide-react';
import Container from '../Common/Container';
import HeroBadge from './HeroBadge';
import HeroText from './HeroText';
import HeroButtons from './HeroButtons';
import Landscape from './Landscape/Landscape';

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center py-20 lg:py-28 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[46%_54%] gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column */}
          <div className="flex flex-col items-center lg:items-start gap-6 w-full">
            <HeroBadge />
            <HeroText />
            <HeroButtons />
            
            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-x-8 gap-y-3 mt-2 justify-center lg:justify-start text-xs font-sans text-brand-secondary/60"
            >
              <div className="flex items-center gap-2">
                <Users size={14} className="text-brand-accent/70" />
                <span>500+ Farmers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={14} className="text-brand-accent/70" />
                <span>95% Accuracy</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-accent/70" />
                <span>24/7 Monitoring</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Premium Custom SVG Landscape */}
          <div className="w-full flex items-center justify-center">
            <div className="w-full max-w-xl lg:max-w-none">
              <Landscape />
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default Hero;
