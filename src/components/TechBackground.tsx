import React from 'react';

const TechBackground = () => {
  return (
    <>
      {/* Animated Grid */}
      <div className="grid-background"></div>
      
      {/* Hexagonal Pattern */}
      <div className="hex-pattern"></div>
      
      {/* Circuit Lines */}
      <div className="circuit-lines">
        {/* Horizontal lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="circuit-line circuit-line-horizontal"
            style={{
              top: `${(i + 1) * 12.5}%`,
              animationDelay: `${i * 1}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          />
        ))}
        
        {/* Vertical lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="circuit-line circuit-line-vertical"
            style={{
              left: `${(i + 1) * 16.66}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${10 + i * 1.5}s`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default TechBackground;