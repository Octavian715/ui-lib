<template>
  <div :class="wrapperClass">
    <nav aria-label="Progress">
      <ol :class="listClass">
        <li
          v-for="(step, index) in steps"
          :key="index"
          :class="getStepItemClass(index)"
        >
          <!-- Connector Line -->
          <div
            v-if="index !== 0"
            :class="getConnectorClass(index)"
            aria-hidden="true"
          />

          <!-- Step Content -->
          <button
            type="button"
            :class="getStepButtonClass(index)"
            :disabled="!clickable"
            @click="handleStepClick(index)"
          >
            <!-- Step Icon/Number -->
            <span :class="getStepIndicatorClass(index)">
              <span v-if="getStepStatus(index) === 'completed'" :class="checkIconClass">
                <svg class="h-full w-full" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
              <span v-else-if="step.icon">
                <component :is="step.icon" class="h-full w-full" />
              </span>
              <span v-else>{{ index + 1 }}</span>
            </span>

            <!-- Step Label -->
            <div v-if="orientation === 'horizontal' || showLabels" :class="getLabelWrapperClass(index)">
              <span :class="getLabelClass(index)">{{ step.label }}</span>
              <span v-if="step.description" :class="getDescriptionClass(index)">
                {{ step.description }}
              </span>
            </div>
          </button>
        </li>
      </ol>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/utils/cn'

export interface Step {
  label: string
  description?: string
  icon?: any
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'simple' | 'circles'
  size?: 'sm' | 'md' | 'lg'
  clickable?: boolean
  showLabels?: boolean
  class?: string
}

const props = withDefaults(defineProps<StepperProps>(), {
  orientation: 'horizontal',
  variant: 'default',
  size: 'md',
  clickable: false,
  showLabels: true,
})

const emit = defineEmits<{
  'update:currentStep': [step: number]
  'step-click': [step: number]
}>()

const getStepStatus = (index: number): 'completed' | 'current' | 'upcoming' => {
  if (index < props.currentStep) return 'completed'
  if (index === props.currentStep) return 'current'
  return 'upcoming'
}

const handleStepClick = (index: number) => {
  if (!props.clickable) return
  emit('update:currentStep', index)
  emit('step-click', index)
}

const wrapperClass = computed(() => cn('w-full', props.class))

const listClass = computed(() => {
  if (props.orientation === 'horizontal') {
    return cn('flex items-center justify-between')
  }
  return cn('space-y-4')
})

const getStepItemClass = (index: number) => {
  if (props.orientation === 'horizontal') {
    return cn('relative flex-1', index !== 0 && 'pl-8')
  }
  return cn('relative flex items-start')
}

const getConnectorClass = (index: number) => {
  const status = getStepStatus(index - 1)
  const isCompleted = status === 'completed'

  if (props.orientation === 'horizontal') {
    return cn(
      'absolute top-1/2 left-0 -translate-y-1/2',
      'w-full h-0.5',
      isCompleted ? 'bg-primary-500' : 'bg-neutral-800'
    )
  }

  return cn(
    'absolute left-4 top-4 -ml-px h-full w-0.5',
    isCompleted ? 'bg-primary-500' : 'bg-neutral-800'
  )
}

const getStepButtonClass = (index: number) => {
  const status = getStepStatus(index)

  return cn(
    'relative group',
    'flex items-center gap-3',
    props.orientation === 'horizontal' && 'flex-col text-center',
    props.clickable && 'cursor-pointer hover:opacity-80',
    !props.clickable && 'cursor-default',
    'transition-opacity duration-200',
    status === 'upcoming' && 'opacity-60'
  )
}

const getStepIndicatorClass = (index: number) => {
  const status = getStepStatus(index)

  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
  }

  const statusClasses = {
    completed: 'bg-primary-500 text-white border-primary-500',
    current: 'bg-primary-500 text-white border-primary-500 ring-4 ring-primary-500/20',
    upcoming: 'bg-neutral-900 text-neutral-400 border-neutral-700',
  }

  return cn(
    'flex items-center justify-center',
    'rounded-full border-2',
    'font-semibold text-sm',
    'relative z-10',
    'transition-all duration-200',
    sizeClasses[props.size],
    statusClasses[status]
  )
}

const checkIconClass = computed(() => 'h-4 w-4')

const getLabelWrapperClass = (_index: number) => {
  if (props.orientation === 'horizontal') {
    return cn('mt-2')
  }
  return cn('flex-1 min-w-0')
}

const getLabelClass = (index: number) => {
  const status = getStepStatus(index)

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  return cn(
    'block font-medium',
    status === 'current' ? 'text-white' : 'text-neutral-400',
    sizeClasses[props.size]
  )
}

const getDescriptionClass = (_index: number) => {
  return cn(
    'block text-xs text-neutral-500 mt-0.5',
    props.orientation === 'horizontal' && 'hidden sm:block'
  )
}
</script>
