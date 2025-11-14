<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div v-if="visible" :class="alertClass" role="alert">
      <div class="flex items-start gap-3">
        <div v-if="icon" class="flex-shrink-0 mt-0.5">
          <component :is="iconComponent" class="w-5 h-5" />
        </div>

        <div class="flex-1 min-w-0">
          <h4 v-if="title" :class="titleClass">
            {{ title }}
          </h4>
          <div :class="descriptionClass">
            <slot>{{ description }}</slot>
          </div>
        </div>

        <button
          v-if="closable"
          type="button"
          class="flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity"
          @click="close"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, h } from 'vue'
import { cn } from '@/utils/cn'

interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'danger'
  title?: string
  description?: string
  icon?: boolean
  closable?: boolean
  modelValue?: boolean
  class?: string
}

const props = withDefaults(defineProps<AlertProps>(), {
  variant: 'info',
  icon: true,
  closable: false,
  modelValue: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const visible = ref(props.modelValue)

const alertClass = computed(() => {
  const variantClasses = {
    info: 'bg-blue-500/10 border-blue-500/50 text-blue-400',
    success: 'bg-green-500/10 border-green-500/50 text-green-400',
    warning: 'bg-yellow-500/10 border-yellow-500/50 text-yellow-400',
    danger: 'bg-red-500/10 border-red-500/50 text-red-400',
  }

  return cn(
    'rounded-lg border-2 p-4',
    variantClasses[props.variant],
    props.class
  )
})

const titleClass = computed(() => 'font-semibold mb-1')

const descriptionClass = computed(() => 'text-sm opacity-90')

const iconComponent = computed(() => {
  const icons = {
    info: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', {
        'fill-rule': 'evenodd',
        d: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z',
        'clip-rule': 'evenodd',
      }),
    ]),
    success: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', {
        'fill-rule': 'evenodd',
        d: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
        'clip-rule': 'evenodd',
      }),
    ]),
    warning: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', {
        'fill-rule': 'evenodd',
        d: 'M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z',
        'clip-rule': 'evenodd',
      }),
    ]),
    danger: () => h('svg', { fill: 'currentColor', viewBox: '0 0 20 20' }, [
      h('path', {
        'fill-rule': 'evenodd',
        d: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z',
        'clip-rule': 'evenodd',
      }),
    ]),
  }

  return icons[props.variant]
})

const close = () => {
  visible.value = false
  emit('update:modelValue', false)
  emit('close')
}
</script>
