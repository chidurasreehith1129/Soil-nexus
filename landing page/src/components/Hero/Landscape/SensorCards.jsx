import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Thermometer, Cloud } from 'lucide-react';

export const SensorCards = () => {
  const cards = [
    {
      id: 1,
      title: 'Soil Moisture',
      value: '62%',
      icon: Droplet,
      style: { left: '17.5%', top: '26%' },
      delay: 0,
      iconColor: 'text-brand-accent'
    },
    {
      id: 2,
      title: 'Temperature',
      value: '28°C',
      icon: Thermometer,
      style: { left: '65%', top: '18%' },
      delay: 1.2,
      iconColor: 'text-brand-accent'
    },
    {
      id: 3,
      title: 'Humidity',
      value: '65%',
      icon: Cloud,
      style: { left: '78.75%', top: '52%' },
      delay: 2.4,
      iconColor: 'text-brand-accent'
    }
  ];

  return (
    <>
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            style={card.style}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0]
            }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.delay
              },
              opacity: { duration: 0.6, delay: 0.4 },
              scale: { duration: 0.6, delay: 0.4 }
            }}
            className="absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl border border-brand-border bg-brand-surface/40 backdrop-blur-md shadow-lg shadow-black/10 flex items-center gap-3 select-none pointer-events-auto hover:bg-brand-surface/65 hover:border-brand-accent/20 hover:shadow-brand-accent/5 transition-all duration-300 group"
          >
            {/* Glass Icon Circle */}
            <div className={`p-2 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center ${card.iconColor} group-hover:scale-110 transition-transform duration-300`}>
              <Icon size={16} />
            </div>

            {/* Content */}
            <div className="flex flex-col pr-1">
              <span className="text-[10px] font-sans font-medium text-brand-secondary/60 tracking-wide">
                {card.title}
              </span>
              <span className="text-sm font-sans font-bold text-brand-text leading-tight mt-0.5">
                {card.value}
              </span>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default SensorCards;
