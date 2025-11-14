import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  // Base styles - Modern & refined
  [
    'relative inline-flex items-center justify-center',
    'font-semibold',
    'rounded-lg', // Moderate radius for modern look
    'border-0',
    'transition-all duration-300 ease-out',
    'outline-none',
    // Focus styles
    'focus-visible:ring-2 focus-visible:ring-primary-500/50',
    'focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950',
    // Disabled styles
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    // Active state
    'active:scale-[0.98]',
    // Transform
    'transform-gpu',
    // Text visibility
    'z-10',
  ],
  {
    variants: {
      variant: {
        primary: [
          // Modern blue gradient
          'bg-gradient-to-r from-blue-600 to-indigo-600',
          'text-white',
          'shadow-lg shadow-blue-500/30',
          'hover:shadow-xl hover:shadow-blue-500/40',
          'hover:from-blue-500 hover:to-indigo-500',
          'hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
        secondary: [
          // Purple gradient
          'bg-gradient-to-r from-purple-600 to-pink-600',
          'text-white',
          'shadow-lg shadow-purple-500/30',
          'hover:shadow-xl hover:shadow-purple-500/40',
          'hover:from-purple-500 hover:to-pink-500',
          'hover:scale-[1.02]',
          'active:scale-[0.98]',
        ],
        outline: [
          // Clean outline
          'bg-transparent',
          'text-blue-400',
          'border-2 border-blue-500/40',
          'hover:border-blue-500',
          'hover:bg-blue-500/10',
          'hover:text-blue-300',
          'shadow-none',
        ],
        ghost: [
          // Minimal ghost
          'bg-transparent',
          'text-neutral-300',
          'shadow-none',
          'hover:bg-white/10',
          'hover:text-white',
        ],
        danger: [
          // Modern red
          'bg-gradient-to-r from-red-600 to-rose-600',
          'text-white',
          'shadow-lg shadow-red-500/30',
          'hover:shadow-xl hover:shadow-red-500/40',
          'hover:from-red-500 hover:to-rose-500',
          'hover:scale-[1.02]',
          'focus-visible:ring-red-500/50',
        ],
        success: [
          // Modern green
          'bg-gradient-to-r from-emerald-600 to-teal-600',
          'text-white',
          'shadow-lg shadow-emerald-500/30',
          'hover:shadow-xl hover:shadow-emerald-500/40',
          'hover:from-emerald-500 hover:to-teal-500',
          'hover:scale-[1.02]',
          'focus-visible:ring-emerald-500/50',
        ],
      },
      size: {
        sm: ['text-sm', 'h-9', 'px-4', 'gap-2'],
        md: ['text-base', 'h-10', 'px-5', 'gap-2'],
        lg: ['text-lg', 'h-12', 'px-6', 'gap-3'],
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
