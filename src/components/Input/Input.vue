<template>
  <div :class="wrapperClass">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-neutral-300 mb-1.5"
    >
      {{ label }}
      <span v-if="required" class="text-error-500 ml-1">*</span>
    </label>

    <div class="relative">
      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400">
        <slot name="prefix" />
      </div>

      <input
        :id="inputId"
        v-model="inputValue"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="inputClass"
        :aria-invalid="error"
        :aria-describedby="error && errorMessage ? `${inputId}-error` : undefined"
        v-bind="$attrs"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <div v-if="$slots.suffix || clearable && inputValue" class="absolute inset-y-0 right-0 flex items-center pr-3">
        <button
          v-if="clearable && inputValue && !disabled"
          type="button"
          class="text-neutral-400 hover:text-neutral-300 transition-colors duration-150 focus:outline-none focus-visible:text-primary-500"
          aria-label="Clear input"
          @click="clearInput"
        >
          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        <div v-else class="text-neutral-400">
          <slot name="suffix" />
        </div>
      </div>
    </div>

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
import { computed, ref, useSlots } from 'vue'
import { cn } from '@/utils/cn'

const slots = useSlots()

interface InputProps {
  modelValue?: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  label?: string
  placeholder?: string
  hint?: string
  errorMessage?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: boolean
  clearable?: boolean
  class?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
}>()

defineOptions({
  inheritAttrs: false,
})

const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value ?? ''),
})

const wrapperClass = computed(() => cn('w-full', props.class))

const inputClass = computed(() => {
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-5 text-lg',
  }

  return cn(
    // Modern input with subtle glass effect
    'block w-full',
    'rounded-xl border',
    'bg-neutral-800/50 backdrop-blur-sm',
    'text-white placeholder-neutral-500',
    'outline-none',
    'transition-all duration-250',

    // Focus styles - Purple glow
    'focus:ring-3 focus:ring-primary-500/50 focus:ring-offset-0',
    'focus:bg-neutral-800/70',

    // Border colors
    props.error
      ? 'border-red-500 focus:border-red-400'
      : 'border-white/10 hover:border-white/20 focus:border-primary-500/50',

    // States
    props.disabled && 'opacity-40 cursor-not-allowed bg-neutral-900/30 hover:border-white/10',
    props.readonly && 'cursor-default bg-neutral-800/30',

    // Padding adjustments for icons
    slots.prefix && 'pl-10',
    (slots.suffix || props.clearable) && 'pr-10',

    sizeClasses[props.size]
  )
})

const handleInput = (event: Event) => {
  emit('input', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const clearInput = () => {
  emit('update:modelValue', '')
}
</script>
