import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  // Base styles - Modern, smooth & elevated
  [
    'inline-flex items-center justify-center',
    'font-semibold',
    'rounded-xl', // More rounded for modern look
    'border-0', // Remove borders for cleaner look
    'transition-all duration-300 ease-out',
    'outline-none',
    'shadow-md',
    // Focus styles - Purple glow
    'focus-visible:ring-3 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
    // Disabled styles
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none',
    // Active state - Subtle scale
    'active:scale-[0.97]',
    // Transform for smooth hover
    'transform',
  ],
  {
    variants: {
      variant: {
        primary: [
          // Purple gradient background
          'bg-gradient-to-br from-primary-500 to-primary-600',
          'text-white',
          'hover:from-primary-600 hover:to-primary-700',
          'hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]', // Purple glow
          'hover:-translate-y-0.5',
          'active:from-primary-700 active:to-primary-800',
        ],
        secondary: [
          // Cyan gradient
          'bg-gradient-to-br from-secondary-500 to-secondary-600',
          'text-white',
          'hover:from-secondary-600 hover:to-secondary-700',
          'hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]', // Cyan glow
          'hover:-translate-y-0.5',
          'active:from-secondary-700 active:to-secondary-800',
        ],
        outline: [
          'bg-transparent',
          'text-white',
          'ring-2 ring-inset ring-neutral-700',
          'hover:bg-white/5',
          'hover:ring-neutral-600',
          'hover:shadow-lg',
          'active:bg-white/10',
        ],
        ghost: [
          'bg-transparent',
          'text-white',
          'shadow-none',
          'hover:bg-white/10',
          'hover:shadow-md',
          'active:bg-white/15',
        ],
        danger: [
          // Red gradient with glow
          'bg-gradient-to-br from-red-500 to-red-600',
          'text-white',
          'hover:from-red-600 hover:to-red-700',
          'hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]', // Red glow
          'hover:-translate-y-0.5',
          'active:from-red-700 active:to-red-800',
          'focus-visible:ring-red-500/50',
        ],
        success: [
          // Green gradient with glow
          'bg-gradient-to-br from-emerald-500 to-emerald-600',
          'text-white',
          'hover:from-emerald-600 hover:to-emerald-700',
          'hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]', // Green glow
          'hover:-translate-y-0.5',
          'active:from-emerald-700 active:to-emerald-800',
          'focus-visible:ring-emerald-500/50',
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
