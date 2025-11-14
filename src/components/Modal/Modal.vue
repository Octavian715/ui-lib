<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/70" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="modalClass"
            >
              <div v-if="title || $slots.header" class="mb-4">
                <DialogTitle
                  as="h3"
                  class="text-2xl font-semibold leading-6 text-white"
                >
                  <slot name="header">
                    {{ title }}
                  </slot>
                </DialogTitle>
              </div>

              <div v-if="description || $slots.description" class="mt-2 mb-4">
                <DialogDescription class="text-sm text-gray-300">
                  <slot name="description">
                    {{ description }}
                  </slot>
                </DialogDescription>
              </div>

              <div class="mt-4">
                <slot />
              </div>

              <div v-if="showFooter" class="mt-6 flex justify-end gap-3">
                <slot name="footer">
                  <Button
                    v-if="showCancel"
                    variant="outline"
                    @click="closeModal"
                  >
                    {{ cancelText }}
                  </Button>
                  <Button
                    v-if="showConfirm"
                    :variant="confirmVariant"
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from '@headlessui/vue'
import Button from '../Button/Button.vue'
import { cn } from '@/utils/cn'

interface ModalProps {
  isOpen: boolean
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showFooter?: boolean
  showCancel?: boolean
  showConfirm?: boolean
  cancelText?: string
  confirmText?: string
  confirmVariant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
  class?: string
}

const props = withDefaults(defineProps<ModalProps>(), {
  size: 'md',
  showFooter: true,
  showCancel: true,
  showConfirm: true,
  cancelText: 'Cancel',
  confirmText: 'Confirm',
  confirmVariant: 'primary',
})

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const modalClass = computed(() => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  }

  return cn(
    'w-full transform overflow-hidden rounded-lg bg-secondary-900 border border-secondary-700 p-6 text-left align-middle shadow-xl transition-all',
    sizeClasses[props.size],
    props.class
  )
})

const closeModal = () => {
  emit('close')
}

const handleConfirm = () => {
  emit('confirm')
}
</script>
