<template>
  <div :class="cardClass" @click="handleClick">
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
    default: 'bg-neutral-800/50 backdrop-blur-sm border border-white/10',
    bordered: 'bg-transparent border-2 border-white/20',
    elevated: 'bg-neutral-800/70 backdrop-blur-md border border-white/10 shadow-[0_12px_24px_-4px_rgba(0,0,0,0.3)]',
    flat: 'bg-neutral-800/50',
  }

  const paddingClasses = {
    none: '',
    sm: '',
    md: '',
    lg: '',
  }

  return cn(
    // Modern card with rounded corners and smooth transitions
    'rounded-2xl transition-all duration-300',
    variantClasses[props.variant],
    props.hoverable && 'hover:border-white/20 hover:shadow-[0_12px_24px_-4px_rgba(168,85,247,0.2)]',
    props.clickable && 'cursor-pointer hover:scale-[1.02] hover:-translate-y-1',
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
    'border-b border-white/10',
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
    'border-t border-white/10',
    paddingClasses[props.padding]
  )
})

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>
