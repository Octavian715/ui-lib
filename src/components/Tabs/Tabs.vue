<template>
  <div :class="wrapperClass">
    <!-- Tab List -->
    <div :class="tabListClass" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="getTabClass(tab.value)"
        :aria-selected="modelValue === tab.value"
        :aria-controls="`panel-${tab.value}`"
        role="tab"
        type="button"
        :disabled="tab.disabled"
        @click="selectTab(tab.value)"
      >
        <component
          :is="tab.icon"
          v-if="tab.icon"
          :class="iconClass"
        />
        {{ tab.label }}
        <span
          v-if="tab.badge"
          :class="badgeClass"
        >
          {{ tab.badge }}
        </span>
      </button>

      <!-- Active indicator -->
      <div
        v-if="variant === 'underline'"
        :class="indicatorClass"
        :style="indicatorStyle"
      />
    </div>

    <!-- Tab Panels -->
    <div :class="panelContainerClass">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref, watch, nextTick } from 'vue'
import { cn } from '@/utils/cn'

interface Tab {
  label: string
  value: string
  icon?: any
  badge?: string | number
  disabled?: boolean
}

interface TabsProps {
  modelValue: string
  tabs: Tab[]
  variant?: 'default' | 'underline' | 'pills'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  class?: string
}

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'underline',
  size: 'md',
  fullWidth: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const activeTabIndex = ref(0)

// Provide active tab to child TabPanel components
provide('activeTab', computed(() => props.modelValue))

const selectTab = (value: string) => {
  const tab = props.tabs.find(t => t.value === value)
  if (tab && !tab.disabled) {
    emit('update:modelValue', value)
    emit('change', value)
  }
}

const wrapperClass = computed(() => cn('w-full', props.class))

const tabListClass = computed(() => {
  const variantClasses = {
    default: 'border-b border-white/10',
    underline: 'relative border-b border-white/10',
    pills: 'bg-neutral-900/50 backdrop-blur-sm p-1 rounded-lg inline-flex',
  }

  return cn(
    'flex gap-1',
    props.fullWidth && 'w-full',
    variantClasses[props.variant]
  )
})

const getTabClass = (value: string) => {
  const isActive = props.modelValue === value
  const tab = props.tabs.find(t => t.value === value)

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-3 text-lg',
  }

  const baseClasses = [
    'relative flex items-center gap-2',
    'font-semibold transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50',
    sizeClasses[props.size],
    props.fullWidth && 'flex-1 justify-center',
  ]

  if (tab?.disabled) {
    return cn(...baseClasses, 'opacity-40 cursor-not-allowed')
  }

  const variantClasses = {
    default: isActive
      ? 'text-white bg-neutral-800/60'
      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/40',

    underline: isActive
      ? 'text-white'
      : 'text-neutral-400 hover:text-neutral-200',

    pills: isActive
      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg rounded-md'
      : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40 rounded-md',
  }

  return cn(...baseClasses, variantClasses[props.variant])
}

const iconClass = computed(() => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  }
  return sizeClasses[props.size]
})

const badgeClass = computed(() => {
  const sizeClasses = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-0.5 text-xs',
    lg: 'px-2.5 py-1 text-sm',
  }

  return cn(
    'inline-flex items-center justify-center',
    'bg-primary-500/20 text-primary-400',
    'rounded-full font-semibold',
    sizeClasses[props.size]
  )
})

const indicatorClass = computed(() =>
  cn(
    'absolute bottom-0 left-0',
    'h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600',
    'transition-all duration-300 ease-out'
  )
)

const indicatorStyle = computed(() => {
  const index = props.tabs.findIndex(t => t.value === props.modelValue)
  if (index === -1) return {}

  const width = 100 / props.tabs.length
  return {
    width: `${width}%`,
    transform: `translateX(${index * 100}%)`,
  }
})

const panelContainerClass = computed(() =>
  cn('mt-4')
)

watch(() => props.modelValue, () => {
  nextTick(() => {
    activeTabIndex.value = props.tabs.findIndex(t => t.value === props.modelValue)
  })
}, { immediate: true })
</script>
