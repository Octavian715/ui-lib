<template>
  <div :class="cardClass">
    <div v-if="$slots.header || title" :class="headerClass">
      <slot name="header">
        <h3 v-if="title" class="text-lg font-semibold text-white">{{ title }}</h3>
      </slot>
    </div>

    <div :class="bodyClass">
      <slot />
    </div>

    <div v-if="$slots.footer" :class="footerClass">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface CardProps {
  title?: string
  variant?: 'default' | 'bordered' | 'elevated' | 'flat'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  clickable?: boolean
  class?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
  padding: 'md',
  hoverable: false,
  clickable: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const cardClass = computed(() => {
  const variantClasses = {
    default: 'bg-secondary-800 border border-secondary-700',
    bordered: 'bg-transparent border-2 border-secondary-700',
    elevated: 'bg-secondary-800 border border-secondary-700 shadow-xl',
    flat: 'bg-secondary-800',
  }

  const paddingClasses = {
    none: '',
    sm: '',
    md: '',
    lg: '',
  }

  return cn(
    'rounded-lg transition-all duration-200',
    variantClasses[props.variant],
    props.hoverable && 'hover:border-secondary-600 hover:shadow-lg',
    props.clickable && 'cursor-pointer hover:scale-[1.02]',
    paddingClasses[props.padding],
    props.class
  )
})

const headerClass = computed(() => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  }

  return cn(
    'border-b border-secondary-700',
    paddingClasses[props.padding]
  )
})

const bodyClass = computed(() => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  }

  return cn(paddingClasses[props.padding])
})

const footerClass = computed(() => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'px-3 py-2',
    md: 'px-4 py-3',
    lg: 'px-6 py-4',
  }

  return cn(
    'border-t border-secondary-700',
    paddingClasses[props.padding]
  )
})

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>
