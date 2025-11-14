<template>
  <Listbox v-model="selected" :disabled="disabled">
    <div class="relative">
      <ListboxLabel v-if="label" class="block text-sm font-medium text-gray-300 mb-1">
        {{ label }}
      </ListboxLabel>

      <ListboxButton
        :class="buttonClass"
      >
        <span class="block truncate">
          {{ displayValue }}
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <svg
            class="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          :class="optionsClass"
        >
          <ListboxOption
            v-for="option in options"
            v-slot="{ active, selected: isSelected }"
            :key="getOptionValue(option)"
            :value="option"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-primary-500/20 text-white' : 'text-gray-300',
                'relative cursor-pointer select-none',
                'py-2.5 pl-10 pr-4 mx-1 rounded-lg',
                'transition-all duration-200',
              ]"
            >
              <span
                :class="[
                  isSelected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
              >
                {{ getOptionLabel(option) }}
              </span>
              <span
                v-if="isSelected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-500"
              >
                <svg
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts" generic="T extends Record<string, any> | string">
import { computed } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { cn } from '@/utils/cn'

export interface DropdownProps<T = any> {
  modelValue?: T
  options: T[]
  label?: string
  placeholder?: string
  disabled?: boolean
  valueKey?: string
  labelKey?: string
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  class?: string
}

const props = withDefaults(defineProps<DropdownProps>(), {
  placeholder: 'Select an option',
  valueKey: 'value',
  labelKey: 'label',
  size: 'md',
  error: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: T | undefined]
}>()

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const getOptionValue = (option: T): string => {
  if (typeof option === 'string') return option
  return option[props.valueKey as keyof T] as string
}

const getOptionLabel = (option: T): string => {
  if (typeof option === 'string') return option
  return option[props.labelKey as keyof T] as string
}

const displayValue = computed(() => {
  if (!selected.value) return props.placeholder
  return getOptionLabel(selected.value)
})

const buttonClass = computed(() => {
  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-4 text-lg',
  }

  return cn(
    // Modern button with subtle glass effect
    'relative w-full cursor-pointer',
    'rounded-xl',
    'bg-neutral-800/50 backdrop-blur-sm',
    'text-left border',
    'transition-all duration-250',
    'focus:outline-none focus:ring-3 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-neutral-950',
    'hover:bg-neutral-800/70',
    props.error
      ? 'border-red-500 hover:border-red-400'
      : 'border-white/10 hover:border-white/20',
    props.disabled && 'opacity-40 cursor-not-allowed',
    sizeClasses[props.size],
    props.class
  )
})

const optionsClass = computed(() => {
  return cn(
    // Modern dropdown with glassmorphism
    'absolute z-10 mt-2 max-h-60 w-full overflow-auto',
    'rounded-xl',
    'bg-neutral-900/95 backdrop-blur-xl',
    'border border-white/10',
    'py-2 text-base',
    'shadow-[0_12px_24px_-4px_rgba(0,0,0,0.4),0_0_0_1px_rgba(168,85,247,0.1)]',
    'focus:outline-none sm:text-sm'
  )
})
</script>
