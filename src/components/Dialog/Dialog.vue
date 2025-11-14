<template>
  <teleport to="body">
    <TransitionRoot :show="modelValue" as="template">
      <Dialog :class="dialogClass" @close="handleClose">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div :class="overlayClass" aria-hidden="true" />
        </TransitionChild>

        <div class="fixed inset-0 z-50 overflow-y-auto">
          <div :class="containerClass">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel :class="panelClass">
                <!-- Icon -->
                <div v-if="icon || variant !== 'default'" :class="iconWrapperClass">
                  <slot name="icon">
                    <component :is="variantIcon" :class="iconClass" />
                  </slot>
                </div>

                <!-- Title -->
                <DialogTitle v-if="title || $slots.title" as="h3" :class="titleClass">
                  <slot name="title">{{ title }}</slot>
                </DialogTitle>

                <!-- Description -->
                <DialogDescription v-if="description || $slots.description" :class="descriptionClass">
                  <slot name="description">{{ description }}</slot>
                </DialogDescription>

                <!-- Content -->
                <div v-if="$slots.default" :class="contentClass">
                  <slot />
                </div>

                <!-- Actions -->
                <div v-if="$slots.actions || confirmText || cancelText" :class="actionsClass">
                  <slot name="actions">
                    <Button
                      v-if="cancelText"
                      variant="secondary"
                      :size="buttonSize"
                      @click="handleCancel"
                    >
                      {{ cancelText }}
                    </Button>
                    <Button
                      v-if="confirmText"
                      :variant="confirmVariant"
                      :size="buttonSize"
                      :loading="loading"
                      @click="handleConfirm"
                    >
                      {{ confirmText }}
                    </Button>
                  </slot>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </teleport>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { cn } from '@/utils/cn'
import Button from '../Button/Button.vue'

interface DialogProps {
  modelValue: boolean
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: any
  confirmText?: string
  cancelText?: string
  loading?: boolean
  closeOnOverlay?: boolean
  class?: string
}

const props = withDefaults(defineProps<DialogProps>(), {
  variant: 'default',
  size: 'md',
  closeOnOverlay: true,
  loading: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: []
  cancel: []
  close: []
}>()

const handleClose = () => {
  if (!props.closeOnOverlay) return
  emit('update:modelValue', false)
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('update:modelValue', false)
  emit('cancel')
}

const variantIcons = {
  default: null,
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
  danger: () => h('svg', {
    viewBox: '0 0 20 20',
    fill: 'currentColor',
  }, [
    h('path', {
      'fill-rule': 'evenodd',
      'd': 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z',
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

const variantIcon = computed(() => variantIcons[props.variant])

const confirmVariant = computed(() => {
  const variants = {
    default: 'primary',
    success: 'primary',
    warning: 'warning',
    danger: 'danger',
    info: 'primary',
  }
  return variants[props.variant] as any
})

const buttonSize = computed(() => {
  return props.size === 'sm' ? 'sm' : 'md'
})

const dialogClass = computed(() => 'relative z-50')

const overlayClass = computed(() =>
  cn('fixed inset-0 bg-black/60 backdrop-blur-sm')
)

const containerClass = computed(() =>
  cn('flex min-h-full items-center justify-center p-4')
)

const panelClass = computed(() => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }

  return cn(
    'w-full',
    'bg-neutral-900',
    'border border-white/10',
    'rounded-lg',
    'shadow-2xl',
    'p-6',
    'relative',
    sizeClasses[props.size],
    props.class
  )
})

const iconWrapperClass = computed(() => {
  const variantClasses = {
    default: 'bg-neutral-800',
    success: 'bg-emerald-500/10',
    warning: 'bg-amber-500/10',
    danger: 'bg-red-500/10',
    info: 'bg-blue-500/10',
  }

  return cn(
    'mx-auto flex h-12 w-12 items-center justify-center rounded-full',
    'mb-4',
    variantClasses[props.variant]
  )
})

const iconClass = computed(() => {
  const variantClasses = {
    default: 'text-neutral-400',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    danger: 'text-red-400',
    info: 'text-blue-400',
  }

  return cn('h-6 w-6', variantClasses[props.variant])
})

const titleClass = computed(() =>
  cn(
    'text-lg font-semibold text-white',
    'text-center',
    'mb-2'
  )
)

const descriptionClass = computed(() =>
  cn(
    'text-sm text-neutral-400',
    'text-center',
    'mb-4'
  )
)

const contentClass = computed(() =>
  cn('mt-4')
)

const actionsClass = computed(() =>
  cn(
    'mt-6 flex gap-3 justify-end'
  )
)
</script>
