/**
 * Animation Presets
 * Reusable animation configurations for consistent micro-interactions
 */

export const animations = {
  // Fade animations
  fadeIn: {
    enter: 'transition-opacity duration-200 ease-out',
    enterFrom: 'opacity-0',
    enterTo: 'opacity-100',
    leave: 'transition-opacity duration-150 ease-in',
    leaveFrom: 'opacity-100',
    leaveTo: 'opacity-0',
  },

  // Scale animations
  scaleIn: {
    enter: 'transition-all duration-200 ease-out',
    enterFrom: 'opacity-0 scale-95',
    enterTo: 'opacity-100 scale-100',
    leave: 'transition-all duration-150 ease-in',
    leaveFrom: 'opacity-100 scale-100',
    leaveTo: 'opacity-0 scale-95',
  },

  // Slide animations
  slideUp: {
    enter: 'transition-all duration-300 ease-out',
    enterFrom: 'opacity-0 translate-y-4',
    enterTo: 'opacity-100 translate-y-0',
    leave: 'transition-all duration-200 ease-in',
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: 'opacity-0 translate-y-4',
  },

  slideDown: {
    enter: 'transition-all duration-300 ease-out',
    enterFrom: 'opacity-0 -translate-y-4',
    enterTo: 'opacity-100 translate-y-0',
    leave: 'transition-all duration-200 ease-in',
    leaveFrom: 'opacity-100 translate-y-0',
    leaveTo: 'opacity-0 -translate-y-4',
  },

  slideRight: {
    enter: 'transition-all duration-300 ease-out',
    enterFrom: 'opacity-0 -translate-x-4',
    enterTo: 'opacity-100 translate-x-0',
    leave: 'transition-all duration-200 ease-in',
    leaveFrom: 'opacity-100 translate-x-0',
    leaveTo: 'opacity-0 -translate-x-4',
  },

  slideLeft: {
    enter: 'transition-all duration-300 ease-out',
    enterFrom: 'opacity-0 translate-x-4',
    enterTo: 'opacity-100 translate-x-0',
    leave: 'transition-all duration-200 ease-in',
    leaveFrom: 'opacity-100 translate-x-0',
    leaveTo: 'opacity-0 translate-x-4',
  },

  // Modal/Dialog animations
  modal: {
    overlay: {
      enter: 'transition-opacity duration-300 ease-out',
      enterFrom: 'opacity-0',
      enterTo: 'opacity-100',
      leave: 'transition-opacity duration-200 ease-in',
      leaveFrom: 'opacity-100',
      leaveTo: 'opacity-0',
    },
    content: {
      enter: 'transition-all duration-300 ease-out',
      enterFrom: 'opacity-0 scale-95 translate-y-4',
      enterTo: 'opacity-100 scale-100 translate-y-0',
      leave: 'transition-all duration-200 ease-in',
      leaveFrom: 'opacity-100 scale-100 translate-y-0',
      leaveTo: 'opacity-0 scale-95 translate-y-4',
    },
  },

  // Hover interactions
  hover: {
    scale: 'hover:scale-105 active:scale-95 transition-transform duration-150 ease-in-out',
    lift: 'hover:-translate-y-0.5 transition-transform duration-200 ease-out',
    glow: 'hover:shadow-lg transition-shadow duration-200 ease-out',
  },

  // Loading spinner
  spin: 'animate-spin',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
}

// Transition classes generator
export function getTransitionClasses(animation: keyof typeof animations): string {
  const config = animations[animation]
  if (typeof config === 'string') {
    return config
  }
  return ''
}

export type AnimationPreset = keyof typeof animations
