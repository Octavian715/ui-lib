import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  // Base styles - consistent across all variants
  [
    'inline-flex items-center justify-center',
    'font-medium',
    'rounded-lg',
    'border-2',
    'transition-all duration-200',
    'outline-none',
    // Focus styles
    'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',
    // Disabled styles
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    // Active state
    'active:scale-[0.98]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-600',
          'text-white',
          'border-primary-600',
          'hover:bg-primary-700',
          'hover:border-primary-700',
          'hover:shadow-md',
          'active:bg-primary-800',
        ],
        secondary: [
          'bg-neutral-800',
          'text-white',
          'border-neutral-700',
          'hover:bg-neutral-700',
          'hover:border-neutral-600',
          'hover:shadow-md',
          'active:bg-neutral-600',
        ],
        outline: [
          'bg-transparent',
          'text-white',
          'border-neutral-600',
          'hover:bg-neutral-800',
          'hover:border-neutral-500',
          'active:bg-neutral-700',
        ],
        ghost: [
          'bg-transparent',
          'text-white',
          'border-transparent',
          'hover:bg-neutral-800',
          'hover:border-neutral-700',
          'active:bg-neutral-700',
        ],
        danger: [
          'bg-error-600',
          'text-white',
          'border-error-600',
          'hover:bg-error-700',
          'hover:border-error-700',
          'hover:shadow-md',
          'active:bg-error-800',
          'focus-visible:ring-error-500',
        ],
        success: [
          'bg-success-600',
          'text-white',
          'border-success-600',
          'hover:bg-success-700',
          'hover:border-success-700',
          'hover:shadow-md',
          'active:bg-success-800',
          'focus-visible:ring-success-500',
        ],
      },
      size: {
        sm: ['text-sm', 'h-8', 'px-3', 'gap-1.5'],
        md: ['text-base', 'h-10', 'px-4', 'gap-2'],
        lg: ['text-lg', 'h-12', 'px-6', 'gap-2.5'],
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
