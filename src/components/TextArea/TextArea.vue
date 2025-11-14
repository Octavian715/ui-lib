<template>
  <div :class="wrapperClass">
    <label
      v-if="label"
      :for="textareaId"
      class="block text-sm font-medium text-neutral-300 mb-1.5"
    >
      {{ label }}
      <span v-if="required" class="text-error-500 ml-1">*</span>
    </label>

    <div class="relative">
      <textarea
        :id="textareaId"
        v-model="textValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="rows"
        :maxlength="maxLength"
        :class="textareaClass"
        :aria-invalid="error"
        :aria-describedby="error && errorMessage ? `${textareaId}-error` : undefined"
        v-bind="$attrs"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />

      <div
        v-if="maxLength && showCount"
        class="absolute bottom-3 right-3 text-xs pointer-events-none"
        :class="characterCount >= maxLength ? 'text-error-500 font-medium' : 'text-neutral-500'"
      >
        {{ characterCount }} / {{ maxLength }}
      </div>
    </div>

    <p
      v-if="error && errorMessage"
      :id="`${textareaId}-error`"
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

interface TextAreaProps {
  modelValue?: string
  label?: string
  placeholder?: string
  hint?: string
  errorMessage?: string
  rows?: number
  maxLength?: number
  showCount?: boolean
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  error?: boolean
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  class?: string
}

const props = withDefaults(defineProps<TextAreaProps>(), {
  rows: 4,
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  error: false,
  showCount: true,
  resize: 'vertical',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
}>()

defineOptions({
  inheritAttrs: false,
})

const textareaId = ref(`textarea-${Math.random().toString(36).substr(2, 9)}`)

const textValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value ?? ''),
})

const characterCount = computed(() => textValue.value?.length || 0)

const wrapperClass = computed(() => cn('w-full', props.class))

const textareaClass = computed(() => {
  const sizeClasses = {
    sm: 'py-2 px-3 text-sm',
    md: 'py-2.5 px-4 text-base',
    lg: 'py-3 px-5 text-lg',
  }

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  }

  return cn(
    // Base styles
    'block w-full rounded-lg border-2 transition-all duration-200',
    'bg-neutral-900 text-white placeholder-neutral-500',
    'outline-none',

    // Focus styles
    'focus:ring-2 focus:ring-primary-500 focus:ring-offset-0',

    // Border colors
    props.error
      ? 'border-error-500 focus:border-error-500'
      : 'border-neutral-700 hover:border-neutral-600 focus:border-primary-500',

    // States
    props.disabled && 'opacity-50 cursor-not-allowed bg-neutral-900/50 hover:border-neutral-700',
    props.readonly && 'cursor-default bg-neutral-800',

    // Character counter spacing
    props.maxLength && props.showCount && 'pb-8',

    sizeClasses[props.size],
    resizeClasses[props.resize]
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
</script>
