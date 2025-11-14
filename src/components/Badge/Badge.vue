<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-250 shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-neutral-700/80 backdrop-blur-sm text-white border border-white/10',
        primary: 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]',
        success: 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]',
        warning: 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-[0_0_12px_rgba(245,158,11,0.3)]',
        danger: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]',
        info: 'bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.3)]',
        outline: 'border-2 border-white/30 text-white bg-transparent backdrop-blur-sm',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-xs rounded-lg',
        md: 'px-3 py-1 text-sm rounded-xl',
        lg: 'px-4 py-1.5 text-base rounded-xl',
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
