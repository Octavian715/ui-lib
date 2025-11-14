<template>
  <div :class="skeletonClass" :style="customStyle">
    <div v-if="animated" class="shimmer" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animated?: boolean
  class?: string
}

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: 'text',
  animated: true,
})

const skeletonClass = computed(() => {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
    rounded: 'rounded-lg',
  }

  return cn(
    'relative overflow-hidden',
    'bg-neutral-800/50',
    variantClasses[props.variant],
    props.class
  )
})

const customStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }

  if (props.height) {
    style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }

  // For circular variant, ensure width and height are same
  if (props.variant === 'circular') {
    const size = props.width || props.height || '40px'
    style.width = typeof size === 'number' ? `${size}px` : size
    style.height = typeof size === 'number' ? `${size}px` : size
  }

  return style
})
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  animation: shimmer 2s infinite;
}
</style>
