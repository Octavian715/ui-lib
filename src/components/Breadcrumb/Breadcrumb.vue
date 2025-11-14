<template>
  <nav :class="wrapperClass" aria-label="Breadcrumb">
    <ol :class="listClass">
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="itemClass"
      >
        <div class="flex items-center gap-2">
          <!-- Separator -->
          <component
            :is="separatorIcon"
            v-if="index > 0"
            class="h-4 w-4 text-neutral-500 flex-shrink-0"
          />

          <!-- Link or Text -->
          <component
            :is="item.href && !item.disabled ? 'a' : 'span'"
            :href="item.href"
            :class="[
              getLinkClass(item, index),
              item.disabled && 'pointer-events-none opacity-50',
            ]"
            :aria-current="index === items.length - 1 ? 'page' : undefined"
            @click="handleClick($event, item, index)"
          >
            <component
              :is="item.icon"
              v-if="item.icon"
              class="h-4 w-4 flex-shrink-0"
            />
            <span :class="{ 'truncate': truncate }">{{ item.label }}</span>
          </component>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { cn } from '@/utils/cn'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: any
  disabled?: boolean
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  separator?: 'slash' | 'chevron' | 'arrow'
  size?: 'sm' | 'md' | 'lg'
  truncate?: boolean
  maxItems?: number
  class?: string
}

const props = withDefaults(defineProps<BreadcrumbProps>(), {
  separator: 'chevron',
  size: 'md',
  truncate: false,
})

const emit = defineEmits<{
  click: [item: BreadcrumbItem, index: number]
}>()

const separatorIcons = {
  slash: () => h('svg', {
    viewBox: '0 0 20 20',
    fill: 'currentColor',
  }, [
    h('path', {
      d: 'M5.555 17.776l8-16 .894.448-8 16-.894-.448z',
    }),
  ]),
  chevron: () => h('svg', {
    viewBox: '0 0 20 20',
    fill: 'currentColor',
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      'd': 'M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z',
      'clip-rule': 'evenodd',
    }),
  ]),
  arrow: () => h('svg', {
    viewBox: '0 0 20 20',
    fill: 'currentColor',
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      'd': 'M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z',
      'clip-rule': 'evenodd',
    }),
  ]),
}

const separatorIcon = computed(() => separatorIcons[props.separator])

const handleClick = (event: Event, item: BreadcrumbItem, index: number) => {
  if (!item.href) {
    event.preventDefault()
  }
  emit('click', item, index)
}

const getLinkClass = (item: BreadcrumbItem, index: number) => {
  const isLast = index === props.items.length - 1

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return cn(
    'inline-flex items-center gap-1.5',
    'transition-colors duration-150',
    'font-medium',
    isLast
      ? 'text-white cursor-default'
      : item.href
      ? 'text-neutral-400 hover:text-primary-500'
      : 'text-neutral-400',
    sizeClasses[props.size]
  )
}

const wrapperClass = computed(() => cn('w-full', props.class))

const listClass = computed(() =>
  cn('flex flex-wrap items-center gap-1')
)

const itemClass = computed(() =>
  cn('flex items-center')
)
</script>
