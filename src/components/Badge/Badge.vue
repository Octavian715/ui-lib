<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center justify-center font-bold transition-all duration-500 transform-gpu',
  {
    variants: {
      variant: {
        default: 'bg-neutral-800/60 backdrop-blur-xl text-white border border-white/20 shadow-lg',
        primary: 'bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 text-white shadow-[0_0_20px_rgba(255,0,110,0.6)] border border-primary-500/20 hover:scale-110 hover:shadow-[0_0_30px_rgba(255,0,110,0.8)]',
        success: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.6)] border border-emerald-500/20 hover:scale-110',
        warning: 'bg-gradient-to-br from-amber-500 via-amber-600 to-accent-orange-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.6)] border border-amber-500/20 hover:scale-110',
        danger: 'bg-gradient-to-br from-red-500 via-red-600 to-accent-orange-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] border border-red-500/20 hover:scale-110',
        info: 'bg-gradient-to-br from-accent-blue-500 via-secondary-500 to-primary-500 text-white shadow-[0_0_20px_rgba(58,134,255,0.6)] border border-accent-blue-500/20 hover:scale-110',
        outline: 'border-2 border-primary-500/40 text-primary-400 bg-primary-500/10 backdrop-blur-xl hover:bg-primary-500/20 hover:border-primary-500/60 hover:shadow-[0_0_20px_rgba(255,0,110,0.4)]',
      },
      size: {
        sm: 'px-3 py-1 text-xs rounded-xl',
        md: 'px-4 py-1.5 text-sm rounded-2xl',
        lg: 'px-5 py-2 text-base rounded-2xl',
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
