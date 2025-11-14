<template>
  <div :class="wrapperClass">
    <svg
      :class="spinnerClass"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span v-if="label" :class="labelClass">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'white' | 'secondary' | 'success' | 'danger'
  label?: string
  center?: boolean
  class?: string
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'md',
  variant: 'primary',
  center: false,
})

const wrapperClass = computed(() =>
  cn(
    'inline-flex items-center gap-3',
    props.center && 'justify-center w-full',
    props.class
  )
)

const spinnerClass = computed(() => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  }

  const variantClasses = {
    primary: 'text-primary-500',
    white: 'text-white',
    secondary: 'text-secondary-400',
    success: 'text-green-500',
    danger: 'text-red-500',
  }

  return cn(
    'animate-spin',
    sizeClasses[props.size],
    variantClasses[props.variant]
  )
})

const labelClass = computed(() => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }

  const variantClasses = {
    primary: 'text-primary-500',
    white: 'text-white',
    secondary: 'text-secondary-400',
    success: 'text-green-500',
    danger: 'text-red-500',
  }

  return cn(
    'font-medium',
    sizeClasses[props.size],
    variantClasses[props.variant]
  )
})
</script>
