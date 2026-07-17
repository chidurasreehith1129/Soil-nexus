import React from 'react';

export const Container = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`max-w-7xl mx-auto px-6 md:px-12 lg:px-16 w-full ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
