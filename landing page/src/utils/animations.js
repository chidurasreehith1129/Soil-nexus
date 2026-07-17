const shouldReduceMotion = typeof window !== 'undefined' 
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
  : false;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration || 0.6,
      delay: custom.delay || 0,
      ease: [0.16, 1, 0.3, 1],
    }
  })
};

export const fadeUp = {
  hidden: { 
    opacity: 0, 
    y: shouldReduceMotion ? 0 : 30 
  },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration || 0.8,
      delay: custom.delay || 0,
      ease: [0.16, 1, 0.3, 1],
    }
  })
};

export const fadeDown = {
  hidden: { 
    opacity: 0, 
    y: shouldReduceMotion ? 0 : -30 
  },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration || 0.8,
      delay: custom.delay || 0,
      ease: [0.16, 1, 0.3, 1],
    }
  })
};

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: shouldReduceMotion ? 1 : 0.95 
  },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration || 0.8,
      delay: custom.delay || 0,
      ease: [0.16, 1, 0.3, 1],
    }
  })
};

export const staggerContainer = {
  hidden: {},
  visible: (custom = {}) => ({
    transition: {
      staggerChildren: custom.staggerChildren || 0.15,
      delayChildren: custom.delayChildren || 0,
    }
  })
};
