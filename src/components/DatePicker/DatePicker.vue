<template>
  <div :class="wrapperClass">
    <label v-if="label" :for="pickerId" :class="labelClass">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative">
      <!-- Input -->
      <button
        :id="pickerId"
        type="button"
        :class="inputClass"
        :disabled="disabled"
        @click="toggleCalendar"
      >
        <svg class="h-5 w-5 text-neutral-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clip-rule="evenodd" />
        </svg>
        <span v-if="displayValue" class="flex-1 text-left">{{ displayValue }}</span>
        <span v-else class="flex-1 text-left text-neutral-500">{{ placeholder }}</span>
        <svg v-if="selectedDate && clearable && !disabled" class="h-5 w-5 text-neutral-400 hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor" @click.stop="clearDate">
          <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
        </svg>
      </button>

      <!-- Calendar Dropdown -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="isOpen" :class="calendarClass">
          <!-- Calendar Header -->
          <div class="flex items-center justify-between p-3 border-b border-white/10">
            <button
              type="button"
              :class="navButtonClass"
              @click="previousMonth"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
              </svg>
            </button>

            <div class="flex gap-2">
              <select v-model="currentMonth" :class="selectClass">
                <option v-for="(month, index) in months" :key="index" :value="index">
                  {{ month }}
                </option>
              </select>
              <select v-model="currentYear" :class="selectClass">
                <option v-for="year in yearRange" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>

            <button
              type="button"
              :class="navButtonClass"
              @click="nextMonth"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- Weekday Headers -->
          <div class="grid grid-cols-7 gap-1 md:gap-1 p-3 md:p-2 border-b border-white/10">
            <div
              v-for="day in weekDays"
              :key="day"
              class="text-center text-sm md:text-xs font-semibold text-neutral-400 py-2"
            >
              {{ day }}
            </div>
          </div>

          <!-- Calendar Grid -->
          <div class="grid grid-cols-7 gap-1 md:gap-1 p-3 md:p-2">
            <button
              v-for="day in calendarDays"
              :key="`${day.date.getTime()}`"
              type="button"
              :class="getDayClass(day)"
              :disabled="!day.isCurrentMonth || isDateDisabled(day.date)"
              @click="selectDate(day.date)"
              @mouseenter="handleDayHover(day.date)"
            >
              {{ day.date.getDate() }}
            </button>
          </div>

          <!-- Footer Actions -->
          <div v-if="showToday || showClear" class="flex gap-2 p-3 border-t border-white/10">
            <button
              v-if="showToday"
              type="button"
              :class="footerButtonClass"
              @click="selectToday"
            >
              Today
            </button>
            <button
              v-if="showClear"
              type="button"
              :class="footerButtonClass"
              @click="clearDate"
            >
              Clear
            </button>
          </div>
        </div>
      </transition>
    </div>

    <p v-if="hint && !error" :class="hintClass">{{ hint }}</p>
    <p v-if="error && errorMessage" :class="errorClass">
      <svg class="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
      {{ errorMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import { cn } from '@/utils/cn'

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isToday: boolean
  isSelected: boolean
  isInRange: boolean
  isRangeStart: boolean
  isRangeEnd: boolean
}

interface DatePickerProps {
  modelValue?: Date | [Date, Date] | null
  range?: boolean
  label?: string
  placeholder?: string
  hint?: string
  errorMessage?: string
  format?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  required?: boolean
  error?: boolean
  clearable?: boolean
  showToday?: boolean
  showClear?: boolean
  minDate?: Date
  maxDate?: Date
  disabledDates?: Date[]
  class?: string
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  placeholder: 'Select date',
  format: 'MM/DD/YYYY',
  size: 'md',
  disabled: false,
  required: false,
  error: false,
  clearable: true,
  showToday: true,
  showClear: false,
  range: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | [Date, Date] | null]
  change: [value: Date | [Date, Date] | null]
}>()

const pickerId = ref(`datepicker-${Math.random().toString(36).substring(2, 9)}`)
const isOpen = ref(false)
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const hoverDate = ref<Date | null>(null)

const selectedDate = computed(() => props.modelValue)

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const yearRange = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = currentYear - 100; i <= currentYear + 10; i++) {
    years.push(i)
  }
  return years
})

// Format date for display
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return props.format
    .replace('DD', day)
    .replace('MM', month)
    .replace('YYYY', String(year))
}

const displayValue = computed(() => {
  if (!selectedDate.value) return ''

  if (props.range && Array.isArray(selectedDate.value)) {
    const [start, end] = selectedDate.value
    return `${formatDate(start)} - ${formatDate(end)}`
  }

  if (selectedDate.value instanceof Date) {
    return formatDate(selectedDate.value)
  }

  return ''
})

// Calendar calculations
const calendarDays = computed<CalendarDay[]>(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const lastDay = new Date(currentYear.value, currentMonth.value + 1, 0)
  const prevLastDay = new Date(currentYear.value, currentMonth.value, 0)

  const firstDayWeek = firstDay.getDay()
  const lastDate = lastDay.getDate()
  const prevLastDate = prevLastDay.getDate()

  const days: CalendarDay[] = []

  // Previous month days
  for (let i = firstDayWeek; i > 0; i--) {
    const date = new Date(currentYear.value, currentMonth.value - 1, prevLastDate - i + 1)
    days.push(createCalendarDay(date, false))
  }

  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    const date = new Date(currentYear.value, currentMonth.value, i)
    days.push(createCalendarDay(date, true))
  }

  // Next month days
  const remainingDays = 42 - days.length
  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(currentYear.value, currentMonth.value + 1, i)
    days.push(createCalendarDay(date, false))
  }

  return days
})

const createCalendarDay = (date: Date, isCurrentMonth: boolean): CalendarDay => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)

  const isToday = checkDate.getTime() === today.getTime()
  let isSelected = false
  let isInRange = false
  let isRangeStart = false
  let isRangeEnd = false

  if (selectedDate.value) {
    if (props.range && Array.isArray(selectedDate.value)) {
      const [start, end] = selectedDate.value
      const startTime = new Date(start).setHours(0, 0, 0, 0)
      const endTime = new Date(end).setHours(0, 0, 0, 0)
      const dateTime = checkDate.getTime()

      isRangeStart = dateTime === startTime
      isRangeEnd = dateTime === endTime
      isSelected = isRangeStart || isRangeEnd
      isInRange = dateTime >= startTime && dateTime <= endTime

      // Handle hover state for incomplete range selection
      if (hoverDate.value && (!end || start.getTime() === end.getTime())) {
        const hoverTime = new Date(hoverDate.value).setHours(0, 0, 0, 0)
        if (dateTime > startTime && dateTime <= hoverTime) {
          isInRange = true
        }
      }
    } else if (selectedDate.value instanceof Date) {
      const selectedTime = new Date(selectedDate.value).setHours(0, 0, 0, 0)
      isSelected = checkDate.getTime() === selectedTime
    }
  }

  return {
    date,
    isCurrentMonth,
    isToday,
    isSelected,
    isInRange,
    isRangeStart,
    isRangeEnd,
  }
}

const isDateDisabled = (date: Date): boolean => {
  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)

  if (props.minDate) {
    const minDate = new Date(props.minDate)
    minDate.setHours(0, 0, 0, 0)
    if (checkDate < minDate) return true
  }

  if (props.maxDate) {
    const maxDate = new Date(props.maxDate)
    maxDate.setHours(0, 0, 0, 0)
    if (checkDate > maxDate) return true
  }

  if (props.disabledDates) {
    return props.disabledDates.some(disabledDate => {
      const disabled = new Date(disabledDate)
      disabled.setHours(0, 0, 0, 0)
      return checkDate.getTime() === disabled.getTime()
    })
  }

  return false
}

// Range selection state
const rangeSelectionStart = ref<Date | null>(null)

const selectDate = (date: Date) => {
  if (props.range) {
    if (!rangeSelectionStart.value) {
      // Start new range
      rangeSelectionStart.value = date
      emit('update:modelValue', [date, date])
    } else {
      // Complete range
      const start = rangeSelectionStart.value
      const end = date

      if (end < start) {
        emit('update:modelValue', [end, start])
      } else {
        emit('update:modelValue', [start, end])
      }

      emit('change', Array.isArray(props.modelValue) ? props.modelValue : null)
      rangeSelectionStart.value = null
      isOpen.value = false
    }
  } else {
    emit('update:modelValue', date)
    emit('change', date)
    isOpen.value = false
  }
}

const handleDayHover = (date: Date) => {
  if (props.range && rangeSelectionStart.value) {
    hoverDate.value = date
  }
}

const toggleCalendar = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const selectToday = () => {
  const today = new Date()
  if (props.range) {
    const newValue: [Date, Date] = [today, today]
    emit('update:modelValue', newValue)
    emit('change', newValue)
    rangeSelectionStart.value = null
  } else {
    emit('update:modelValue', today)
    emit('change', today)
  }
  isOpen.value = false
}

const clearDate = () => {
  emit('update:modelValue', null)
  emit('change', null)
  rangeSelectionStart.value = null
  hoverDate.value = null
}

// Close calendar on outside click
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const calendar = document.getElementById(pickerId.value)?.parentElement
  if (calendar && !calendar.contains(target)) {
    isOpen.value = false
    rangeSelectionStart.value = null
    hoverDate.value = null
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Update calendar month when date is selected
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    const date = Array.isArray(newValue) ? newValue[0] : newValue
    if (date instanceof Date) {
      currentMonth.value = date.getMonth()
      currentYear.value = date.getFullYear()
    }
  }
})

// Classes
const wrapperClass = computed(() => cn('w-full', props.class))

const labelClass = computed(() =>
  cn('block text-sm font-medium text-neutral-200 mb-2')
)

const inputClass = computed(() => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg',
  }

  return cn(
    'w-full flex items-center gap-2',
    'bg-neutral-900/50 backdrop-blur-sm',
    'border-2 rounded-lg',
    'transition-all duration-200',
    props.error
      ? 'border-red-500/50 focus:border-red-400'
      : 'border-white/10 hover:border-white/20 focus:border-primary-500',
    'text-neutral-200',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 focus:ring-offset-neutral-950',
    props.disabled && 'opacity-50 cursor-not-allowed',
    !props.disabled && 'cursor-pointer',
    sizeClasses[props.size]
  )
})

const calendarClass = computed(() =>
  cn(
    'absolute z-50 mt-2',
    'bg-neutral-900 border-2 border-white/10 rounded-lg',
    'shadow-2xl backdrop-blur-sm',
    // Responsive width: full width on mobile, min 320px on desktop
    'w-full md:w-auto md:min-w-[320px]',
    // Better mobile positioning
    'left-0 right-0 md:left-auto md:right-auto',
    // Max width on mobile to prevent overflow
    'max-w-[calc(100vw-2rem)] md:max-w-none'
  )
)

const navButtonClass = computed(() =>
  cn(
    // Larger touch targets on mobile
    'p-2 md:p-1.5 rounded-md',
    'text-neutral-400 hover:text-white hover:bg-white/10',
    'transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
    // Larger icon on mobile
    'min-w-[40px] md:min-w-0 min-h-[40px] md:min-h-0 flex items-center justify-center'
  )
)

const selectClass = computed(() =>
  cn(
    // Better touch targets
    'px-2 py-1.5 md:py-1 rounded-md',
    'bg-neutral-800 border border-white/10',
    // Responsive font size
    'text-neutral-200 text-base md:text-sm font-medium',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
    'cursor-pointer',
    // Minimum touch target size on mobile
    'min-h-[40px] md:min-h-0'
  )
)

const getDayClass = (day: CalendarDay) => {
  return cn(
    // Larger touch targets on mobile
    'h-10 w-10 md:h-9 md:w-9 rounded-lg',
    // Responsive font size
    'text-base md:text-sm font-medium',
    'transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
    // Current month vs other months
    day.isCurrentMonth ? 'text-neutral-200' : 'text-neutral-600',
    // Today
    day.isToday && !day.isSelected && 'ring-2 ring-primary-500/30',
    // Selected
    day.isSelected && 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold',
    // Range
    day.isInRange && !day.isSelected && 'bg-primary-500/20',
    day.isRangeStart && 'rounded-l-lg',
    day.isRangeEnd && 'rounded-r-lg',
    // Better touch feedback on mobile
    !day.isSelected && day.isCurrentMonth && !isDateDisabled(day.date) && 'active:bg-white/20 md:hover:bg-white/10',
    // Disabled
    (!day.isCurrentMonth || isDateDisabled(day.date)) && 'cursor-not-allowed opacity-50',
    day.isCurrentMonth && !isDateDisabled(day.date) && 'cursor-pointer'
  )
}

const footerButtonClass = computed(() =>
  cn(
    'flex-1 px-3 py-2 md:py-1.5',
    // Better font size on mobile
    'text-base md:text-sm font-medium text-neutral-300',
    'bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-600',
    'border border-white/10 rounded-lg',
    'transition-colors duration-150',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
    // Minimum touch target
    'min-h-[44px] md:min-h-0'
  )
)

const hintClass = computed(() => cn('mt-1.5 text-sm text-neutral-400'))
const errorClass = computed(() => cn('mt-1.5 text-sm text-error-500 flex items-center gap-1'))
</script>
