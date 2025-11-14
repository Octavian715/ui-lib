<template>
  <div :class="wrapperClass">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-300 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative">
      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
          class="text-gray-400 hover:text-gray-300 transition-colors"
          @click="clearInput"
        >
          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
        <slot v-else name="suffix" />
      </div>
    </div>

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
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-4 text-lg',
  }

  return cn(
    'block w-full rounded-lg border transition-colors bg-secondary-800 text-white placeholder-gray-500',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-900',
    props.error
      ? 'border-red-500 focus:border-red-500'
      : 'border-secondary-700 hover:border-secondary-600 focus:border-primary-500',
    props.disabled && 'opacity-50 cursor-not-allowed bg-secondary-800/50',
    props.readonly && 'cursor-default',
    sizeClasses[props.size],
    'has-[prefix]:pl-10',
    'has-[suffix]:pr-10'
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
