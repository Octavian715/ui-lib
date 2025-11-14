import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  // Base styles - MagicUI inspired with shimmer & glow
  [
    'relative inline-flex items-center justify-center',
    'font-bold',
    'rounded-2xl', // Extra rounded for premium look
    'border-0',
    'transition-all duration-500 ease-out',
    'outline-none',
    'overflow-hidden', // For shimmer effect
    // Dramatic focus with animated ring
    'focus-visible:ring-4 focus-visible:ring-primary-500/60',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
    'focus-visible:shadow-[0_0_40px_rgba(255,0,110,0.4)]',
    // Disabled styles
    'disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none',
    // Active state - Dramatic press
    'active:scale-[0.95]',
    // Transform for 3D effects
    'transform-gpu',
    // Before pseudo for shimmer effect
    'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    'before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-1000',
  ],
  {
    variants: {
      variant: {
        primary: [
          // Electric Pink gradient with intense glow
          'bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500',
          'text-white',
          'shadow-[0_0_25px_rgba(255,0,110,0.5)]',
          'hover:shadow-[0_0_40px_rgba(255,0,110,0.7),0_0_80px_rgba(131,56,236,0.3)]',
          'hover:scale-105',
          'active:scale-95',
          // Animated border gradient
          'after:absolute after:inset-0 after:rounded-2xl after:p-[2px]',
          'after:bg-gradient-to-r after:from-primary-500 after:via-secondary-500 after:to-accent-blue-500',
          'after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500',
        ],
        secondary: [
          // Electric Purple gradient
          'bg-gradient-to-br from-secondary-500 via-secondary-600 to-accent-blue-500',
          'text-white',
          'shadow-[0_0_25px_rgba(131,56,236,0.5)]',
          'hover:shadow-[0_0_40px_rgba(131,56,236,0.7),0_0_80px_rgba(58,134,255,0.3)]',
          'hover:scale-105',
          'active:scale-95',
        ],
        outline: [
          // Glass morphism outline with animated border
          'bg-neutral-900/40 backdrop-blur-xl',
          'text-white',
          'border-2 border-white/10',
          'hover:border-primary-500/50',
          'hover:bg-neutral-900/60',
          'hover:shadow-[0_0_30px_rgba(255,0,110,0.3)]',
          'hover:scale-105',
          // Animated gradient border on hover
          'relative',
          'after:absolute after:inset-0 after:rounded-2xl after:border-2 after:border-transparent',
          'after:bg-gradient-to-r after:from-primary-500 after:via-secondary-500 after:to-accent-blue-500',
          'after:bg-clip-padding after:-z-10 after:opacity-0 hover:after:opacity-20',
        ],
        ghost: [
          // Minimal with hover glow
          'bg-transparent',
          'text-white',
          'shadow-none',
          'hover:bg-white/5',
          'hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]',
          'hover:scale-102',
          'active:scale-98',
        ],
        danger: [
          // Red to Orange gradient with intense glow
          'bg-gradient-to-br from-red-500 via-red-600 to-accent-orange-500',
          'text-white',
          'shadow-[0_0_25px_rgba(239,68,68,0.5)]',
          'hover:shadow-[0_0_40px_rgba(239,68,68,0.7),0_0_80px_rgba(251,86,7,0.3)]',
          'hover:scale-105',
          'focus-visible:ring-red-500/60',
        ],
        success: [
          // Green gradient with glow
          'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-500',
          'text-white',
          'shadow-[0_0_25px_rgba(16,185,129,0.5)]',
          'hover:shadow-[0_0_40px_rgba(16,185,129,0.7),0_0_80px_rgba(20,184,166,0.3)]',
          'hover:scale-105',
          'focus-visible:ring-emerald-500/60',
        ],
      },
      size: {
        sm: ['text-sm', 'h-9', 'px-4', 'gap-2'],
        md: ['text-base', 'h-11', 'px-6', 'gap-2'],
        lg: ['text-lg', 'h-13', 'px-8', 'gap-3'],
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
