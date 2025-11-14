<template>
  <div :class="groupClass">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface AvatarGroupProps {
  max?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  spacing?: 'tight' | 'normal' | 'loose'
  class?: string
}

const props = withDefaults(defineProps<AvatarGroupProps>(), {
  max: 5,
  size: 'md',
  spacing: 'normal',
})

const groupClass = computed(() => {
  const spacingClasses = {
    tight: '-space-x-1',
    normal: '-space-x-2',
    loose: '-space-x-3',
  }

  return cn(
    'flex items-center',
    spacingClasses[props.spacing],
    props.class
  )
})
</script>
