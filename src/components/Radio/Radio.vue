<template>
  <div :class="wrapperClass">
    <label :class="labelWrapperClass">
      <input
        :id="inputId"
        v-model="checkedValue"
        type="radio"
        :name="name"
        :value="value"
        :disabled="disabled"
        :required="required"
        :class="radioClass"
        :aria-describedby="error && errorMessage ? `${inputId}-error` : description ? `${inputId}-description` : undefined"
        v-bind="$attrs"
      />

      <!-- Custom Radio Indicator -->
      <span v-if="variant === 'default'" :class="customRadioClass">
        <span :class="dotClass" />
      </span>

      <!-- Label & Description -->
      <span v-if="label || description || $slots.default || $slots.description" :class="contentWrapperClass">
        <span v-if="label || $slots.default" :class="labelClass">
          <slot>{{ label }}</slot>
        </span>
        <span v-if="description || $slots.description" :id="`${inputId}-description`" :class="descriptionClass">
          <slot name="description">{{ description }}</slot>
        </span>
      </span>

      <!-- Icon slot for card variant -->
      <span v-if="$slots.icon && variant === 'card'" :class="iconClass">
        <slot name="icon" />
      </span>
    </label>

    <p v-if="hint && !error" :class="hintClass">
      {{ hint }}
    </p>

    <p
      v-if="error && errorMessage"
      :id="`${inputId}-error`"
      :class="errorClass"
    >
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

interface RadioProps {
  modelValue?: string | number | boolean
  value: string | number | boolean
  name?: string
  label?: string
  description?: string
  hint?: string
  errorMessage?: string
  variant?: 'default' | 'card' | 'button'
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  disabled?: boolean
  required?: boolean
  error?: boolean
  class?: string
}

const props = withDefaults(defineProps<RadioProps>(), {
  variant: 'default',
  size: 'md',
  color: 'primary',
  disabled: false,
  required: false,
  error: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
  change: [value: string | number | boolean]
}>()

defineOptions({
  inheritAttrs: false,
})

const inputId = ref(`radio-${Math.random().toString(36).substring(2, 9)}`)

const checkedValue = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (value !== undefined) {
      emit('update:modelValue', value)
      emit('change', value)
    }
  },
})

const colorClasses = computed(() => {
  const colors = {
    primary: {
      border: 'peer-checked:border-primary-500',
      bg: 'peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-indigo-600',
      ring: 'peer-focus-visible:ring-primary-500/50',
      cardBorder: 'peer-checked:border-primary-500/50',
      cardBg: 'peer-checked:bg-primary-500/10',
    },
    success: {
      border: 'peer-checked:border-green-500',
      bg: 'peer-checked:bg-gradient-to-r peer-checked:from-green-600 peer-checked:to-emerald-600',
      ring: 'peer-focus-visible:ring-green-500/50',
      cardBorder: 'peer-checked:border-green-500/50',
      cardBg: 'peer-checked:bg-green-500/10',
    },
    warning: {
      border: 'peer-checked:border-amber-500',
      bg: 'peer-checked:bg-gradient-to-r peer-checked:from-amber-600 peer-checked:to-orange-600',
      ring: 'peer-focus-visible:ring-amber-500/50',
      cardBorder: 'peer-checked:border-amber-500/50',
      cardBg: 'peer-checked:bg-amber-500/10',
    },
    danger: {
      border: 'peer-checked:border-red-500',
      bg: 'peer-checked:bg-gradient-to-r peer-checked:from-red-600 peer-checked:to-rose-600',
      ring: 'peer-focus-visible:ring-red-500/50',
      cardBorder: 'peer-checked:border-red-500/50',
      cardBg: 'peer-checked:bg-red-500/10',
    },
    info: {
      border: 'peer-checked:border-cyan-500',
      bg: 'peer-checked:bg-gradient-to-r peer-checked:from-cyan-600 peer-checked:to-blue-600',
      ring: 'peer-focus-visible:ring-cyan-500/50',
      cardBorder: 'peer-checked:border-cyan-500/50',
      cardBg: 'peer-checked:bg-cyan-500/10',
    },
  }
  return colors[props.color]
})

const wrapperClass = computed(() => cn('w-full', props.class))

const labelWrapperClass = computed(() => {
  if (props.variant === 'card') {
    return cn(
      'relative flex items-start gap-3',
      'p-4 rounded-lg border-2',
      'transition-all duration-200',
      'bg-neutral-900/30 backdrop-blur-sm',
      props.error
        ? 'border-red-500/50'
        : 'border-white/10',
      colorClasses.value.cardBorder,
      colorClasses.value.cardBg,
      props.disabled
        ? 'cursor-not-allowed opacity-50'
        : 'cursor-pointer hover:border-white/20 hover:bg-white/5',
      'peer-focus-visible:ring-2',
      colorClasses.value.ring,
      'peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-neutral-950'
    )
  }

  if (props.variant === 'button') {
    return cn(
      'relative flex items-center justify-center gap-2',
      'px-4 py-2.5 rounded-lg border-2',
      'transition-all duration-200',
      'bg-neutral-900/30 backdrop-blur-sm',
      props.error
        ? 'border-red-500/50'
        : 'border-white/10',
      colorClasses.value.cardBorder,
      colorClasses.value.cardBg,
      props.disabled
        ? 'cursor-not-allowed opacity-50'
        : 'cursor-pointer hover:border-white/20 hover:bg-white/5',
      'peer-focus-visible:ring-2',
      colorClasses.value.ring,
      'peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-neutral-950'
    )
  }

  return cn(
    'relative flex items-start gap-3',
    props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
  )
})

const radioClass = computed(() => cn('sr-only peer'))

const customRadioClass = computed(() => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  return cn(
    'relative flex items-center justify-center flex-shrink-0',
    'rounded-full border-2',
    'transition-all duration-200',
    'bg-neutral-900/50 backdrop-blur-sm',
    // Border colors
    props.error
      ? 'border-red-500/50 peer-focus:border-red-400'
      : 'border-white/20 peer-hover:border-primary-500/40 peer-focus:border-primary-500',
    // Checked state
    colorClasses.value.bg,
    colorClasses.value.border,
    // Focus ring
    'peer-focus-visible:ring-2',
    colorClasses.value.ring,
    'peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-neutral-950',
    // Disabled
    props.disabled && 'bg-neutral-900/30 peer-hover:border-white/20',
    sizeClasses[props.size]
  )
})

const dotClass = computed(() => {
  const sizeClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-2.5 w-2.5',
  }

  return cn(
    'rounded-full bg-white',
    'scale-0 peer-checked:scale-100',
    'transition-transform duration-200 ease-out',
    sizeClasses[props.size]
  )
})

const contentWrapperClass = computed(() =>
  cn(
    'flex flex-col gap-0.5',
    props.variant === 'button' && 'flex-row items-center gap-2'
  )
)

const labelClass = computed(() => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return cn(
    'text-neutral-200 select-none font-medium',
    'peer-checked:text-white',
    'transition-colors duration-200',
    sizeClasses[props.size]
  )
})

const descriptionClass = computed(() =>
  cn(
    'text-sm text-neutral-400 select-none',
    'peer-checked:text-neutral-300',
    'transition-colors duration-200'
  )
)

const iconClass = computed(() =>
  cn(
    'flex-shrink-0 text-neutral-400',
    'peer-checked:text-white',
    'transition-colors duration-200'
  )
)

const hintClass = computed(() => {
  const margin = props.variant === 'default' ? 'ml-8' : 'ml-0'
  return cn('mt-1.5 text-sm text-neutral-400', margin)
})

const errorClass = computed(() => {
  const margin = props.variant === 'default' ? 'ml-8' : 'ml-0'
  return cn('mt-1.5 text-sm text-error-500 flex items-center gap-1', margin)
})
</script>
