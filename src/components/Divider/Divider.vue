<template>
  <div :class="wrapperClass" role="separator">
    <div v-if="orientation === 'horizontal'" :class="horizontalClass">
      <span v-if="label || $slots.default" :class="labelClass">
        <slot>{{ label }}</slot>
      </span>
    </div>
    <div v-else :class="verticalClass" />
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { cn } from '@/utils/cn'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient'
  label?: string
  labelPosition?: 'left' | 'center' | 'right'
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  class?: string
}

const props = withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal',
  variant: 'solid',
  labelPosition: 'center',
  spacing: 'md',
})

const slots = useSlots()

const wrapperClass = computed(() => {
  const spacingClasses = {
    none: '',
    sm: props.orientation === 'horizontal' ? 'my-2' : 'mx-2',
    md: props.orientation === 'horizontal' ? 'my-4' : 'mx-4',
    lg: props.orientation === 'horizontal' ? 'my-6' : 'mx-6',
    xl: props.orientation === 'horizontal' ? 'my-8' : 'mx-8',
  }

  return cn(
    props.orientation === 'horizontal' ? 'w-full' : 'h-full',
    spacingClasses[props.spacing],
    props.class
  )
})

const horizontalClass = computed(() => {
  const variantClasses = {
    solid: 'border-t border-white/10',
    dashed: 'border-t border-dashed border-white/10',
    dotted: 'border-t border-dotted border-white/10',
    gradient: 'h-px bg-gradient-to-r from-transparent via-white/20 to-transparent',
  }

  const hasLabel = props.label || slots.default
  const labelPositionClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  }

  return cn(
    'relative flex items-center',
    hasLabel ? labelPositionClasses[props.labelPosition] : '',
    !hasLabel && variantClasses[props.variant]
  )
})

const verticalClass = computed(() => {
  const variantClasses = {
    solid: 'border-l border-white/10',
    dashed: 'border-l border-dashed border-white/10',
    dotted: 'border-l border-dotted border-white/10',
    gradient: 'w-px bg-gradient-to-b from-transparent via-white/20 to-transparent',
  }

  return cn('h-full', variantClasses[props.variant])
})

const labelClass = computed(() =>
  cn(
    'px-4 text-sm font-medium text-neutral-400',
    'bg-neutral-950',
    'relative z-10',
    'before:absolute before:inset-y-0 before:left-0 before:-translate-x-full before:w-screen before:border-t before:border-white/10',
    'after:absolute after:inset-y-0 after:right-0 after:translate-x-full after:w-screen after:border-t after:border-white/10'
  )
)
</script>
