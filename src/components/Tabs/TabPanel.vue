<template>
  <div
    v-show="isActive"
    :id="`panel-${value}`"
    :class="panelClass"
    role="tabpanel"
    :aria-labelledby="`tab-${value}`"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { cn } from '@/utils/cn'

interface TabPanelProps {
  value: string
  class?: string
}

const props = defineProps<TabPanelProps>()

const activeTab = inject<ReturnType<typeof computed<string>>>('activeTab')

const isActive = computed(() => activeTab?.value === props.value)

const panelClass = computed(() =>
  cn(
    'animate-fade-in',
    props.class
  )
)
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out;
}
</style>
