import React from 'react';
import { motion } from 'framer-motion';
import Container from './Common/Container';
import StatCard from './StatCard';
import { fadeUp } from '../utils/animations';

export const Statistics = () => {
  const stats = [
    { to: '500+', label: 'Happy Farmers' },
    { to: '95%', label: 'Prediction Accuracy' },
    { to: '24/7', label: 'Monitoring' },
    { to: '20+', label: 'IoT Sensors' },
  ];

  return (
    <section id="statistics" className="py-20 lg:py-28 relative">
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
            Trusted by Modern Farmers
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <StatCard
              key={stat.label}
              to={stat.to}
              label={stat.label}
              index={idx}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Statistics;
