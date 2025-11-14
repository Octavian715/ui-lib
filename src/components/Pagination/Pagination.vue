<template>
  <nav :class="wrapperClass" role="navigation" aria-label="Pagination">
    <div class="flex items-center gap-2">
      <!-- Previous Button -->
      <button
        :class="buttonClass"
        :disabled="currentPage === 1"
        type="button"
        aria-label="Previous page"
        @click="goToPage(currentPage - 1)"
      >
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
            clip-rule="evenodd"
          />
        </svg>
        <span v-if="showText">Previous</span>
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center gap-1">
        <button
          v-for="page in visiblePages"
          :key="page"
          :class="[
            pageButtonClass,
            page === currentPage
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
              : 'text-neutral-300 hover:bg-neutral-800/50',
          ]"
          :aria-label="`Go to page ${page}`"
          :aria-current="page === currentPage ? 'page' : undefined"
          type="button"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>

        <span v-if="showEllipsis" class="px-2 text-neutral-500">...</span>
      </div>

      <!-- Next Button -->
      <button
        :class="buttonClass"
        :disabled="currentPage === totalPages"
        type="button"
        aria-label="Next page"
        @click="goToPage(currentPage + 1)"
      >
        <span v-if="showText">Next</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fill-rule="evenodd"
            d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <!-- Page Info -->
    <div v-if="showPageInfo" class="mt-3 text-center text-sm text-neutral-400">
      Page {{ currentPage }} of {{ totalPages }}
      <span v-if="totalItems"> ({{ totalItems }} items)</span>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems?: number
  maxVisiblePages?: number
  showText?: boolean
  showPageInfo?: boolean
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<PaginationProps>(), {
  maxVisiblePages: 7,
  showText: false,
  showPageInfo: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:currentPage': [page: number]
  change: [page: number]
}>()

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.currentPage) {
    return
  }
  emit('update:currentPage', page)
  emit('change', page)
}

const visiblePages = computed(() => {
  const pages: number[] = []
  const half = Math.floor(props.maxVisiblePages / 2)

  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.totalPages, start + props.maxVisiblePages - 1)

  // Adjust start if we're near the end
  if (end - start < props.maxVisiblePages - 1) {
    start = Math.max(1, end - props.maxVisiblePages + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const showEllipsis = computed(() => {
  return visiblePages.value[visiblePages.value.length - 1] < props.totalPages
})

const wrapperClass = computed(() => cn('w-full', props.class))

const buttonClass = computed(() => {
  const sizeClasses = {
    sm: 'h-8 px-2 text-sm gap-1',
    md: 'h-10 px-3 text-base gap-1.5',
    lg: 'h-12 px-4 text-lg gap-2',
  }

  return cn(
    'inline-flex items-center justify-center',
    'rounded-lg border border-white/10',
    'bg-neutral-900/50 backdrop-blur-sm',
    'font-semibold text-neutral-300',
    'transition-all duration-200',
    'hover:bg-neutral-800/70 hover:border-white/20',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
    'disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-900/50 disabled:hover:border-white/10',
    sizeClasses[props.size]
  )
})

const pageButtonClass = computed(() => {
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  }

  return cn(
    'inline-flex items-center justify-center',
    'rounded-lg border border-white/10',
    'bg-neutral-900/50 backdrop-blur-sm',
    'font-semibold',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
    sizeClasses[props.size]
  )
})
</script>
