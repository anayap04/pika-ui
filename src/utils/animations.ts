// Animation utilities for pixel-art animations
// Use in components via inline styles or className

export const animations = {
  pixelFloat: {
    animation: 'pixel-float 2s ease-in-out infinite',
  },
  pixelPulse: {
    animation: 'pixel-pulse 1.5s ease-in-out infinite',
  },
  blink: {
    animation: 'blink 0.6s step-start infinite',
  },
};

export const animationClasses = {
  pixelFloat: 'animate-pixel-float',
  pixelPulse: 'animate-pixel-pulse',
  blink: 'animate-blink',
};

// Keyframes to add to global CSS (in App.css or via @keyframes in tokens.css)
export const keyframes = `
  @keyframes pixel-float {
    0%, 100% { transform: translateY(0px); }
    25% { transform: translateY(-8px); }
    50% { transform: translateY(0px); }
    75% { transform: translateY(-4px); }
  }

  @keyframes pixel-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
  }

  @keyframes blink {
    0%, 49% { opacity: 1; }
    50%, 100% { opacity: 0; }
  }
`;
