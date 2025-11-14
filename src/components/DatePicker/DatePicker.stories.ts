import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import DatePicker from './DatePicker.vue'

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    range: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    showToday: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      return { date }
    },
    template: `
      <div class="w-96">
        <DatePicker v-model="date" label="Select Date" />
        <p class="mt-4 text-sm text-neutral-400">
          Selected: {{ date ? date.toLocaleDateString() : 'None' }}
        </p>
      </div>
    `,
  }),
}

export const WithDefaultValue: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref(new Date())
      return { date }
    },
    template: `
      <div class="w-96">
        <DatePicker v-model="date" label="Birth Date" />
      </div>
    `,
  }),
}

export const RangePicker: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const dateRange = ref<[Date, Date] | null>(null)
      return { dateRange }
    },
    template: `
      <div class="w-96">
        <DatePicker v-model="dateRange" label="Date Range" range />
        <p v-if="dateRange" class="mt-4 text-sm text-neutral-400">
          From: {{ dateRange[0].toLocaleDateString() }}<br />
          To: {{ dateRange[1].toLocaleDateString() }}
        </p>
      </div>
    `,
  }),
}

export const RangeWithDefaultValue: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const today = new Date()
      const nextWeek = new Date(today)
      nextWeek.setDate(today.getDate() + 7)
      const dateRange = ref<[Date, Date]>([today, nextWeek])
      return { dateRange }
    },
    template: `
      <div class="w-96">
        <DatePicker v-model="dateRange" label="Vacation Period" range />
      </div>
    `,
  }),
}

export const CustomFormat: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      return { date }
    },
    template: `
      <div class="w-96 space-y-4">
        <DatePicker v-model="date" label="US Format (MM/DD/YYYY)" format="MM/DD/YYYY" />
        <DatePicker v-model="date" label="EU Format (DD/MM/YYYY)" format="DD/MM/YYYY" />
        <DatePicker v-model="date" label="ISO Format (YYYY-MM-DD)" format="YYYY-MM-DD" />
      </div>
    `,
  }),
}

export const WithPlaceholder: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      return { date }
    },
    template: `
      <div class="w-96">
        <DatePicker
          v-model="date"
          label="Appointment Date"
          placeholder="Choose a date for your appointment"
        />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const sm = ref<Date | null>(null)
      const md = ref<Date | null>(null)
      const lg = ref<Date | null>(null)
      return { sm, md, lg }
    },
    template: `
      <div class="w-96 space-y-4">
        <DatePicker v-model="sm" label="Small" size="sm" />
        <DatePicker v-model="md" label="Medium" size="md" />
        <DatePicker v-model="lg" label="Large" size="lg" />
      </div>
    `,
  }),
}

export const WithMinMaxDate: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      const today = new Date()
      const minDate = new Date(today)
      minDate.setDate(today.getDate() - 7)
      const maxDate = new Date(today)
      maxDate.setDate(today.getDate() + 7)
      return { date, minDate, maxDate }
    },
    template: `
      <div class="w-96">
        <DatePicker
          v-model="date"
          label="Available Dates"
          :min-date="minDate"
          :max-date="maxDate"
          hint="Only dates within ±7 days are selectable"
        />
      </div>
    `,
  }),
}

export const FutureOnlyDates: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return { date, today }
    },
    template: `
      <div class="w-96">
        <DatePicker
          v-model="date"
          label="Event Date"
          :min-date="today"
          hint="Only future dates can be selected"
        />
      </div>
    `,
  }),
}

export const PastOnlyDates: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return { date, today }
    },
    template: `
      <div class="w-96">
        <DatePicker
          v-model="date"
          label="Birth Date"
          :max-date="today"
          hint="Only past dates can be selected"
        />
      </div>
    `,
  }),
}

export const DisabledDates: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      const today = new Date()
      const disabledDates = [
        new Date(today.getFullYear(), today.getMonth(), 10),
        new Date(today.getFullYear(), today.getMonth(), 15),
        new Date(today.getFullYear(), today.getMonth(), 20),
      ]
      return { date, disabledDates }
    },
    template: `
      <div class="w-96">
        <DatePicker
          v-model="date"
          label="Booking Date"
          :disabled-dates="disabledDates"
          hint="Some dates are already booked"
        />
      </div>
    `,
  }),
}

export const WithHint: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      return { date }
    },
    template: `
      <div class="w-96">
        <DatePicker
          v-model="date"
          label="Deadline"
          hint="Choose when you want to complete this task"
        />
      </div>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      return { date }
    },
    template: `
      <div class="w-96">
        <DatePicker
          v-model="date"
          label="Required Date"
          error
          error-message="Please select a date"
          required
        />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref(new Date())
      return { date }
    },
    template: `
      <div class="w-96">
        <DatePicker v-model="date" label="Locked Date" disabled />
      </div>
    `,
  }),
}

export const NotClearable: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref(new Date())
      return { date }
    },
    template: `
      <div class="w-96">
        <DatePicker
          v-model="date"
          label="Permanent Date"
          :clearable="false"
          hint="This date cannot be cleared"
        />
      </div>
    `,
  }),
}

export const NoTodayButton: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref<Date | null>(null)
      return { date }
    },
    template: `
      <div class="w-96">
        <DatePicker
          v-model="date"
          label="Custom Date"
          :show-today="false"
        />
      </div>
    `,
  }),
}

export const WithClearButton: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const date = ref(new Date())
      return { date }
    },
    template: `
      <div class="w-96">
        <DatePicker
          v-model="date"
          label="Flexible Date"
          show-clear
        />
      </div>
    `,
  }),
}

export const BookingForm: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const checkIn = ref<Date | null>(null)
      const checkOut = ref<Date | null>(null)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return { checkIn, checkOut, today }
    },
    template: `
      <div class="w-96 space-y-4">
        <h3 class="text-lg font-semibold text-white">Hotel Booking</h3>
        <DatePicker
          v-model="checkIn"
          label="Check-in Date"
          :min-date="today"
          hint="Select your arrival date"
        />
        <DatePicker
          v-model="checkOut"
          label="Check-out Date"
          :min-date="checkIn || today"
          hint="Select your departure date"
        />
        <div v-if="checkIn && checkOut" class="p-3 bg-primary-500/10 rounded-lg border border-primary-500/30">
          <p class="text-sm text-neutral-300">
            Duration: {{ Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)) }} nights
          </p>
        </div>
      </div>
    `,
  }),
}

export const VacationPlanner: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const vacation = ref<[Date, Date] | null>(null)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      return { vacation, today }
    },
    template: `
      <div class="w-96">
        <h3 class="text-lg font-semibold text-white mb-4">Plan Your Vacation</h3>
        <DatePicker
          v-model="vacation"
          label="Vacation Period"
          range
          :min-date="today"
          hint="Select start and end dates for your vacation"
        />
        <div v-if="vacation" class="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-lg border border-blue-500/30">
          <h4 class="font-semibold text-white mb-2">Trip Summary</h4>
          <p class="text-sm text-neutral-300">
            From: {{ vacation[0].toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
          <p class="text-sm text-neutral-300">
            To: {{ vacation[1].toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
          </p>
          <p class="text-sm text-primary-400 font-semibold mt-2">
            Total: {{ Math.ceil((vacation[1].getTime() - vacation[0].getTime()) / (1000 * 60 * 60 * 24)) + 1 }} days
          </p>
        </div>
      </div>
    `,
  }),
}

export const EventScheduler: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const eventDate = ref<Date | null>(null)
      const today = new Date()
      const minDate = new Date(today)
      minDate.setDate(today.getDate() + 7) // Events must be at least 7 days in the future

      // Block weekends
      const disabledDates: Date[] = []
      for (let i = 0; i < 90; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        if (date.getDay() === 0 || date.getDay() === 6) {
          disabledDates.push(date)
        }
      }

      return { eventDate, minDate, disabledDates }
    },
    template: `
      <div class="w-96">
        <DatePicker
          v-model="eventDate"
          label="Event Date"
          :min-date="minDate"
          :disabled-dates="disabledDates"
          hint="Events must be scheduled at least 7 days in advance, weekdays only"
        />
      </div>
    `,
  }),
}
