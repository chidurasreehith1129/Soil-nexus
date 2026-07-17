import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Brain, Bell, BarChart3 } from 'lucide-react';
import Container from './Common/Container';
import FeatureCard from './FeatureCard';
import { fadeUp } from '../utils/animations';

export const Features = () => {
  const features = [
    {
      icon: Activity,
      title: 'Real-Time Monitoring',
      description: 'Monitor soil, weather, and crop health in real time.',
    },
    {
      icon: Brain,
      title: 'AI Crop Insights',
      description: 'Receive intelligent recommendations based on sensor data.',
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Detect irrigation issues before they become problems.',
    },
    {
      icon: BarChart3,
      title: 'Data Analytics',
      description: 'Visualize trends and improve farm productivity.',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-28 relative">
      <Container className="max-w-[1280px]">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="font-serif text-3xl md:text-5xl lg:text-[44px] tracking-tight text-brand-text font-bold"
          >
            Why Farmers Choose FarmSense
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={{ delay: 0.1 }}
            className="font-sans text-base md:text-lg text-brand-secondary/80 leading-relaxed"
          >
            Powerful AI tools designed to make farming smarter, more sustainable, and more profitable.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={idx}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Features;
