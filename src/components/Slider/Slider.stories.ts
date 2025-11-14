import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Slider from './Slider.vue'

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
    disabled: {
      control: 'boolean',
    },
    showValue: {
      control: 'boolean',
    },
    showMinMax: {
      control: 'boolean',
    },
    marks: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(50)
      return { value }
    },
    template: `
      <div class="w-96">
        <Slider v-model="value" label="Volume" />
        <p class="mt-4 text-sm text-neutral-400">Value: {{ value }}</p>
      </div>
    `,
  }),
}

export const WithValue: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(30)
      return { value }
    },
    template: `
      <div class="w-96">
        <Slider v-model="value" label="Brightness" show-value />
      </div>
    `,
  }),
}

export const WithMinMax: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(75)
      return { value }
    },
    template: `
      <div class="w-96">
        <Slider v-model="value" label="Temperature" show-min-max show-value />
      </div>
    `,
  }),
}

export const CustomRange: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(25)
      return { value }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="value"
          label="Age"
          :min="18"
          :max="100"
          show-min-max
          show-value
        />
      </div>
    `,
  }),
}

export const WithStep: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(50)
      return { value }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="value"
          label="Price"
          :min="0"
          :max="1000"
          :step="50"
          show-value
          show-min-max
        />
        <p class="mt-2 text-sm text-neutral-400">Increments of 50</p>
      </div>
    `,
  }),
}

export const RangeSlider: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const range = ref([25, 75])
      return { range }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="range"
          label="Price Range"
          range
          show-value
          show-min-max
        />
        <p class="mt-4 text-sm text-neutral-400">
          Range: {{ range[0] }} - {{ range[1] }}
        </p>
      </div>
    `,
  }),
}

export const RangeWithCustomMinMax: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const range = ref([100, 500])
      return { range }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="range"
          label="Budget Range"
          range
          :min="0"
          :max="1000"
          :step="10"
          show-value
          show-min-max
          :format-value="(v) => '$' + v"
        />
      </div>
    `,
  }),
}

export const WithMarks: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(50)
      return { value }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="value"
          label="Quality"
          marks
          show-value
        />
      </div>
    `,
  }),
}

export const CustomMarks: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(50)
      const marks = [
        { value: 0, label: 'Low' },
        { value: 25, label: 'Medium' },
        { value: 50, label: 'High' },
        { value: 75, label: 'Very High' },
        { value: 100, label: 'Max' },
      ]
      return { value, marks }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="value"
          label="Performance"
          :marks="marks"
          show-mark-labels
          show-value
        />
      </div>
    `,
  }),
}

export const Colors: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const primary = ref(50)
      const success = ref(60)
      const warning = ref(70)
      const danger = ref(80)
      const info = ref(40)
      return { primary, success, warning, danger, info }
    },
    template: `
      <div class="w-96 space-y-6">
        <Slider v-model="primary" label="Primary" color="primary" show-value />
        <Slider v-model="success" label="Success" color="success" show-value />
        <Slider v-model="warning" label="Warning" color="warning" show-value />
        <Slider v-model="danger" label="Danger" color="danger" show-value />
        <Slider v-model="info" label="Info" color="info" show-value />
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const sm = ref(30)
      const md = ref(50)
      const lg = ref(70)
      return { sm, md, lg }
    },
    template: `
      <div class="w-96 space-y-6">
        <Slider v-model="sm" label="Small" size="sm" show-value />
        <Slider v-model="md" label="Medium" size="md" show-value />
        <Slider v-model="lg" label="Large" size="lg" show-value />
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(60)
      return { value }
    },
    template: `
      <div class="w-96">
        <Slider v-model="value" label="Disabled Slider" disabled show-value />
      </div>
    `,
  }),
}

export const WithHint: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(45)
      return { value }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="value"
          label="Completion"
          hint="Drag to adjust completion percentage"
          show-value
        />
      </div>
    `,
  }),
}

export const WithError: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const value = ref(10)
      return { value }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="value"
          label="Minimum threshold"
          error
          error-message="Value must be at least 20"
          show-value
        />
      </div>
    `,
  }),
}

export const FormattedValue: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const temperature = ref(22)
      const formatTemp = (value: number) => `${value}°C`
      return { temperature, formatTemp }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="temperature"
          label="Temperature"
          :min="0"
          :max="40"
          :format-value="formatTemp"
          show-value
          show-min-max
        />
      </div>
    `,
  }),
}

export const VolumeControl: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const volume = ref(75)
      const formatVolume = (value: number) => `${value}%`
      return { volume, formatVolume }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="volume"
          label="Volume Control"
          color="info"
          :format-value="formatVolume"
          marks
          show-value
          show-min-max
        />
      </div>
    `,
  }),
}

export const PriceFilter: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const priceRange = ref([200, 800])
      const formatPrice = (value: number) => `$${value}`
      return { priceRange, formatPrice }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="priceRange"
          label="Price Filter"
          range
          :min="0"
          :max="1000"
          :step="10"
          :format-value="formatPrice"
          show-value
          show-min-max
        />
        <p class="mt-4 text-sm text-neutral-300">
          Showing products from {{ formatPrice(priceRange[0]) }} to {{ formatPrice(priceRange[1]) }}
        </p>
      </div>
    `,
  }),
}

export const RangeWithMarks: Story = {
  render: () => ({
    components: { Slider },
    setup() {
      const range = ref([30, 70])
      const marks = [
        { value: 0, label: '0%' },
        { value: 25, label: '25%' },
        { value: 50, label: '50%' },
        { value: 75, label: '75%' },
        { value: 100, label: '100%' },
      ]
      return { range, marks }
    },
    template: `
      <div class="w-96">
        <Slider
          v-model="range"
          label="Confidence Interval"
          range
          :marks="marks"
          show-mark-labels
          show-value
          color="success"
        />
      </div>
    `,
  }),
}
