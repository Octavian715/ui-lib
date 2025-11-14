/**
 * Design Tokens - Modern UI Library 2025
 * Contemporary design system with glassmorphism, gradients & glow effects
 */

export const designTokens = {
  // Colors - Modern purple/violet palette with cyan accents
  colors: {
    // Primary brand colors - Purple/Violet gradient
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',  // Main purple
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
      950: '#3b0764',
    },
    // Secondary accent - Cyan/Blue
    secondary: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',  // Main cyan
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
    // Neutral/Gray scale - Warmer tones
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
      950: '#0a0a0a',
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

  // Gradients - Modern gradient combinations
  gradients: {
    primary: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    secondary: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    success: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    danger: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    twilight: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    ocean: 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)',
    sunset: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)',
    cosmic: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 100%)',
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

  // Shadows - Modern elevation with colored glow effects
  shadow: {
    none: 'none',
    sm: '0 1px 3px 0 rgb(0 0 0 / 0.12), 0 1px 2px 0 rgb(0 0 0 / 0.24)',
    DEFAULT: '0 3px 6px -1px rgb(0 0 0 / 0.12), 0 2px 4px -1px rgb(0 0 0 / 0.08)',
    md: '0 6px 12px -2px rgb(0 0 0 / 0.16), 0 3px 6px -2px rgb(0 0 0 / 0.08)',
    lg: '0 12px 24px -4px rgb(0 0 0 / 0.20), 0 6px 12px -4px rgb(0 0 0 / 0.12)',
    xl: '0 24px 48px -8px rgb(0 0 0 / 0.24), 0 12px 24px -8px rgb(0 0 0 / 0.16)',
    '2xl': '0 32px 64px -12px rgb(0 0 0 / 0.28)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
    // Colored glow shadows
    glow: {
      primary: '0 0 20px -5px rgba(168, 85, 247, 0.5), 0 8px 16px -4px rgba(168, 85, 247, 0.3)',
      secondary: '0 0 20px -5px rgba(6, 182, 212, 0.5), 0 8px 16px -4px rgba(6, 182, 212, 0.3)',
      success: '0 0 20px -5px rgba(16, 185, 129, 0.5), 0 8px 16px -4px rgba(16, 185, 129, 0.3)',
      error: '0 0 20px -5px rgba(239, 68, 68, 0.5), 0 8px 16px -4px rgba(239, 68, 68, 0.3)',
      warning: '0 0 20px -5px rgba(245, 158, 11, 0.5), 0 8px 16px -4px rgba(245, 158, 11, 0.3)',
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

  // Focus ring - Modern purple focus
  focus: {
    ring: {
      width: '3px',
      offset: '2px',
      color: 'rgba(168, 85, 247, 0.5)', // primary purple with opacity
      glow: '0 0 0 3px rgba(168, 85, 247, 0.3)',
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
