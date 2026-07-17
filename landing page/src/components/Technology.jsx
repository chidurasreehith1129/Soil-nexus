import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Radio, Cloud, Globe, TrendingUp } from 'lucide-react';
import Container from './Common/Container';
import TechnologyCard from './TechnologyCard';
import { fadeUp } from '../utils/animations';

export const Technology = () => {
  const technologies = [
    { icon: Brain, title: 'Artificial Intelligence' },
    { icon: Cpu, title: 'Machine Learning' },
    { icon: Radio, title: 'IoT Sensors' },
    { icon: Cloud, title: 'Cloud Analytics' },
    { icon: Globe, title: 'Satellite Monitoring' },
    { icon: TrendingUp, title: 'Predictive Models' },
  ];

  return (
    <section id="technology" className="py-20 lg:py-28 relative">
      <Container className="max-w-[1280px]">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="font-serif text-3xl md:text-5xl lg:text-[44px] tracking-tight text-brand-text font-bold"
          >
            Powered by Modern Technology
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, idx) => (
            <TechnologyCard
              key={tech.title}
              icon={tech.icon}
              title={tech.title}
              index={idx}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Technology;
