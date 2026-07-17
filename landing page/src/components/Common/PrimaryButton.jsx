import React from 'react';

export const PrimaryButton = ({ children, className = '', onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-accent text-brand-bg font-sans font-semibold text-sm tracking-wider hover:opacity-95 active:scale-98 transition-all duration-300 shadow-md shadow-brand-accent/10 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
