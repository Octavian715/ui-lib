<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center justify-center font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-secondary-700 text-white',
        primary: 'bg-primary-500 text-white',
        success: 'bg-green-600 text-white',
        warning: 'bg-yellow-600 text-white',
        danger: 'bg-red-600 text-white',
        info: 'bg-blue-600 text-white',
        outline: 'border-2 border-secondary-600 text-white bg-transparent',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs rounded',
        md: 'px-2.5 py-1 text-sm rounded-md',
        lg: 'px-3 py-1.5 text-base rounded-lg',
      },
      rounded: {
        true: 'rounded-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: false,
    },
  }
)

interface BadgeProps extends /* @vue-ignore */ VariantProps<typeof badgeVariants> {
  class?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default',
  size: 'md',
  rounded: false,
})

const badgeClass = computed(() =>
  badgeVariants({
    variant: props.variant,
    size: props.size,
    rounded: props.rounded,
    class: props.class,
  })
)
</script>
