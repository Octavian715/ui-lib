<template>
  <div :class="wrapperClass">
    <label
      v-if="label"
      :for="textareaId"
      class="block text-sm font-medium text-gray-300 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
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
        class="absolute bottom-2 right-2 text-xs"
        :class="characterCount >= maxLength ? 'text-red-500' : 'text-gray-500'"
      >
        {{ characterCount }} / {{ maxLength }}
      </div>
    </div>

    <p
      v-if="error && errorMessage"
      :id="`${textareaId}-error`"
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
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-4 text-lg',
  }

  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  }

  return cn(
    'block w-full rounded-lg border-2 transition-colors bg-secondary-800 text-white placeholder-gray-500',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-900',
    props.error
      ? 'border-red-500 focus:border-red-500'
      : 'border-secondary-700 hover:border-secondary-600 focus:border-primary-500',
    props.disabled && 'opacity-50 cursor-not-allowed bg-secondary-800/50',
    props.readonly && 'cursor-default',
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
