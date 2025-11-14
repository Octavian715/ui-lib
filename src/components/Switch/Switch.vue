<template>
  <Switch
    v-model="checked"
    :disabled="disabled"
    :class="switchWrapperClass"
    @update:modelValue="handleChange"
  >
    <span class="sr-only">{{ label }}</span>
    <span
      aria-hidden="true"
      :class="switchClass"
    />
  </Switch>
  <span v-if="label" :class="labelClass">{{ label }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Switch } from '@headlessui/vue'
import { cn } from '@/utils/cn'

interface SwitchProps {
  modelValue?: boolean
  label?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<SwitchProps>(), {
  size: 'md',
  disabled: false,
  modelValue: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  change: [value: boolean]
}>()

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const switchWrapperClass = computed(() => {
  const sizeClasses = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-14',
  }

  return cn(
    'relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-secondary-900',
    checked.value ? 'bg-primary-500' : 'bg-secondary-700',
    props.disabled && 'opacity-50 cursor-not-allowed',
    sizeClasses[props.size],
    props.class
  )
})

const switchClass = computed(() => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }

  const translateClasses = {
    sm: checked.value ? 'translate-x-4' : 'translate-x-0',
    md: checked.value ? 'translate-x-5' : 'translate-x-0',
    lg: checked.value ? 'translate-x-7' : 'translate-x-0',
  }

  return cn(
    'pointer-events-none inline-block rounded-full bg-white shadow-lg transform ring-0 transition duration-200 ease-in-out',
    sizeClasses[props.size],
    translateClasses[props.size]
  )
})

const labelClass = computed(() => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return cn(
    'ml-3 text-white',
    props.disabled && 'opacity-50',
    sizeClasses[props.size]
  )
})

const handleChange = (value: boolean) => {
  emit('change', value)
}
</script>
