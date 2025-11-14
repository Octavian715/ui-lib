<template>
  <Disclosure v-slot="{ open }" :default-open="defaultOpen">
    <div :class="itemClass">
      <DisclosureButton :class="buttonClass" @click="handleToggle">
        <span class="font-semibold text-white">{{ title }}</span>
        <svg
          :class="['h-5 w-5 text-neutral-400 transition-transform duration-200', open && 'rotate-180']"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </DisclosureButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <DisclosurePanel :class="panelClass">
          <slot />
        </DisclosurePanel>
      </transition>
    </div>
  </Disclosure>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { cn } from '@/utils/cn'

interface AccordionItemProps {
  title: string
  defaultOpen?: boolean
  class?: string
}

const props = withDefaults(defineProps<AccordionItemProps>(), {
  defaultOpen: false,
})

const itemId = ref(`accordion-item-${Math.random().toString(36).substring(2, 9)}`)

const accordion = inject<{
  openItems: any
  toggleItem: (id: string) => void
  isOpen: (id: string) => boolean
}>('accordion', {
  openItems: null,
  toggleItem: () => {},
  isOpen: () => false,
})

onMounted(() => {
  if (props.defaultOpen) {
    accordion.toggleItem(itemId.value)
  }
})

const handleToggle = () => {
  accordion.toggleItem(itemId.value)
}

const itemClass = computed(() =>
  cn(
    'rounded-lg',
    'bg-neutral-900/50 backdrop-blur-sm',
    'border border-white/10',
    'overflow-hidden',
    'transition-all duration-200',
    'hover:bg-neutral-900/70 hover:border-white/20',
    props.class
  )
)

const buttonClass = computed(() =>
  cn(
    'flex w-full items-center justify-between',
    'px-4 py-3',
    'text-left',
    'transition-colors duration-150',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50'
  )
)

const panelClass = computed(() =>
  cn(
    'px-4 pb-3 pt-1',
    'text-neutral-300 text-sm leading-relaxed'
  )
)
</script>
