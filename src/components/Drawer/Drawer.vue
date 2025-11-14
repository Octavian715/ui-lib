<template>
  <teleport to="body">
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        :class="overlayClass"
        @click="handleOverlayClick"
      />
    </transition>

    <transition
      :enter-active-class="enterActiveClass"
      :enter-from-class="enterFromClass"
      :enter-to-class="enterToClass"
      :leave-active-class="leaveActiveClass"
      :leave-from-class="leaveFromClass"
      :leave-to-class="leaveToClass"
    >
      <div
        v-if="modelValue"
        :class="drawerClass"
        role="dialog"
        aria-modal="true"
      >
        <!-- Header -->
        <div v-if="title || $slots.header" :class="headerClass">
          <slot name="header">
            <h2 class="text-xl font-semibold text-white">{{ title }}</h2>
          </slot>
          <button
            v-if="closable"
            type="button"
            :class="closeButtonClass"
            aria-label="Close drawer"
            @click="handleClose"
          >
            <svg class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div :class="bodyClass">
          <slot />
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" :class="footerClass">
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { cn } from '@/utils/cn'

interface DrawerProps {
  modelValue: boolean
  title?: string
  placement?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  closable?: boolean
  closeOnOverlay?: boolean
  class?: string
}

const props = withDefaults(defineProps<DrawerProps>(), {
  placement: 'right',
  size: 'md',
  closable: true,
  closeOnOverlay: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const handleClose = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    handleClose()
  }
}

// Lock body scroll when drawer is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const overlayClass = computed(() =>
  cn(
    'fixed inset-0 z-40',
    'bg-black/60 backdrop-blur-sm'
  )
)

const drawerClass = computed(() => {
  const sizeClasses = {
    left: {
      sm: 'w-64',
      md: 'w-80',
      lg: 'w-96',
      xl: 'w-[32rem]',
      full: 'w-full',
    },
    right: {
      sm: 'w-64',
      md: 'w-80',
      lg: 'w-96',
      xl: 'w-[32rem]',
      full: 'w-full',
    },
    top: {
      sm: 'h-64',
      md: 'h-80',
      lg: 'h-96',
      xl: 'h-[32rem]',
      full: 'h-full',
    },
    bottom: {
      sm: 'h-64',
      md: 'h-80',
      lg: 'h-96',
      xl: 'h-[32rem]',
      full: 'h-full',
    },
  }

  const placementClasses = {
    left: 'left-0 top-0 bottom-0',
    right: 'right-0 top-0 bottom-0',
    top: 'top-0 left-0 right-0',
    bottom: 'bottom-0 left-0 right-0',
  }

  return cn(
    'fixed z-50',
    'bg-neutral-900 border',
    props.placement === 'left' && 'border-r border-white/10',
    props.placement === 'right' && 'border-l border-white/10',
    props.placement === 'top' && 'border-b border-white/10',
    props.placement === 'bottom' && 'border-t border-white/10',
    'shadow-2xl',
    'flex flex-col',
    'overflow-hidden',
    placementClasses[props.placement],
    sizeClasses[props.placement][props.size],
    props.class
  )
})

const headerClass = computed(() =>
  cn(
    'flex items-center justify-between',
    'px-6 py-4',
    'border-b border-white/10',
    'flex-shrink-0'
  )
)

const bodyClass = computed(() =>
  cn(
    'flex-1 overflow-y-auto',
    'px-6 py-4'
  )
)

const footerClass = computed(() =>
  cn(
    'px-6 py-4',
    'border-t border-white/10',
    'flex-shrink-0'
  )
)

const closeButtonClass = computed(() =>
  cn(
    'text-neutral-400 hover:text-white',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50 rounded'
  )
)

// Transition classes based on placement
const enterActiveClass = computed(() => 'transition-transform duration-300 ease-out')
const leaveActiveClass = computed(() => 'transition-transform duration-300 ease-in')

const enterFromClass = computed(() => {
  const classes = {
    left: '-translate-x-full',
    right: 'translate-x-full',
    top: '-translate-y-full',
    bottom: 'translate-y-full',
  }
  return classes[props.placement]
})

const enterToClass = computed(() => 'translate-x-0 translate-y-0')

const leaveFromClass = computed(() => 'translate-x-0 translate-y-0')

const leaveToClass = computed(() => {
  const classes = {
    left: '-translate-x-full',
    right: 'translate-x-full',
    top: '-translate-y-full',
    bottom: 'translate-y-full',
  }
  return classes[props.placement]
})
</script>
