<template>
  <div :class="wrapperClass">
    <label v-if="label" :class="labelClass">
      {{ label }}
      <span v-if="required" class="text-error-500 ml-1">*</span>
    </label>

    <div :class="groupClass">
      <slot />
    </div>

    <p v-if="error && errorMessage" :class="errorClass">
      <svg class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
      {{ errorMessage }}
    </p>

    <p v-else-if="hint" :class="hintClass">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, provide } from 'vue'
import { cn } from '@/utils/cn'

interface RadioGroupProps {
  modelValue?: string | number | boolean
  label?: string
  hint?: string
  errorMessage?: string
  direction?: 'vertical' | 'horizontal'
  spacing?: 'sm' | 'md' | 'lg'
  required?: boolean
  error?: boolean
  class?: string
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  direction: 'vertical',
  spacing: 'md',
  required: false,
  error: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number | boolean]
}>()

// Provide value and update function to child Radio components
provide('radioGroupValue', computed(() => props.modelValue))
provide('radioGroupUpdate', (value: string | number | boolean) => {
  emit('update:modelValue', value)
})

const wrapperClass = computed(() => cn('w-full', props.class))

const labelClass = computed(() =>
  cn('block text-sm font-medium text-neutral-200 mb-2')
)

const groupClass = computed(() => {
  const directionClasses = {
    vertical: 'flex flex-col',
    horizontal: 'flex flex-row flex-wrap',
  }

  const spacingClasses = {
    sm: props.direction === 'vertical' ? 'space-y-2' : 'space-x-2',
    md: props.direction === 'vertical' ? 'space-y-3' : 'space-x-3',
    lg: props.direction === 'vertical' ? 'space-y-4' : 'space-x-4',
  }

  return cn(
    directionClasses[props.direction],
    spacingClasses[props.spacing]
  )
})

const errorClass = computed(() =>
  cn('mt-2 text-sm text-error-500 flex items-center gap-1')
)

const hintClass = computed(() =>
  cn('mt-2 text-sm text-neutral-400')
)
</script>
