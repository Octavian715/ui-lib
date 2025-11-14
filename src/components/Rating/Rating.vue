<template>
  <div :class="wrapperClass">
    <div class="flex items-center gap-1">
      <button
        v-for="star in max"
        :key="star"
        type="button"
        :class="getStarClass(star)"
        :disabled="disabled || readonly"
        @click="handleClick(star)"
        @mouseenter="handleMouseEnter(star)"
        @mouseleave="handleMouseLeave"
      >
        <svg
          :class="starIconClass"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <span v-if="showValue" :class="valueClass">
      {{ displayValue }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '@/utils/cn'

interface RatingProps {
  modelValue: number
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'yellow' | 'orange' | 'red' | 'blue' | 'green'
  disabled?: boolean
  readonly?: boolean
  showValue?: boolean
  precision?: number
  class?: string
}

const props = withDefaults(defineProps<RatingProps>(), {
  max: 5,
  size: 'md',
  color: 'yellow',
  disabled: false,
  readonly: false,
  showValue: false,
  precision: 1,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()

const hoverValue = ref<number | null>(null)

const activeValue = computed(() => hoverValue.value ?? props.modelValue)

const displayValue = computed(() => {
  if (props.precision === 0.5) {
    return props.modelValue.toFixed(1)
  }
  return props.modelValue.toFixed(0)
})

const getStarClass = (star: number) => {
  const isActive = star <= activeValue.value
  const isHovering = hoverValue.value !== null

  const colorClasses = {
    yellow: isActive ? 'text-yellow-400' : 'text-neutral-700',
    orange: isActive ? 'text-orange-400' : 'text-neutral-700',
    red: isActive ? 'text-red-400' : 'text-neutral-700',
    blue: isActive ? 'text-blue-400' : 'text-neutral-700',
    green: isActive ? 'text-emerald-400' : 'text-neutral-700',
  }

  return cn(
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50 rounded',
    !props.disabled && !props.readonly && 'hover:scale-110 cursor-pointer',
    props.disabled && 'opacity-50 cursor-not-allowed',
    props.readonly && 'cursor-default',
    isHovering && !props.disabled && !props.readonly && 'scale-110',
    colorClasses[props.color]
  )
}

const handleClick = (star: number) => {
  if (props.disabled || props.readonly) return

  let value = star
  if (props.precision === 0.5) {
    // For half-star precision, clicking the same star toggles between .5 and full
    if (Math.floor(props.modelValue) === star && props.modelValue !== star) {
      value = star
    } else if (props.modelValue === star) {
      value = star - 0.5
    }
  }

  emit('update:modelValue', value)
  emit('change', value)
}

const handleMouseEnter = (star: number) => {
  if (props.disabled || props.readonly) return
  hoverValue.value = star
}

const handleMouseLeave = () => {
  hoverValue.value = null
}

const wrapperClass = computed(() =>
  cn('inline-flex items-center gap-3', props.class)
)

const starIconClass = computed(() => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
  }
  return sizeClasses[props.size]
})

const valueClass = computed(() => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  }
  return cn('font-semibold text-neutral-300', sizeClasses[props.size])
})
</script>
