import React from 'react';

export const BackgroundGlow = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none">
      {/* Top Left Organic Teal Glow */}
      <div 
        className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-35 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, #2D6C5F 0%, #1B5A50 50%, transparent 100%)'
        }}
      />
      
      {/* Top Right Luxury Gold Glow */}
      <div 
        className="absolute -top-[10%] -right-[15%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full opacity-[0.12] blur-[150px]"
        style={{
          background: 'radial-gradient(circle, #E8C68A 0%, #2D6C5F 60%, transparent 100%)'
        }}
      />
      
      {/* Center Deep Green Ambient Radial */}
      <div 
        className="absolute top-[30%] left-[20%] w-[70vw] h-[50vw] max-w-[950px] max-h-[700px] rounded-full opacity-[0.2] blur-[160px]"
        style={{
          background: 'radial-gradient(circle, #1B5A50 0%, #0D4F46 70%, transparent 100%)'
        }}
      />

      {/* Bottom Right Accent Glow */}
      <div 
        className="absolute -bottom-[10%] -right-[10%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full opacity-25 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, #2D6C5F 0%, #1B5A50 50%, transparent 100%)'
        }}
      />
    </div>
  );
};

export default BackgroundGlow;
