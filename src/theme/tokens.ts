/**
 * Design Tokens
 * Centralized design system for consistent UI/UX
 */

export const designTokens = {
  // Colors - Semantic naming for better consistency
  colors: {
    // Primary brand colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
      950: '#172554',
    },
    // Neutral/Gray scale
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
      950: '#020617',
    },
    // Semantic colors
    success: {
      light: '#10b981',
      DEFAULT: '#059669',
      dark: '#047857',
    },
    warning: {
      light: '#f59e0b',
      DEFAULT: '#d97706',
      dark: '#b45309',
    },
    error: {
      light: '#ef4444',
      DEFAULT: '#dc2626',
      dark: '#b91c1c',
    },
    info: {
      light: '#3b82f6',
      DEFAULT: '#2563eb',
      dark: '#1d4ed8',
    },
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

  // Border radius
  radius: {
    none: '0',
    sm: '0.25rem',   // 4px
    DEFAULT: '0.5rem',    // 8px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
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
  },

  // Shadows - Elevation system
  shadow: {
    none: 'none',
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  },

  // Transitions - Consistent animation timing
  transition: {
    // Duration
    duration: {
      instant: '75ms',
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    // Timing functions
    timing: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Bouncy
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

  // Focus ring - Consistent focus styling
  focus: {
    ring: {
      width: '2px',
      offset: '2px',
      color: 'rgb(59 130 246 / 0.5)', // primary-500 with opacity
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
