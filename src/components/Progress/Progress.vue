<template>
  <div :class="wrapperClass">
    <div v-if="showLabel" :class="labelWrapperClass">
      <span :class="labelClass">
        {{ label }}
      </span>
      <span v-if="showPercentage" :class="percentageClass">
        {{ Math.round(normalizedValue) }}%
      </span>
    </div>

    <div :class="trackClass">
      <div
        :class="barClass"
        :style="barStyle"
        role="progressbar"
        :aria-valuenow="normalizedValue"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div v-if="animated" :class="shimmerClass" />
      </div>
    </div>

    <p v-if="hint" :class="hintClass">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const progressVariants = cva('', {
  variants: {
    variant: {
      default: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      success: 'bg-gradient-to-r from-emerald-600 to-teal-600',
      warning: 'bg-gradient-to-r from-amber-600 to-orange-600',
      danger: 'bg-gradient-to-r from-red-600 to-rose-600',
      info: 'bg-gradient-to-r from-cyan-600 to-blue-600',
    },
    size: {
      sm: 'h-1.5',
      md: 'h-2.5',
      lg: 'h-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

interface ProgressProps extends /* @vue-ignore */ VariantProps<typeof progressVariants> {
  value: number
  max?: number
  label?: string
  hint?: string
  showPercentage?: boolean
  showLabel?: boolean
  animated?: boolean
  striped?: boolean
  class?: string
}

const props = withDefaults(defineProps<ProgressProps>(), {
  max: 100,
  showPercentage: false,
  showLabel: true,
  animated: false,
  striped: false,
  variant: 'default',
  size: 'md',
})

const normalizedValue = computed(() => {
  const percentage = (props.value / props.max) * 100
  return Math.min(100, Math.max(0, percentage))
})

const wrapperClass = computed(() => cn('w-full', props.class))

const labelWrapperClass = computed(() =>
  cn('flex items-center justify-between mb-2')
)

const labelClass = computed(() =>
  cn('text-sm font-medium text-neutral-200')
)

const percentageClass = computed(() =>
  cn('text-sm font-semibold text-primary-400')
)

const trackClass = computed(() => {
  const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  }

  return cn(
    'w-full overflow-hidden rounded-full',
    'bg-neutral-900/50 backdrop-blur-sm',
    'border border-white/10',
    sizeClasses[props.size || 'md']
  )
})

const barClass = computed(() =>
  cn(
    'relative h-full transition-all duration-500 ease-out rounded-full',
    progressVariants({
      variant: props.variant,
      size: props.size,
    }),
    props.striped && 'bg-stripe',
    'shadow-lg',
    props.variant === 'default' && 'shadow-blue-500/30',
    props.variant === 'success' && 'shadow-emerald-500/30',
    props.variant === 'warning' && 'shadow-amber-500/30',
    props.variant === 'danger' && 'shadow-red-500/30',
    props.variant === 'info' && 'shadow-cyan-500/30'
  )
)

const barStyle = computed(() => ({
  width: `${normalizedValue.value}%`,
}))

const shimmerClass = computed(() =>
  cn(
    'absolute inset-0',
    'bg-gradient-to-r from-transparent via-white/20 to-transparent',
    'animate-shimmer'
  )
)

const hintClass = computed(() =>
  cn('mt-2 text-sm text-neutral-400')
)
</script>

<style scoped>
.bg-stripe {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.1) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0.1) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
