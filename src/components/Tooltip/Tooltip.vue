<template>
  <div class="relative inline-block">
    <div
      ref="triggerRef"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @focus="showTooltip"
      @blur="hideTooltip"
    >
      <slot name="trigger">
        <slot />
      </slot>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isVisible && !disabled"
          ref="tooltipRef"
          :class="tooltipClass"
          :style="tooltipStyle"
          role="tooltip"
        >
          <slot name="content">
            {{ content }}
          </slot>
          <div
            :class="arrowClass"
            :style="arrowStyle"
          />
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { cn } from '@/utils/cn'

interface TooltipProps {
  content?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  variant?: 'normal' | 'danger' | 'success' | 'warning'
  delay?: number
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<TooltipProps>(), {
  position: 'top',
  variant: 'normal',
  delay: 0,
  disabled: false,
})

const isVisible = ref(false)
const triggerRef = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()
const tooltipStyle = ref({})
const arrowStyle = ref({})

let showTimeout: number | undefined

const tooltipClass = computed(() => {
  const variantClasses = {
    normal: 'bg-secondary-800 border-secondary-700 text-white',
    danger: 'bg-red-600 border-red-500 text-white',
    success: 'bg-green-600 border-green-500 text-white',
    warning: 'bg-yellow-600 border-yellow-500 text-white',
  }

  return cn(
    'fixed z-50 px-3 py-2 text-sm rounded-lg border-2 shadow-lg max-w-xs pointer-events-none',
    variantClasses[props.variant],
    props.class
  )
})

const arrowClass = computed(() => {
  const variantClasses = {
    normal: 'border-secondary-700',
    danger: 'border-red-500',
    success: 'border-green-500',
    warning: 'border-yellow-500',
  }

  return cn(
    'absolute w-2 h-2 rotate-45 border-2',
    variantClasses[props.variant]
  )
})

const calculatePosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()
  const gap = 8

  let top = 0
  let left = 0
  let arrowTop = 0
  let arrowLeft = 0

  switch (props.position) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - gap
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      arrowTop = tooltipRect.height - 1
      arrowLeft = tooltipRect.width / 2 - 4
      break
    case 'bottom':
      top = triggerRect.bottom + gap
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      arrowTop = -5
      arrowLeft = tooltipRect.width / 2 - 4
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      left = triggerRect.left - tooltipRect.width - gap
      arrowTop = tooltipRect.height / 2 - 4
      arrowLeft = tooltipRect.width - 1
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      left = triggerRect.right + gap
      arrowTop = tooltipRect.height / 2 - 4
      arrowLeft = -5
      break
  }

  // Keep tooltip within viewport
  const padding = 8
  if (left < padding) left = padding
  if (left + tooltipRect.width > window.innerWidth - padding) {
    left = window.innerWidth - tooltipRect.width - padding
  }
  if (top < padding) top = padding
  if (top + tooltipRect.height > window.innerHeight - padding) {
    top = window.innerHeight - tooltipRect.height - padding
  }

  tooltipStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
  }

  arrowStyle.value = {
    top: `${arrowTop}px`,
    left: `${arrowLeft}px`,
  }
}

const showTooltip = () => {
  if (props.disabled) return

  if (props.delay > 0) {
    showTimeout = window.setTimeout(() => {
      isVisible.value = true
      nextTick(() => {
        calculatePosition()
      })
    }, props.delay)
  } else {
    isVisible.value = true
    nextTick(() => {
      calculatePosition()
    })
  }
}

const hideTooltip = () => {
  if (showTimeout) {
    clearTimeout(showTimeout)
  }
  isVisible.value = false
}
</script>
