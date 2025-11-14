/**
 * Design Tokens - Ultra-Modern UI Library 2025
 * Next-gen design system with mesh gradients, animated borders & 3D transforms
 */

export const designTokens = {
  // Colors - Vibrant & Bold: Pink, Purple, Blue, Orange
  colors: {
    // Primary brand colors - Electric Pink/Purple
    primary: {
      50: '#fff0f9',
      100: '#ffe0f3',
      200: '#ffc1e8',
      300: '#ff92d8',
      400: '#ff52c1',
      500: '#ff006e',  // Electric Pink
      600: '#e6006b',
      700: '#c00059',
      800: '#9e0049',
      900: '#82003d',
      950: '#500026',
    },
    // Secondary accent - Electric Purple
    secondary: {
      50: '#f5f0ff',
      100: '#ede5ff',
      200: '#ddd0ff',
      300: '#c4abff',
      400: '#a779ff',
      500: '#8338ec',  // Electric Purple
      600: '#7420e0',
      700: '#6318c5',
      800: '#5315a0',
      900: '#451382',
      950: '#2a0a57',
    },
    // Accent colors - Electric Blue & Orange
    accent: {
      blue: {
        50: '#eff6ff',
        100: '#dbe9fe',
        200: '#bfd9fe',
        300: '#93c0fd',
        400: '#609dfa',
        500: '#3a86ff',  // Electric Blue
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
      },
      orange: {
        50: '#fff7ed',
        100: '#ffedd5',
        200: '#fed7aa',
        300: '#fdba74',
        400: '#fb923c',
        500: '#fb5607',  // Electric Orange
        600: '#ea580c',
        700: '#c2410c',
        800: '#9a3412',
        900: '#7c2d12',
      },
    },
    // Neutral - Deep space blacks
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
    // Semantic colors with modern vibrancy
    success: {
      light: '#34d399',
      DEFAULT: '#10b981',
      dark: '#059669',
      glow: 'rgba(16, 185, 129, 0.4)',
    },
    warning: {
      light: '#fbbf24',
      DEFAULT: '#f59e0b',
      dark: '#d97706',
      glow: 'rgba(245, 158, 11, 0.4)',
    },
    error: {
      light: '#f87171',
      DEFAULT: '#ef4444',
      dark: '#dc2626',
      glow: 'rgba(239, 68, 68, 0.4)',
    },
    info: {
      light: '#60a5fa',
      DEFAULT: '#3b82f6',
      dark: '#2563eb',
      glow: 'rgba(59, 130, 246, 0.4)',
    },
  },

  // Gradients - Mesh & Multi-stop gradients
  gradients: {
    // Primary mesh gradient - Pink to Purple to Blue
    mesh: 'radial-gradient(at 0% 0%, #ff006e 0px, transparent 50%), radial-gradient(at 50% 0%, #8338ec 0px, transparent 50%), radial-gradient(at 100% 0%, #3a86ff 0px, transparent 50%), radial-gradient(at 0% 100%, #fb5607 0px, transparent 50%), radial-gradient(at 100% 100%, #ff006e 0px, transparent 50%)',

    // Animated mesh (can be keyframed)
    meshAnimated: 'radial-gradient(circle at 20% 50%, #ff006e 0%, transparent 50%), radial-gradient(circle at 60% 50%, #8338ec 0%, transparent 50%), radial-gradient(circle at 80% 80%, #3a86ff 0%, transparent 50%)',

    // Bold 2-stop gradients
    primary: 'linear-gradient(135deg, #ff006e 0%, #8338ec 100%)',
    secondary: 'linear-gradient(135deg, #8338ec 0%, #3a86ff 100%)',
    tertiary: 'linear-gradient(135deg, #3a86ff 0%, #ff006e 100%)',

    // Multi-stop cosmic gradients
    cosmic: 'linear-gradient(135deg, #ff006e 0%, #8338ec 33%, #3a86ff 66%, #fb5607 100%)',
    sunset: 'linear-gradient(135deg, #fb5607 0%, #ff006e 50%, #8338ec 100%)',
    aurora: 'linear-gradient(135deg, #3a86ff 0%, #8338ec 50%, #ff006e 100%)',

    // Status gradients
    success: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    danger: 'linear-gradient(135deg, #ef4444 0%, #ff006e 100%)',
    warning: 'linear-gradient(135deg, #fb5607 0%, #fbbf24 100%)',

    // Special effects
    holographic: 'linear-gradient(45deg, #ff006e 0%, #8338ec 25%, #3a86ff 50%, #fb5607 75%, #ff006e 100%)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
  },

  // Spacing - Based on 4px grid
  spacing: {
    0: '0',
    0.5: '0.125rem', // 2px
    1: '0.25rem',    // 4px
    1.5: '0.375rem', // 6px
    2: '0.5rem',     // 8px
    2.5: '0.625rem', // 10px
    3: '0.75rem',    // 12px
    3.5: '0.875rem', // 14px
    4: '1rem',       // 16px
    5: '1.25rem',    // 20px
    6: '1.5rem',     // 24px
    7: '1.75rem',    // 28px
    8: '2rem',       // 32px
    9: '2.25rem',    // 36px
    10: '2.5rem',    // 40px
    12: '3rem',      // 48px
    16: '4rem',      // 64px
    20: '5rem',      // 80px
    24: '6rem',      // 96px
  },

  // Border radius - More pronounced for modern look
  radius: {
    none: '0',
    sm: '0.375rem',   // 6px
    DEFAULT: '0.75rem',    // 12px
    md: '0.75rem',    // 12px
    lg: '1rem',       // 16px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    full: '9999px',
  },

  // Typography
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
    '2xl': ['1.5rem', { lineHeight: '2rem' }],   // 24px
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Shadows - Dramatic colored glows & neomorphic effects
  shadow: {
    none: 'none',
    sm: '0 2px 4px 0 rgb(0 0 0 / 0.15), 0 1px 2px 0 rgb(0 0 0 / 0.30)',
    DEFAULT: '0 4px 8px -2px rgb(0 0 0 / 0.20), 0 2px 4px -2px rgb(0 0 0 / 0.15)',
    md: '0 8px 16px -4px rgb(0 0 0 / 0.25), 0 4px 8px -4px rgb(0 0 0 / 0.15)',
    lg: '0 16px 32px -8px rgb(0 0 0 / 0.30), 0 8px 16px -8px rgb(0 0 0 / 0.20)',
    xl: '0 32px 64px -16px rgb(0 0 0 / 0.35), 0 16px 32px -16px rgb(0 0 0 / 0.25)',
    '2xl': '0 48px 96px -24px rgb(0 0 0 / 0.40)',
    inner: 'inset 0 2px 6px 0 rgb(0 0 0 / 0.15)',

    // Dramatic colored glow shadows
    glow: {
      primary: '0 0 30px rgba(255, 0, 110, 0.6), 0 0 60px rgba(255, 0, 110, 0.3), 0 10px 25px rgba(255, 0, 110, 0.2)',
      secondary: '0 0 30px rgba(131, 56, 236, 0.6), 0 0 60px rgba(131, 56, 236, 0.3), 0 10px 25px rgba(131, 56, 236, 0.2)',
      blue: '0 0 30px rgba(58, 134, 255, 0.6), 0 0 60px rgba(58, 134, 255, 0.3), 0 10px 25px rgba(58, 134, 255, 0.2)',
      orange: '0 0 30px rgba(251, 86, 7, 0.6), 0 0 60px rgba(251, 86, 7, 0.3), 0 10px 25px rgba(251, 86, 7, 0.2)',
      success: '0 0 30px rgba(16, 185, 129, 0.6), 0 0 60px rgba(16, 185, 129, 0.3), 0 10px 25px rgba(16, 185, 129, 0.2)',
      error: '0 0 30px rgba(239, 68, 68, 0.6), 0 0 60px rgba(239, 68, 68, 0.3), 0 10px 25px rgba(239, 68, 68, 0.2)',
      warning: '0 0 30px rgba(251, 86, 7, 0.6), 0 0 60px rgba(251, 86, 7, 0.3), 0 10px 25px rgba(251, 86, 7, 0.2)',
    },

    // Neomorphic shadows
    neo: {
      out: '8px 8px 16px rgba(0, 0, 0, 0.25), -8px -8px 16px rgba(255, 255, 255, 0.03)',
      in: 'inset 8px 8px 16px rgba(0, 0, 0, 0.25), inset -8px -8px 16px rgba(255, 255, 255, 0.03)',
      flat: '0 0 0 1px rgba(255, 255, 255, 0.05), 8px 8px 16px rgba(0, 0, 0, 0.2)',
    },
  },

  // Backdrop blur - For glassmorphism
  backdrop: {
    blur: {
      none: 'blur(0)',
      sm: 'blur(4px)',
      DEFAULT: 'blur(8px)',
      md: 'blur(12px)',
      lg: 'blur(16px)',
      xl: 'blur(24px)',
    },
  },

  // Transitions - Modern smooth animations
  transition: {
    // Duration
    duration: {
      instant: '75ms',
      fast: '150ms',
      base: '250ms',
      slow: '350ms',
      slower: '500ms',
    },
    // Timing functions - Smoother, more natural
    timing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy
      smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smooth ease
      elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Elastic bounce
    },
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },

  // Focus ring - Electric animated focus
  focus: {
    ring: {
      width: '3px',
      offset: '3px',
      color: 'rgba(255, 0, 110, 0.6)', // Electric pink with opacity
      glow: '0 0 0 4px rgba(255, 0, 110, 0.3), 0 0 20px rgba(255, 0, 110, 0.2)',
      animated: '0 0 0 3px rgba(255, 0, 110, 0.6), 0 0 20px rgba(131, 56, 236, 0.4), 0 0 40px rgba(58, 134, 255, 0.2)',
    },
  },

  // Animation & Effects
  effects: {
    // Noise texture for depth
    noise: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',

    // Gradient border animations
    borderGradient: {
      primary: 'linear-gradient(90deg, #ff006e, #8338ec, #3a86ff, #ff006e)',
      animated: 'linear-gradient(270deg, #ff006e, #8338ec, #3a86ff, #fb5607)',
      holographic: 'linear-gradient(45deg, #ff006e 0%, #8338ec 25%, #3a86ff 50%, #fb5607 75%, #ff006e 100%)',
    },

    // Transform origins for 3D effects
    transform: {
      perspective: '1000px',
      preserveDefault: 'preserve-3d',
    },
  },

  // Component sizes
  sizes: {
    button: {
      sm: {
        height: '2rem',     // 32px
        px: '0.75rem',      // 12px
        fontSize: '0.875rem', // 14px
      },
      md: {
        height: '2.5rem',   // 40px
        px: '1rem',         // 16px
        fontSize: '1rem',   // 16px
      },
      lg: {
        height: '3rem',     // 48px
        px: '1.5rem',       // 24px
        fontSize: '1.125rem', // 18px
      },
    },
    input: {
      sm: {
        height: '2rem',     // 32px
        px: '0.75rem',      // 12px
        fontSize: '0.875rem', // 14px
      },
      md: {
        height: '2.5rem',   // 40px
        px: '1rem',         // 16px
        fontSize: '1rem',   // 16px
      },
      lg: {
        height: '3rem',     // 48px
        px: '1.25rem',      // 20px
        fontSize: '1.125rem', // 18px
      },
    },
  },
}

// Helper function to get token values
export function getToken(path: string): any {
  return path.split('.').reduce((obj, key) => obj?.[key], designTokens as any)
}

export type DesignTokens = typeof designTokens
