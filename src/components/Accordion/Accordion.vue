<template>
  <div :class="wrapperClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { cn } from '@/utils/cn'

interface AccordionProps {
  allowMultiple?: boolean
  class?: string
}

const props = withDefaults(defineProps<AccordionProps>(), {
  allowMultiple: false,
})

const openItems = ref<Set<string>>(new Set())

const toggleItem = (id: string) => {
  if (props.allowMultiple) {
    if (openItems.value.has(id)) {
      openItems.value.delete(id)
    } else {
      openItems.value.add(id)
    }
  } else {
    if (openItems.value.has(id)) {
      openItems.value.clear()
    } else {
      openItems.value.clear()
      openItems.value.add(id)
    }
  }
}

const isOpen = (id: string) => openItems.value.has(id)

provide('accordion', {
  openItems,
  toggleItem,
  isOpen,
})

const wrapperClass = computed(() => cn('space-y-2', props.class))
</script>
