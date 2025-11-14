<template>
  <span :class="tagClass">
    <span v-if="$slots.icon" :class="iconClass">
      <slot name="icon" />
    </span>
    <slot>{{ label }}</slot>
    <button
      v-if="closable"
      type="button"
      :class="closeButtonClass"
      aria-label="Remove tag"
      @click="handleClose"
    >
      <svg class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface TagProps {
  label?: string
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  closable?: boolean
  bordered?: boolean
  class?: string
}

const props = withDefaults(defineProps<TagProps>(), {
  variant: 'default',
  size: 'md',
  rounded: false,
  closable: false,
  bordered: false,
})

const emit = defineEmits<{
  close: []
}>()

const handleClose = (event: Event) => {
  event.stopPropagation()
  emit('close')
}

const tagClass = computed(() => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-sm gap-1.5',
    lg: 'px-3 py-1.5 text-base gap-2',
  }

  const variantClasses = {
    default: 'bg-neutral-800/50 text-neutral-300 border-neutral-700/50',
    primary: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    danger: 'bg-red-500/10 text-red-400 border-red-500/30',
    info: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  }

  return cn(
    'inline-flex items-center',
    'font-medium',
    'transition-all duration-200',
    'backdrop-blur-sm',
    props.rounded ? 'rounded-full' : 'rounded-md',
    props.bordered && 'border',
    sizeClasses[props.size],
    variantClasses[props.variant],
    props.class
  )
})

const iconClass = computed(() => {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  }
  return cn('flex-shrink-0', sizeClasses[props.size])
})

const closeButtonClass = computed(() =>
  cn(
    'flex-shrink-0',
    'hover:opacity-70',
    'transition-opacity duration-150',
    'focus:outline-none focus:ring-1 focus:ring-current rounded-full'
  )
)
</script>
