<template>
  <div
    :class="toastClass"
    role="alert"
    @mouseenter="pauseTimer"
    @mouseleave="resumeTimer"
  >
    <!-- Icon -->
    <div :class="iconWrapperClass">
      <component :is="icon" class="h-5 w-5" />
    </div>

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <p v-if="toast.title" class="text-sm font-semibold text-white">
        {{ toast.title }}
      </p>
      <p :class="['text-sm', toast.title ? 'text-neutral-300 mt-0.5' : 'text-white']">
        {{ toast.message }}
      </p>
    </div>

    <!-- Close Button -->
    <button
      v-if="toast.closable"
      type="button"
      :class="closeButtonClass"
      @click="$emit('close')"
    >
      <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
      </svg>
    </button>

    <!-- Progress Bar -->
    <div
      v-if="toast.duration && toast.duration > 0"
      class="absolute bottom-0 left-0 h-1 bg-white/20 rounded-full transition-all duration-100"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, h, onMounted, onUnmounted, ref } from 'vue'
import { cn } from '@/utils/cn'
import type { Toast } from '@/composables/useToast'

interface ToastProps {
  toast: Toast
}

const props = defineProps<ToastProps>()

defineEmits<{
  close: []
}>()

const progress = ref(100)
let timer: ReturnType<typeof setInterval> | null = null
let startTime = 0
let remainingTime = props.toast.duration || 0

const pauseTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
    remainingTime = (props.toast.duration || 0) * (progress.value / 100)
  }
}

const resumeTimer = () => {
  if (props.toast.duration && props.toast.duration > 0 && !timer) {
    startProgress(remainingTime)
  }
}

const startProgress = (duration: number) => {
  startTime = Date.now()
  const interval = 50

  timer = setInterval(() => {
    const elapsed = Date.now() - startTime
    const remaining = Math.max(0, duration - elapsed)
    progress.value = (remaining / duration) * 100

    if (remaining === 0 && timer) {
      clearInterval(timer)
      timer = null
    }
  }, interval)
}

onMounted(() => {
  if (props.toast.duration && props.toast.duration > 0) {
    startProgress(props.toast.duration)
  }
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const icons = {
  success: () => h('svg', {
    viewBox: '0 0 20 20',
    fill: 'currentColor',
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      'd': 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z',
      'clip-rule': 'evenodd',
    }),
  ]),
  error: () => h('svg', {
    viewBox: '0 0 20 20',
    fill: 'currentColor',
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      'd': 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z',
      'clip-rule': 'evenodd',
    }),
  ]),
  warning: () => h('svg', {
    viewBox: '0 0 20 20',
    fill: 'currentColor',
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      'd': 'M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z',
      'clip-rule': 'evenodd',
    }),
  ]),
  info: () => h('svg', {
    viewBox: '0 0 20 20',
    fill: 'currentColor',
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      'd': 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z',
      'clip-rule': 'evenodd',
    }),
  ]),
}

const icon = computed(() => icons[props.toast.type])

const toastClass = computed(() => {
  const typeClasses = {
    success: 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 border-emerald-500/50',
    error: 'bg-gradient-to-r from-red-600/90 to-rose-600/90 border-red-500/50',
    warning: 'bg-gradient-to-r from-amber-600/90 to-orange-600/90 border-amber-500/50',
    info: 'bg-gradient-to-r from-blue-600/90 to-indigo-600/90 border-blue-500/50',
  }

  return cn(
    'relative flex items-start gap-3',
    'p-4 rounded-lg',
    'backdrop-blur-xl border',
    'shadow-lg',
    'overflow-hidden',
    'animate-slide-in',
    typeClasses[props.toast.type]
  )
})

const iconWrapperClass = computed(() => {
  return cn('flex-shrink-0 text-white')
})

const closeButtonClass = computed(() => {
  return cn(
    'flex-shrink-0 text-white/80 hover:text-white',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-white/50 rounded'
  )
})
</script>

<style scoped>
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
</style>
