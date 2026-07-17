import React from 'react';

export const SecondaryButton = ({ children, className = '', onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-full border border-brand-border bg-white/[0.03] hover:bg-brand-hover text-brand-secondary hover:text-brand-text font-sans font-medium text-sm tracking-wider active:scale-98 transition-all duration-300 backdrop-blur-sm cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
