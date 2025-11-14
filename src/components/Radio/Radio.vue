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
        :aria-describedby="error && errorMessage ? `${inputId}-error` : undefined"
        v-bind="$attrs"
      />
      <span :class="customRadioClass">
        <span :class="dotClass" />
      </span>
      <span v-if="label || $slots.default" :class="labelClass">
        <slot>{{ label }}</slot>
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
  hint?: string
  errorMessage?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  error?: boolean
  class?: string
}

const props = withDefaults(defineProps<RadioProps>(), {
  size: 'md',
  disabled: false,
  required: false,
  error: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
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
    }
  },
})

const wrapperClass = computed(() => cn('w-full', props.class))

const labelWrapperClass = computed(() =>
  cn(
    'relative flex items-start gap-3',
    props.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
  )
)

const radioClass = computed(() =>
  cn('sr-only peer')
)

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
    'peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-indigo-600',
    'peer-checked:border-primary-500',
    // Focus ring
    'peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-neutral-950',
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
    'transition-transform duration-200',
    sizeClasses[props.size]
  )
})

const labelClass = computed(() => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return cn(
    'text-neutral-200 select-none',
    'peer-checked:text-white',
    sizeClasses[props.size]
  )
})

const hintClass = computed(() =>
  cn('mt-1.5 ml-8 text-sm text-neutral-400')
)

const errorClass = computed(() =>
  cn('mt-1.5 ml-8 text-sm text-error-500 flex items-center gap-1')
)
</script>
