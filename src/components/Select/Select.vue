<template>
  <Combobox v-model="selected" :multiple="multiple" :disabled="disabled" nullable>
    <div :class="wrapperClass">
      <ComboboxLabel v-if="label" class="block text-sm font-medium text-neutral-300 mb-1.5">
        {{ label }}
        <span v-if="required" class="text-error-500 ml-1">*</span>
      </ComboboxLabel>

      <div class="relative">
        <ComboboxInput
          :class="inputClass"
          :placeholder="placeholder"
          :display-value="(value) => getDisplayValue(value as T | T[] | null)"
          @change="query = $event.target.value"
          @blur="handleBlur"
        />

        <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            class="h-5 w-5 text-neutral-400 transition-colors"
            :class="{ 'rotate-180': open }"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
              clip-rule="evenodd"
            />
          </svg>
        </ComboboxButton>

        <button
          v-if="clearable && selected && !disabled"
          type="button"
          class="absolute inset-y-0 right-8 flex items-center pr-2 text-neutral-400 hover:text-neutral-300"
          @click.stop="handleClear"
        >
          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ComboboxOptions :class="optionsClass">
            <div v-if="filteredOptions.length === 0 && query !== ''" class="relative cursor-default select-none py-3 px-4 text-neutral-400 text-center">
              {{ emptyMessage }}
            </div>

            <ComboboxOption
              v-for="option in filteredOptions"
              v-slot="{ active, selected: isSelected }"
              :key="getOptionValue(option)"
              :value="option"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-primary-500/20 text-white' : 'text-neutral-300',
                  'relative cursor-pointer select-none',
                  'py-2.5 pl-10 pr-4 mx-1 rounded-lg',
                  'transition-all duration-200',
                ]"
              >
                <span
                  :class="[
                    isSelected ? 'font-semibold' : 'font-normal',
                    'block truncate',
                  ]"
                >
                  {{ getOptionLabel(option) }}
                </span>
                <span
                  v-if="isSelected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-500"
                >
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </transition>
      </div>

      <p v-if="error && errorMessage" class="mt-1.5 text-sm text-error-500 flex items-center gap-1">
        <svg class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
        {{ errorMessage }}
      </p>

      <p v-else-if="hint" class="mt-1.5 text-sm text-neutral-400">
        {{ hint }}
      </p>
    </div>
  </Combobox>
</template>

<script setup lang="ts" generic="T extends Record<string, any> | string">
import { computed, ref } from 'vue'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'
import { cn } from '@/utils/cn'

export interface SelectProps<T = any> {
  modelValue?: T | T[]
  options: T[]
  label?: string
  placeholder?: string
  hint?: string
  errorMessage?: string
  emptyMessage?: string
  disabled?: boolean
  required?: boolean
  error?: boolean
  clearable?: boolean
  multiple?: boolean
  searchable?: boolean
  valueKey?: string
  labelKey?: string
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  placeholder: 'Search or select...',
  emptyMessage: 'No options found',
  valueKey: 'value',
  labelKey: 'label',
  size: 'md',
  error: false,
  disabled: false,
  required: false,
  clearable: false,
  multiple: false,
  searchable: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: T | T[] | null]
  blur: []
}>()

const query = ref('')
const open = ref(false)

const selected = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value ?? null),
})

const getOptionValue = (option: T): string => {
  if (typeof option === 'string') return option
  return option[props.valueKey as keyof T] as string
}

const getOptionLabel = (option: T): string => {
  if (typeof option === 'string') return option
  return option[props.labelKey as keyof T] as string
}

const getDisplayValue = (value: T | T[] | null): string => {
  if (!value) return ''

  if (props.multiple && Array.isArray(value)) {
    if (value.length === 0) return ''
    if (value.length === 1) return getOptionLabel(value[0])
    return `${value.length} selected`
  }

  return getOptionLabel(value as T)
}

const filteredOptions = computed(() => {
  if (!props.searchable || query.value === '') {
    return props.options
  }

  const searchQuery = query.value.toLowerCase()
  return props.options.filter((option) => {
    const label = getOptionLabel(option).toLowerCase()
    return label.includes(searchQuery)
  })
})

const handleClear = () => {
  selected.value = props.multiple ? [] : null
  query.value = ''
}

const handleBlur = () => {
  emit('blur')
}

const wrapperClass = computed(() => cn('w-full', props.class))

const inputClass = computed(() => {
  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-base',
    lg: 'h-12 px-5 text-lg',
  }

  return cn(
    'w-full',
    'rounded-lg border',
    'bg-neutral-900/50 backdrop-blur-sm',
    'text-white placeholder-neutral-500',
    'outline-none',
    'transition-all duration-200',
    'focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-0',
    'focus:bg-neutral-900/70',
    'focus:border-primary-500',
    props.error
      ? 'border-red-500/50 focus:border-red-400'
      : 'border-white/10 hover:border-primary-500/40',
    props.disabled && 'opacity-50 cursor-not-allowed bg-neutral-900/30',
    sizeClasses[props.size]
  )
})

const optionsClass = computed(() => {
  return cn(
    'absolute z-10 mt-2 max-h-60 w-full overflow-auto',
    'rounded-lg',
    'bg-neutral-900/95 backdrop-blur-xl',
    'border border-white/10',
    'py-2 text-base',
    'shadow-[0_12px_24px_-4px_rgba(0,0,0,0.4),0_0_0_1px_rgba(59,130,246,0.1)]',
    'focus:outline-none'
  )
})
</script>
