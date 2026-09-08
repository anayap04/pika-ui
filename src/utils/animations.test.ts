import { describe, it, expect } from 'vitest';
import { animations, animationClasses, keyframes } from './animations';
import * as utils from './index';

describe('animation utils', () => {
  it('exposes inline-style animation presets', () => {
    expect(animations.pixelFloat.animation).toContain('pixel-float');
    expect(animations.pixelPulse.animation).toContain('pixel-pulse');
    expect(animations.blink.animation).toContain('blink');
  });

  it('exposes matching class-name helpers', () => {
    expect(animationClasses).toEqual({
      pixelFloat: 'animate-pixel-float',
      pixelPulse: 'animate-pixel-pulse',
      blink: 'animate-blink',
    });
  });

  it('ships the keyframe definitions for the global stylesheet', () => {
    expect(keyframes).toContain('@keyframes pixel-float');
    expect(keyframes).toContain('@keyframes pixel-pulse');
    expect(keyframes).toContain('@keyframes blink');
  });

  it('is re-exported from the utils barrel', () => {
    expect(utils.animations).toBe(animations);
  });
});
