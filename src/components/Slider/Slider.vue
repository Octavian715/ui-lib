<template>
  <div :class="wrapperClass">
    <label v-if="label" :for="sliderId" :class="labelClass">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div :class="sliderContainerClass">
      <!-- Track -->
      <div :class="trackClass">
        <!-- Filled track -->
        <div :class="fillClass" :style="fillStyle" />

        <!-- Marks -->
        <div v-if="marks && marksArray.length > 0" :class="marksContainerClass">
          <div
            v-for="mark in marksArray"
            :key="mark.value"
            :class="getMarkClass(mark.value)"
            :style="getMarkStyle(mark.value)"
          >
            <span v-if="showMarkLabels" :class="markLabelClass">
              {{ mark.label || mark.value }}
            </span>
          </div>
        </div>
      </div>

      <!-- Thumb(s) -->
      <div
        v-if="!range"
        ref="thumb"
        :class="thumbClass"
        :style="{ left: `${singleThumbPosition}%` }"
        role="slider"
        :aria-valuenow="singleValue"
        :aria-valuemin="min"
        :aria-valuemax="max"
        :aria-disabled="disabled"
        :tabindex="disabled ? -1 : 0"
        @mousedown="handleSingleMouseDown"
        @touchstart="handleSingleTouchStart"
        @keydown="handleSingleKeyDown"
      >
        <span v-if="showValue" :class="valueTooltipClass">{{ formatValue(singleValue) }}</span>
      </div>

      <template v-else>
        <div
          ref="thumbStart"
          :class="thumbClass"
          :style="{ left: `${rangeStartPosition}%` }"
          role="slider"
          :aria-valuenow="rangeStart"
          :aria-valuemin="min"
          :aria-valuemax="rangeEnd"
          :aria-disabled="disabled"
          :tabindex="disabled ? -1 : 0"
          @mousedown="handleRangeStartMouseDown"
          @touchstart="handleRangeStartTouchStart"
          @keydown="(e) => handleRangeKeyDown(e, 'start')"
        >
          <span v-if="showValue" :class="valueTooltipClass">{{ formatValue(rangeStart) }}</span>
        </div>

        <div
          ref="thumbEnd"
          :class="thumbClass"
          :style="{ left: `${rangeEndPosition}%` }"
          role="slider"
          :aria-valuenow="rangeEnd"
          :aria-valuemin="rangeStart"
          :aria-valuemax="max"
          :aria-disabled="disabled"
          :tabindex="disabled ? -1 : 0"
          @mousedown="handleRangeEndMouseDown"
          @touchstart="handleRangeEndTouchStart"
          @keydown="(e) => handleRangeKeyDown(e, 'end')"
        >
          <span v-if="showValue" :class="valueTooltipClass">{{ formatValue(rangeEnd) }}</span>
        </div>
      </template>
    </div>

    <!-- Min/Max labels -->
    <div v-if="showMinMax" :class="minMaxClass">
      <span class="text-xs text-neutral-400">{{ formatValue(min) }}</span>
      <span class="text-xs text-neutral-400">{{ formatValue(max) }}</span>
    </div>

    <p v-if="hint && !error" :class="hintClass">{{ hint }}</p>
    <p v-if="error && errorMessage" :class="errorClass">
      <svg class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '@/utils/cn'

interface Mark {
  value: number
  label?: string
}

interface SliderProps {
  modelValue?: number | [number, number]
  min?: number
  max?: number
  step?: number
  range?: boolean
  label?: string
  hint?: string
  errorMessage?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  disabled?: boolean
  required?: boolean
  error?: boolean
  showValue?: boolean
  showMinMax?: boolean
  marks?: boolean | Mark[]
  showMarkLabels?: boolean
  formatValue?: (value: number) => string
  class?: string
}

const props = withDefaults(defineProps<SliderProps>(), {
  min: 0,
  max: 100,
  step: 1,
  range: false,
  size: 'md',
  color: 'primary',
  disabled: false,
  required: false,
  error: false,
  showValue: false,
  showMinMax: false,
  marks: false,
  showMarkLabels: false,
  formatValue: (value: number) => value.toString(),
})

const emit = defineEmits<{
  'update:modelValue': [value: number | [number, number]]
  change: [value: number | [number, number]]
}>()

const sliderId = ref(`slider-${Math.random().toString(36).substring(2, 9)}`)
const isDragging = ref(false)

// Single value mode
const singleValue = computed(() => {
  if (props.range) return props.min
  return typeof props.modelValue === 'number' ? props.modelValue : props.min
})

// Range mode
const rangeStart = computed(() => {
  if (!props.range || !Array.isArray(props.modelValue)) return props.min
  return props.modelValue[0]
})

const rangeEnd = computed(() => {
  if (!props.range || !Array.isArray(props.modelValue)) return props.max
  return props.modelValue[1]
})

// Positions
const singleThumbPosition = computed(() => {
  return ((singleValue.value - props.min) / (props.max - props.min)) * 100
})

const rangeStartPosition = computed(() => {
  return ((rangeStart.value - props.min) / (props.max - props.min)) * 100
})

const rangeEndPosition = computed(() => {
  return ((rangeEnd.value - props.min) / (props.max - props.min)) * 100
})

// Fill style
const fillStyle = computed(() => {
  if (props.range) {
    return {
      left: `${rangeStartPosition.value}%`,
      width: `${rangeEndPosition.value - rangeStartPosition.value}%`,
    }
  }
  return {
    left: '0%',
    width: `${singleThumbPosition.value}%`,
  }
})

// Marks
const marksArray = computed<Mark[]>(() => {
  if (!props.marks) return []
  if (Array.isArray(props.marks)) return props.marks

  // Auto-generate marks
  const marks: Mark[] = []
  const range = props.max - props.min
  const stepCount = Math.min(10, Math.floor(range / props.step))
  const markStep = range / stepCount

  for (let i = 0; i <= stepCount; i++) {
    marks.push({ value: props.min + i * markStep })
  }
  return marks
})

const getMarkStyle = (value: number) => {
  const position = ((value - props.min) / (props.max - props.min)) * 100
  return { left: `${position}%` }
}

const getMarkClass = (value: number) => {
  const isActive = props.range
    ? value >= rangeStart.value && value <= rangeEnd.value
    : value <= singleValue.value

  return cn(
    'absolute w-1 h-1 rounded-full -translate-x-1/2',
    'transition-colors duration-200',
    isActive ? colorClasses.value.mark : 'bg-neutral-700'
  )
}

// Color classes
const colorClasses = computed(() => {
  const colors = {
    primary: {
      fill: 'bg-gradient-to-r from-blue-600 to-indigo-600',
      thumb: 'bg-gradient-to-r from-blue-600 to-indigo-600 ring-blue-500/50',
      mark: 'bg-blue-500',
    },
    success: {
      fill: 'bg-gradient-to-r from-green-600 to-emerald-600',
      thumb: 'bg-gradient-to-r from-green-600 to-emerald-600 ring-green-500/50',
      mark: 'bg-green-500',
    },
    warning: {
      fill: 'bg-gradient-to-r from-amber-600 to-orange-600',
      thumb: 'bg-gradient-to-r from-amber-600 to-orange-600 ring-amber-500/50',
      mark: 'bg-amber-500',
    },
    danger: {
      fill: 'bg-gradient-to-r from-red-600 to-rose-600',
      thumb: 'bg-gradient-to-r from-red-600 to-rose-600 ring-red-500/50',
      mark: 'bg-red-500',
    },
    info: {
      fill: 'bg-gradient-to-r from-cyan-600 to-blue-600',
      thumb: 'bg-gradient-to-r from-cyan-600 to-blue-600 ring-cyan-500/50',
      mark: 'bg-cyan-500',
    },
  }
  return colors[props.color]
})

// Utilities
const clampValue = (value: number) => {
  const stepped = Math.round(value / props.step) * props.step
  return Math.max(props.min, Math.min(props.max, stepped))
}

const getValueFromPosition = (clientX: number, rect: DOMRect) => {
  const percentage = (clientX - rect.left) / rect.width
  const rawValue = props.min + percentage * (props.max - props.min)
  return clampValue(rawValue)
}

// Single value handlers
const handleSingleMouseDown = (e: MouseEvent) => {
  if (props.disabled) return
  e.preventDefault()
  isDragging.value = true

  const handleMouseMove = (e: MouseEvent) => {
    const track = (e.currentTarget as HTMLElement)?.parentElement?.querySelector('[role="slider"]')?.parentElement
    if (!track) return
    const rect = track.getBoundingClientRect()
    const newValue = getValueFromPosition(e.clientX, rect)
    emit('update:modelValue', newValue)
  }

  const handleMouseUp = () => {
    isDragging.value = false
    emit('change', singleValue.value)
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleSingleTouchStart = (e: TouchEvent) => {
  if (props.disabled) return
  e.preventDefault()
  isDragging.value = true

  const handleTouchMove = (e: TouchEvent) => {
    const track = (e.target as HTMLElement)?.parentElement
    if (!track) return
    const rect = track.getBoundingClientRect()
    const newValue = getValueFromPosition(e.touches[0].clientX, rect)
    emit('update:modelValue', newValue)
  }

  const handleTouchEnd = () => {
    isDragging.value = false
    emit('change', singleValue.value)
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }

  document.addEventListener('touchmove', handleTouchMove)
  document.addEventListener('touchend', handleTouchEnd)
}

const handleSingleKeyDown = (e: KeyboardEvent) => {
  if (props.disabled) return

  let newValue = singleValue.value
  switch (e.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      e.preventDefault()
      newValue = clampValue(singleValue.value - props.step)
      break
    case 'ArrowRight':
    case 'ArrowUp':
      e.preventDefault()
      newValue = clampValue(singleValue.value + props.step)
      break
    case 'Home':
      e.preventDefault()
      newValue = props.min
      break
    case 'End':
      e.preventDefault()
      newValue = props.max
      break
    default:
      return
  }

  emit('update:modelValue', newValue)
  emit('change', newValue)
}

// Range handlers
const handleRangeStartMouseDown = (e: MouseEvent) => {
  if (props.disabled) return
  e.preventDefault()
  isDragging.value = true

  const handleMouseMove = (e: MouseEvent) => {
    const track = (e.currentTarget as HTMLElement)?.parentElement
    if (!track) return
    const rect = track.getBoundingClientRect()
    const newValue = Math.min(getValueFromPosition(e.clientX, rect), rangeEnd.value)
    emit('update:modelValue', [newValue, rangeEnd.value])
  }

  const handleMouseUp = () => {
    isDragging.value = false
    emit('change', [rangeStart.value, rangeEnd.value])
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleRangeEndMouseDown = (e: MouseEvent) => {
  if (props.disabled) return
  e.preventDefault()
  isDragging.value = true

  const handleMouseMove = (e: MouseEvent) => {
    const track = (e.currentTarget as HTMLElement)?.parentElement
    if (!track) return
    const rect = track.getBoundingClientRect()
    const newValue = Math.max(getValueFromPosition(e.clientX, rect), rangeStart.value)
    emit('update:modelValue', [rangeStart.value, newValue])
  }

  const handleMouseUp = () => {
    isDragging.value = false
    emit('change', [rangeStart.value, rangeEnd.value])
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleRangeStartTouchStart = (e: TouchEvent) => {
  if (props.disabled) return
  e.preventDefault()
  isDragging.value = true

  const handleTouchMove = (e: TouchEvent) => {
    const track = (e.target as HTMLElement)?.parentElement
    if (!track) return
    const rect = track.getBoundingClientRect()
    const newValue = Math.min(getValueFromPosition(e.touches[0].clientX, rect), rangeEnd.value)
    emit('update:modelValue', [newValue, rangeEnd.value])
  }

  const handleTouchEnd = () => {
    isDragging.value = false
    emit('change', [rangeStart.value, rangeEnd.value])
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }

  document.addEventListener('touchmove', handleTouchMove)
  document.addEventListener('touchend', handleTouchEnd)
}

const handleRangeEndTouchStart = (e: TouchEvent) => {
  if (props.disabled) return
  e.preventDefault()
  isDragging.value = true

  const handleTouchMove = (e: TouchEvent) => {
    const track = (e.target as HTMLElement)?.parentElement
    if (!track) return
    const rect = track.getBoundingClientRect()
    const newValue = Math.max(getValueFromPosition(e.touches[0].clientX, rect), rangeStart.value)
    emit('update:modelValue', [rangeStart.value, newValue])
  }

  const handleTouchEnd = () => {
    isDragging.value = false
    emit('change', [rangeStart.value, rangeEnd.value])
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }

  document.addEventListener('touchmove', handleTouchMove)
  document.addEventListener('touchend', handleTouchEnd)
}

const handleRangeKeyDown = (e: KeyboardEvent, thumb: 'start' | 'end') => {
  if (props.disabled) return

  let newStart = rangeStart.value
  let newEnd = rangeEnd.value

  if (thumb === 'start') {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault()
        newStart = clampValue(Math.max(rangeStart.value - props.step, props.min))
        break
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault()
        newStart = clampValue(Math.min(rangeStart.value + props.step, rangeEnd.value))
        break
      case 'Home':
        e.preventDefault()
        newStart = props.min
        break
      case 'End':
        e.preventDefault()
        newStart = rangeEnd.value
        break
      default:
        return
    }
  } else {
    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault()
        newEnd = clampValue(Math.max(rangeEnd.value - props.step, rangeStart.value))
        break
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault()
        newEnd = clampValue(Math.min(rangeEnd.value + props.step, props.max))
        break
      case 'Home':
        e.preventDefault()
        newEnd = rangeStart.value
        break
      case 'End':
        e.preventDefault()
        newEnd = props.max
        break
      default:
        return
    }
  }

  emit('update:modelValue', [newStart, newEnd])
  emit('change', [newStart, newEnd])
}

// Classes
const wrapperClass = computed(() => cn('w-full space-y-2', props.class))

const labelClass = computed(() =>
  cn('block text-sm font-medium text-neutral-200')
)

const sliderContainerClass = computed(() => {
  const sizeClasses = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8',
  }

  return cn(
    'relative flex items-center',
    sizeClasses[props.size],
    props.disabled && 'opacity-50 cursor-not-allowed'
  )
})

const trackClass = computed(() => {
  const sizeClasses = {
    sm: 'h-1.5 md:h-1', // Thicker on mobile
    md: 'h-2 md:h-1.5',
    lg: 'h-2.5 md:h-2',
  }

  return cn(
    'relative w-full rounded-full',
    'bg-neutral-800',
    props.error ? 'bg-red-900/30' : '',
    sizeClasses[props.size]
  )
})

const fillClass = computed(() =>
  cn(
    'absolute h-full rounded-full',
    'transition-all duration-150',
    colorClasses.value.fill,
    props.disabled && 'opacity-50'
  )
)

const thumbClass = computed(() => {
  const sizeClasses = {
    sm: 'h-5 w-5 md:h-4 md:w-4', // Larger on mobile for better touch targets
    md: 'h-6 w-6 md:h-5 md:w-5',
    lg: 'h-7 w-7 md:h-6 md:w-6',
  }

  return cn(
    'absolute top-1/2 -translate-y-1/2 -translate-x-1/2',
    'rounded-full border-2 border-white shadow-lg',
    'transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-950',
    colorClasses.value.thumb,
    // Better touch feedback
    !props.disabled && 'cursor-grab active:cursor-grabbing active:scale-110 md:hover:scale-110',
    props.disabled && 'cursor-not-allowed opacity-50',
    // Larger hit area on mobile
    'before:content-[""] before:absolute before:inset-[-8px] before:rounded-full md:before:inset-[-4px]',
    sizeClasses[props.size]
  )
})

const valueTooltipClass = computed(() =>
  cn(
    'absolute -top-8 left-1/2 -translate-x-1/2',
    'px-2 py-1 rounded text-xs font-medium',
    'bg-neutral-900 text-white border border-white/10',
    'whitespace-nowrap pointer-events-none',
    // Show on mobile always when showValue is true, on desktop show on hover/drag
    'md:opacity-0 md:group-hover:opacity-100',
    isDragging.value && 'opacity-100',
    'transition-opacity duration-200',
    // Mobile: always visible when dragging or when prop is set
    'opacity-100 md:opacity-0'
  )
)

const marksContainerClass = computed(() => cn('absolute inset-0'))

const markLabelClass = computed(() =>
  cn(
    'absolute top-4 left-1/2 -translate-x-1/2',
    'text-xs text-neutral-500 whitespace-nowrap'
  )
)

const minMaxClass = computed(() =>
  cn('flex justify-between px-1')
)

const hintClass = computed(() =>
  cn('text-sm text-neutral-400')
)

const errorClass = computed(() =>
  cn('text-sm text-error-500 flex items-center gap-1')
)
</script>
