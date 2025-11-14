import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Select from './Select.vue'

const meta = {
  title: 'Components/Select',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    multiple: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta
type Story = StoryObj

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'de', label: 'Germany' },
  { value: 'fr', label: 'France' },
  { value: 'it', label: 'Italy' },
  { value: 'es', label: 'Spain' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
]

export const Default: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref(null)
      return { selected, countries }
    },
    template: `
      <div class="w-[400px]">
        <Select
          v-model="selected"
          :options="countries"
          label="Country"
          placeholder="Search countries..."
        />
        <p class="mt-4 text-sm text-neutral-400">Selected: {{ selected?.label || 'None' }}</p>
      </div>
    `,
  }),
  args: {
    modelValue: null,
    options: [],
  },
}

export const WithHint: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref(null)
      return { selected, countries }
    },
    template: `
      <div class="w-[400px]">
        <Select
          v-model="selected"
          :options="countries"
          label="Country"
          hint="Select your country of residence"
          placeholder="Search countries..."
        />
      </div>
    `,
  }),
  args: {
    modelValue: null,
    options: [],
  },
}

export const WithError: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref(null)
      return { selected, countries }
    },
    template: `
      <div class="w-[400px]">
        <Select
          v-model="selected"
          :options="countries"
          label="Country"
          error
          error-message="Please select a country"
          placeholder="Search countries..."
        />
      </div>
    `,
  }),
  args: {
    modelValue: null,
    options: [],
  },
}

export const Clearable: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref(countries[0])
      return { selected, countries }
    },
    template: `
      <div class="w-[400px]">
        <Select
          v-model="selected"
          :options="countries"
          label="Country"
          placeholder="Search countries..."
          clearable
        />
        <p class="mt-4 text-sm text-neutral-400">Selected: {{ selected?.label || 'None' }}</p>
      </div>
    `,
  }),
  args: {
    modelValue: null,
    options: [],
  },
}

export const MultiSelect: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref([])
      return { selected, countries }
    },
    template: `
      <div class="w-[400px]">
        <Select
          v-model="selected"
          :options="countries"
          label="Countries"
          placeholder="Search countries..."
          multiple
          clearable
        />
        <p class="mt-4 text-sm text-neutral-400">Selected: {{ selected.length }} countries</p>
      </div>
    `,
  }),
  args: {
    modelValue: [],
    options: [],
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selectedSm = ref(null)
      const selectedMd = ref(null)
      const selectedLg = ref(null)
      return { selectedSm, selectedMd, selectedLg, countries }
    },
    template: `
      <div class="w-[400px] space-y-6">
        <Select
          v-model="selectedSm"
          :options="countries"
          label="Small"
          size="sm"
          placeholder="Search..."
        />
        <Select
          v-model="selectedMd"
          :options="countries"
          label="Medium"
          size="md"
          placeholder="Search..."
        />
        <Select
          v-model="selectedLg"
          :options="countries"
          label="Large"
          size="lg"
          placeholder="Search..."
        />
      </div>
    `,
  }),
  args: {
    modelValue: null,
    options: [],
  },
}

export const Disabled: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref(countries[0])
      return { selected, countries }
    },
    template: `
      <div class="w-[400px]">
        <Select
          v-model="selected"
          :options="countries"
          label="Country"
          placeholder="Search countries..."
          disabled
        />
      </div>
    `,
  }),
  args: {
    modelValue: null,
    options: [],
  },
}
