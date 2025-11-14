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
      class="mt-1 text-sm text-red-500"
    >
      {{ errorMessage }}
    </p>

    <p
      v-else-if="hint"
      class="mt-1 text-sm text-gray-400"
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
    'flex items-start gap-2 cursor-pointer',
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
    'rounded border-2 text-primary-500 cursor-pointer transition-all',
    'focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-900',
    props.error
      ? 'border-red-500 bg-red-500/10'
      : 'border-secondary-600 bg-secondary-800',
    'checked:bg-primary-500 checked:border-primary-500',
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
