<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-neutral-800/60 backdrop-blur-sm text-white border border-white/20',
        primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border border-blue-500/20 hover:scale-105',
        success: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border border-emerald-500/20 hover:scale-105',
        warning: 'bg-gradient-to-r from-amber-600 to-orange-600 text-white border border-amber-500/20 hover:scale-105',
        danger: 'bg-gradient-to-r from-red-600 to-rose-600 text-white border border-red-500/20 hover:scale-105',
        info: 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border border-cyan-500/20 hover:scale-105',
        outline: 'border-2 border-blue-500/40 text-blue-400 bg-blue-500/10 backdrop-blur-sm hover:bg-blue-500/20 hover:border-blue-500/60',
      },
      size: {
        sm: 'px-2.5 py-0.5 text-xs rounded-md',
        md: 'px-3 py-1 text-sm rounded-lg',
        lg: 'px-4 py-1.5 text-base rounded-lg',
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
