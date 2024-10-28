import React, { useState, useEffect } from "react";

const ExplosionVFX = ({ x, y, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 1500); // Increased duration for new animations

    return () => clearTimeout(timer);
  }, [onComplete]);

  // Generate random offsets for more natural particle movement
  const generateParticles = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      angle: (i * 360) / count,
      scale: 0.8 + Math.random() * 0.4,
      speed: 0.8 + Math.random() * 0.4,
    }));
  };

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)", // Center properly
      }}
    >
      {/* Core explosion */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Inner burst */}
        <div className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 animate-explosion-inner">
          <div className="absolute inset-0 bg-orange-500 rounded-full opacity-70" />
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-pulse opacity-90" />
        </div>

        {/* Outer shockwave */}
        <div className="absolute w-40 h-40 -translate-x-1/2 -translate-y-1/2 animate-explosion-outer">
          <div className="absolute inset-0 bg-orange-300 rounded-full opacity-40" />
        </div>

        {/* Heat distortion */}
        <div className="absolute w-48 h-48 -translate-x-1/2 -translate-y-1/2 animate-heat-wave">
          <div className="absolute inset-0 bg-orange-200 rounded-full opacity-20" />
        </div>
      </div>

      {/* Primary particles */}
      {generateParticles(12).map(({ id, angle, scale, speed }) => (
        <div
          key={`primary-${id}`}
          className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2"
          style={{
            "--particle-angle": `${angle}deg`,
            "--particle-scale": scale,
            "--particle-speed": speed,
          }}
        >
          <div className="absolute w-full h-full animate-particle-primary">
            <div className="w-full h-full bg-orange-500 rounded-full" />
          </div>
        </div>
      ))}

      {/* Secondary smaller particles */}
      {generateParticles(8).map(({ id, angle, scale, speed }) => (
        <div
          key={`secondary-${id}`}
          className="absolute left-1/2 top-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2"
          style={{
            "--particle-angle": `${angle + 22.5}deg`,
            "--particle-scale": scale * 0.7,
            "--particle-speed": speed * 1.2,
          }}
        >
          <div className="absolute w-full h-full animate-particle-secondary">
            <div className="w-full h-full bg-yellow-400 rounded-full" />
          </div>
        </div>
      ))}

      {/* Sparks */}
      {generateParticles(6).map(({ id, angle, speed }) => (
        <div
          key={`spark-${id}`}
          className="absolute left-1/2 top-1/2 w-1 h-3 -translate-x-1/2 -translate-y-1/2"
          style={{
            "--particle-angle": `${angle * 1.5}deg`,
            "--particle-speed": speed * 1.4,
          }}
        >
          <div className="absolute w-full h-full animate-spark">
            <div className="w-full h-full bg-yellow-200 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = `
  @keyframes explosion-inner {
    0% {
      transform: scale(0.2);
      opacity: 1;
    }
    40% {
      transform: scale(1.4);
      opacity: 0.9;
    }
    100% {
      transform: scale(1.8);
      opacity: 0;
    }
  }

  @keyframes explosion-outer {
    0% {
      transform: scale(0.1);
      opacity: 0.6;
    }
    50% {
      transform: scale(2);
      opacity: 0.3;
    }
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  @keyframes heat-wave {
    0% {
      transform: scale(0.1);
      opacity: 0.3;
    }
    30% {
      transform: scale(2.2);
      opacity: 0.2;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }

  @keyframes particle-primary {
    0% {
      transform: rotate(var(--particle-angle)) translateX(0) scale(1);
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: rotate(var(--particle-angle)) 
                translateX(calc(120px * var(--particle-speed))) 
                scale(0);
      opacity: 0;
    }
  }

  @keyframes particle-secondary {
    0% {
      transform: rotate(var(--particle-angle)) translateX(20px) scale(1);
      opacity: 1;
    }
    100% {
      transform: rotate(var(--particle-angle)) 
                translateX(calc(100px * var(--particle-speed))) 
                scale(0);
      opacity: 0;
    }
  }

  @keyframes spark {
    0% {
      transform: rotate(var(--particle-angle)) translateX(0) scale(1);
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      transform: rotate(var(--particle-angle)) 
                translateX(calc(150px * var(--particle-speed))) 
                scale(0);
      opacity: 0;
    }
  }

  .animate-explosion-inner {
    animation: explosion-inner 1.5s ease-out forwards;
  }

  .animate-explosion-outer {
    animation: explosion-outer 1.5s ease-out forwards;
  }

  .animate-heat-wave {
    animation: heat-wave 1.5s ease-out forwards;
  }

  .animate-particle-primary {
    animation: particle-primary 1.5s ease-out forwards;
  }

  .animate-particle-secondary {
    animation: particle-secondary 1.3s ease-out forwards;
  }

  .animate-spark {
    animation: spark 1s ease-out forwards;
  }
`;

const styleSheet = new CSSStyleSheet();
styleSheet.replaceSync(styles);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, styleSheet];

export default ExplosionVFX;
