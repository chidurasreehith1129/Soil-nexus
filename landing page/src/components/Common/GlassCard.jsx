import React from 'react';

export const GlassCard = ({ children, className = '', onClick, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-brand-border bg-brand-card/40 backdrop-blur-md shadow-xl shadow-black/10 transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-brand-card/50 hover:border-white/15' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
