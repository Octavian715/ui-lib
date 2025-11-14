<template>
  <div :class="wrapperClass">
    <label :class="labelWrapperClass">
      <input
        :id="inputId"
        v-model="checked"
        type="checkbox"
        :disabled="disabled"
        :required="required"
        :class="checkboxClass"
        :aria-describedby="error && errorMessage ? `${inputId}-error` : undefined"
        v-bind="$attrs"
      />
      <span v-if="label || $slots.default" :class="labelTextClass">
        <slot>{{ label }}</slot>
      </span>
    </label>

    <p
      v-if="error && errorMessage"
      :id="`${inputId}-error`"
      class="mt-1.5 text-sm text-error-500 flex items-center gap-1"
    >
      <svg class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
      {{ errorMessage }}
    </p>

    <p
      v-else-if="hint"
      class="mt-1.5 text-sm text-neutral-400"
    >
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '@/utils/cn'

interface CheckboxProps {
  modelValue?: boolean
  label?: string
  hint?: string
  errorMessage?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  error?: boolean
  class?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  size: 'md',
  disabled: false,
  required: false,
  error: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

defineOptions({
  inheritAttrs: false,
})

const inputId = ref(`checkbox-${Math.random().toString(36).substr(2, 9)}`)

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value ?? false),
})

const wrapperClass = computed(() => cn('w-full', props.class))

const labelWrapperClass = computed(() =>
  cn(
    'flex items-start gap-2.5 cursor-pointer',
    props.disabled && 'cursor-not-allowed opacity-50'
  )
)

const checkboxClass = computed(() => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  return cn(
    // Base styles
    'rounded border-2 cursor-pointer transition-all duration-200',
    'outline-none',

    // Focus styles
    'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900',

    // Border and background
    props.error
      ? 'border-error-500 bg-error-500/10'
      : 'border-neutral-600 bg-neutral-900',

    // Checked state
    'checked:bg-primary-600 checked:border-primary-600',
    'checked:hover:bg-primary-700 checked:hover:border-primary-700',

    // Hover state
    'hover:border-neutral-500',

    // Disabled state
    'disabled:cursor-not-allowed disabled:opacity-50',

    sizeClasses[props.size]
  )
})

const labelTextClass = computed(() => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return cn(
    'text-white select-none',
    sizeClasses[props.size]
  )
})
</script>
