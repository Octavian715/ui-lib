import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: [
          'bg-white',
          'text-black',
          'hover:bg-gray-100',
          'focus:ring-white',
          'border border-transparent'
        ],
        secondary: [
          'bg-secondary-800',
          'text-white',
          'hover:bg-secondary-700',
          'focus:ring-secondary-600',
          'border border-secondary-700'
        ],
        outline: [
          'bg-transparent',
          'text-white',
          'border border-secondary-700',
          'hover:bg-secondary-800',
          'focus:ring-secondary-600'
        ],
        ghost: [
          'bg-transparent',
          'text-white',
          'hover:bg-secondary-800',
          'focus:ring-secondary-600'
        ],
        danger: [
          'bg-red-600',
          'text-white',
          'hover:bg-red-700',
          'focus:ring-red-500',
          'border border-transparent'
        ],
        success: [
          'bg-green-600',
          'text-white',
          'hover:bg-green-700',
          'focus:ring-green-500',
          'border border-transparent'
        ]
      },
      size: {
        sm: ['text-sm', 'py-1.5', 'px-3', 'h-8'],
        md: ['text-base', 'py-2', 'px-4', 'h-10'],
        lg: ['text-lg', 'py-3', 'px-6', 'h-12'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export type ButtonVariantProps = VariantProps<typeof buttonVariants>
