<template>
  <div :class="wrapperClass">
    <div class="relative">
      <!-- Floating Label -->
      <label
        v-if="label && floatingLabel"
        :for="inputId"
        :class="floatingLabelClass"
      >
        {{ label }}
        <span v-if="required" class="text-error-500 ml-1">*</span>
      </label>

      <!-- Static Label -->
      <label
        v-else-if="label && !floatingLabel"
        :for="inputId"
        class="block text-sm font-medium text-neutral-300 mb-1.5"
      >
        {{ label }}
        <span v-if="required" class="text-error-500 ml-1">*</span>
      </label>

      <div v-if="$slots.prefix" class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-400 z-10">
        <slot name="prefix" />
      </div>

      <input
        :id="inputId"
        ref="inputRef"
        v-model="inputValue"
        :type="type"
        :placeholder="floatingLabel ? (isFocused || hasValue ? placeholder : '') : placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :pattern="pattern"
        :minlength="minLength"
        :maxlength="maxLength"
        :class="inputClass"
        :aria-invalid="hasError"
        :aria-describedby="hasError && validationMessage ? `${inputId}-error` : undefined"
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
      v-if="hasError && validationMessage"
      :id="`${inputId}-error`"
      class="mt-1.5 text-sm text-error-500 flex items-center gap-1"
    >
      <svg class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
      {{ validationMessage }}
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
import { computed, ref, useSlots, watch } from 'vue'
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
  floatingLabel?: boolean
  pattern?: string
  minLength?: number
  maxLength?: number
  validator?: (value: string | number) => string | null
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
  floatingLabel: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
  'validation-error': [message: string | null]
}>()

defineOptions({
  inheritAttrs: false,
})

const inputRef = ref<HTMLInputElement>()
const inputId = ref(`input-${Math.random().toString(36).substr(2, 9)}`)
const isFocused = ref(false)
const internalError = ref<string | null>(null)

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value ?? ''),
})

const hasValue = computed(() => {
  const value = inputValue.value
  return value !== undefined && value !== null && value !== ''
})

const hasError = computed(() => props.error || !!internalError.value)

const validationMessage = computed(() => internalError.value || props.errorMessage || '')

const wrapperClass = computed(() => cn('w-full', props.class))

const floatingLabelClass = computed(() => {
  const isActive = isFocused.value || hasValue.value
  const sizeClasses = {
    sm: isActive ? 'text-xs top-0.5' : 'text-sm top-2',
    md: isActive ? 'text-xs top-1' : 'text-base top-2.5',
    lg: isActive ? 'text-xs top-1.5' : 'text-base top-3.5',
  }

  return cn(
    'absolute left-3 pointer-events-none',
    'transition-all duration-200',
    'font-medium z-10',
    isActive ? 'text-primary-500' : 'text-neutral-400',
    hasError.value && 'text-error-500',
    sizeClasses[props.size]
  )
})

const inputClass = computed(() => {
  const sizeClasses = {
    sm: props.floatingLabel ? 'h-10 px-3 pt-4 pb-1 text-sm' : 'h-8 px-3 text-sm',
    md: props.floatingLabel ? 'h-12 px-4 pt-5 pb-1 text-base' : 'h-10 px-4 text-base',
    lg: props.floatingLabel ? 'h-14 px-5 pt-6 pb-1 text-lg' : 'h-12 px-5 text-lg',
  }

  return cn(
    // Modern refined input
    'block w-full',
    'rounded-lg border',
    'bg-neutral-900/50 backdrop-blur-sm',
    'text-white placeholder-neutral-500',
    'outline-none',
    'transition-all duration-200',

    // Focus styles - Clean & subtle
    'focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-0',
    'focus:bg-neutral-900/70',
    'focus:border-primary-500',

    // Border colors
    hasError.value
      ? 'border-red-500/50 focus:border-red-400'
      : 'border-white/10 hover:border-primary-500/40 focus:border-primary-500',

    // States
    props.disabled && 'opacity-50 cursor-not-allowed bg-neutral-900/30 hover:border-white/10',
    props.readonly && 'cursor-default bg-neutral-900/30',

    // Padding adjustments for icons
    slots.prefix && 'pl-10',
    (slots.suffix || props.clearable) && 'pr-10',

    sizeClasses[props.size]
  )
})

const validate = (value: string | number) => {
  // Required validation
  if (props.required && !value) {
    internalError.value = 'This field is required'
    emit('validation-error', internalError.value)
    return
  }

  const stringValue = String(value)

  // Pattern validation
  if (props.pattern && stringValue && !new RegExp(props.pattern).test(stringValue)) {
    internalError.value = 'Invalid format'
    emit('validation-error', internalError.value)
    return
  }

  // Min length validation
  if (props.minLength && stringValue.length < props.minLength) {
    internalError.value = `Minimum ${props.minLength} characters required`
    emit('validation-error', internalError.value)
    return
  }

  // Max length validation
  if (props.maxLength && stringValue.length > props.maxLength) {
    internalError.value = `Maximum ${props.maxLength} characters allowed`
    emit('validation-error', internalError.value)
    return
  }

  // Custom validator
  if (props.validator) {
    const error = props.validator(value)
    if (error) {
      internalError.value = error
      emit('validation-error', internalError.value)
      return
    }
  }

  // No errors
  internalError.value = null
  emit('validation-error', null)
}

watch(() => props.modelValue, (value) => {
  if (value !== undefined && value !== null && value !== '') {
    validate(value)
  } else {
    internalError.value = null
  }
})

const handleInput = (event: Event) => {
  emit('input', event)
  const target = event.target as HTMLInputElement
  validate(target.value)
}

const handleBlur = (event: FocusEvent) => {
  isFocused.value = false
  emit('blur', event)
  if (inputValue.value) {
    validate(inputValue.value)
  }
}

const handleFocus = (event: FocusEvent) => {
  isFocused.value = true
  emit('focus', event)
}

const clearInput = () => {
  emit('update:modelValue', '')
  internalError.value = null
}
</script>
