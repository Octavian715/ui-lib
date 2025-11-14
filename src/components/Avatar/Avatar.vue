<template>
  <div :class="avatarClass">
    <img
      v-if="src && !hasError"
      :src="src"
      :alt="alt"
      :class="imageClass"
      @error="handleError"
    />
    <span v-else-if="initials" :class="initialsClass">
      {{ initials }}
    </span>
    <svg v-else :class="iconClass" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
    </svg>

    <!-- Status indicator -->
    <span v-if="status" :class="statusClass" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'

const avatarVariants = cva(
  'relative inline-flex items-center justify-center overflow-hidden',
  {
    variants: {
      size: {
        xs: 'h-6 w-6',
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
        '2xl': 'h-20 w-20',
      },
      variant: {
        circle: 'rounded-full',
        rounded: 'rounded-lg',
        square: 'rounded-md',
      },
      bordered: {
        true: 'ring-2 ring-white/20 ring-offset-2 ring-offset-neutral-950',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'circle',
      bordered: false,
    },
  }
)

interface AvatarProps extends /* @vue-ignore */ VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  initials?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
  class?: string
}

const props = withDefaults(defineProps<AvatarProps>(), {
  alt: 'Avatar',
  size: 'md',
  variant: 'circle',
  bordered: false,
})

const hasError = ref(false)

const avatarClass = computed(() =>
  avatarVariants({
    size: props.size,
    variant: props.variant,
    bordered: props.bordered,
    class: cn(
      'bg-gradient-to-br from-blue-600 to-indigo-600',
      props.class
    ),
  })
)

const imageClass = computed(() =>
  cn('h-full w-full object-cover')
)

const initialsClass = computed(() => {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-2xl',
    '2xl': 'text-3xl',
  }
  return cn(
    'font-semibold text-white select-none',
    sizeClasses[props.size || 'md']
  )
})

const iconClass = computed(() => {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
    '2xl': 'h-10 w-10',
  }
  return cn(
    'text-white/80',
    sizeClasses[props.size || 'md']
  )
})

const statusClass = computed(() => {
  const statusColors = {
    online: 'bg-emerald-500',
    offline: 'bg-neutral-500',
    away: 'bg-amber-500',
    busy: 'bg-red-500',
  }

  const sizeClasses = {
    xs: 'h-1.5 w-1.5 bottom-0 right-0',
    sm: 'h-2 w-2 bottom-0 right-0',
    md: 'h-2.5 w-2.5 bottom-0 right-0',
    lg: 'h-3 w-3 bottom-0 right-0',
    xl: 'h-4 w-4 bottom-0.5 right-0.5',
    '2xl': 'h-5 w-5 bottom-1 right-1',
  }

  return cn(
    'absolute rounded-full ring-2 ring-neutral-950',
    statusColors[props.status || 'online'],
    sizeClasses[props.size || 'md']
  )
})

const handleError = () => {
  hasError.value = true
}
</script>
