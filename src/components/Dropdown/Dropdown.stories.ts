import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Dropdown from './Dropdown.vue'

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown as any,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<any>

export default meta
type Story = StoryObj<typeof meta>

export const Simple: Story = {
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const selected = ref<string>()
      const options = [
        'Option 1',
        'Option 2',
        'Option 3',
        'Option 4',
        'Option 5',
      ]

      return { args, selected, options }
    },
    template: `
      <div class="w-72">
        <Dropdown
          v-bind="args"
          v-model="selected"
          :options="options"
        />
        <p class="mt-4 text-sm text-gray-400">Selected: {{ selected || 'None' }}</p>
      </div>
    `,
  }),
  args: {
    label: 'Choose an option',
    placeholder: 'Select...',
    options: [],
  },
}

export const WithObjects: Story = {
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const selected = ref()
      const options = [
        { id: 1, name: 'Wade Cooper', role: 'Admin' },
        { id: 2, name: 'Arlene Mccoy', role: 'Member' },
        { id: 3, name: 'Devon Webb', role: 'Member' },
        { id: 4, name: 'Tom Cook', role: 'Admin' },
        { id: 5, name: 'Tanya Fox', role: 'Member' },
      ]

      return { args, selected, options }
    },
    template: `
      <div class="w-72">
        <Dropdown
          v-bind="args"
          v-model="selected"
          :options="options"
          value-key="id"
          label-key="name"
        />
        <p class="mt-4 text-sm text-gray-400">Selected: {{ selected?.name || 'None' }}</p>
      </div>
    `,
  }),
  args: {
    label: 'Assign to',
    placeholder: 'Select a person...',
    options: [],
  },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const selectedSm = ref<string>()
      const selectedMd = ref<string>()
      const selectedLg = ref<string>()
      const options = ['Small', 'Medium', 'Large']

      return { args, selectedSm, selectedMd, selectedLg, options }
    },
    template: `
      <div class="space-y-4 w-72">
        <Dropdown
          v-model="selectedSm"
          :options="options"
          label="Small"
          size="sm"
        />
        <Dropdown
          v-model="selectedMd"
          :options="options"
          label="Medium"
          size="md"
        />
        <Dropdown
          v-model="selectedLg"
          :options="options"
          label="Large"
          size="lg"
        />
      </div>
    `,
  }),
  args: {
    options: [],
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const selected = ref<string>()
      const options = ['Option 1', 'Option 2', 'Option 3']

      return { args, selected, options }
    },
    template: `
      <div class="w-72">
        <Dropdown
          v-bind="args"
          v-model="selected"
          :options="options"
        />
        <p class="mt-1 text-sm text-red-500">This field is required</p>
      </div>
    `,
  }),
  args: {
    label: 'Required field',
    placeholder: 'Please select...',
    error: true,
    options: [],
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const selected = ref<string>('Option 2')
      const options = ['Option 1', 'Option 2', 'Option 3']

      return { args, selected, options }
    },
    template: `
      <div class="w-72">
        <Dropdown
          v-bind="args"
          v-model="selected"
          :options="options"
        />
      </div>
    `,
  }),
  args: {
    label: 'Disabled dropdown',
    disabled: true,
    options: [],
  },
}

export const Categories: Story = {
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const selected = ref()
      const options = [
        { value: 'web', label: '🌐 Web Development' },
        { value: 'mobile', label: '📱 Mobile Development' },
        { value: 'backend', label: '⚙️ Backend Development' },
        { value: 'devops', label: '🚀 DevOps' },
        { value: 'design', label: '🎨 Design' },
      ]

      return { args, selected, options }
    },
    template: `
      <div class="w-72">
        <Dropdown
          v-bind="args"
          v-model="selected"
          :options="options"
        />
        <p class="mt-4 text-sm text-gray-400">Selected: {{ selected?.label || 'None' }}</p>
      </div>
    `,
  }),
  args: {
    label: 'Select a category',
    placeholder: 'Choose...',
    options: [],
  },
}

export const LongList: Story = {
  render: (args) => ({
    components: { Dropdown },
    setup() {
      const selected = ref<string>()
      const options = Array.from({ length: 50 }, (_, i) => `Option ${i + 1}`)

      return { args, selected, options }
    },
    template: `
      <div class="w-72">
        <Dropdown
          v-bind="args"
          v-model="selected"
          :options="options"
        />
        <p class="mt-4 text-sm text-gray-400">Selected: {{ selected || 'None' }}</p>
      </div>
    `,
  }),
  args: {
    label: 'Scrollable list',
    placeholder: 'Select from many options...',
    options: [],
  },
}
