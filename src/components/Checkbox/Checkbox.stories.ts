import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Checkbox from './Checkbox.vue'

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: `
      <div class="w-96">
        <Checkbox v-bind="args" v-model="checked" />
        <p class="mt-4 text-sm text-gray-400">Checked: {{ checked }}</p>
      </div>
    `,
  }),
  args: {
    label: 'Accept terms and conditions',
  },
}

export const WithHint: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: `
      <div class="w-96">
        <Checkbox v-bind="args" v-model="checked" />
      </div>
    `,
  }),
  args: {
    label: 'Subscribe to newsletter',
    hint: 'You can unsubscribe at any time',
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: `
      <div class="w-96">
        <Checkbox v-bind="args" v-model="checked" />
      </div>
    `,
  }),
  args: {
    label: 'I agree to the terms',
    error: true,
    errorMessage: 'You must accept the terms to continue',
  },
}

export const Required: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: `
      <div class="w-96">
        <Checkbox v-bind="args" v-model="checked" />
      </div>
    `,
  }),
  args: {
    label: 'Required field',
    required: true,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: `
      <div class="w-96">
        <Checkbox v-bind="args" v-model="checked" />
      </div>
    `,
  }),
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checkedSm = ref(true)
      const checkedMd = ref(true)
      const checkedLg = ref(true)
      return { args, checkedSm, checkedMd, checkedLg }
    },
    template: `
      <div class="w-96 space-y-4">
        <Checkbox v-model="checkedSm" label="Small checkbox" size="sm" />
        <Checkbox v-model="checkedMd" label="Medium checkbox" size="md" />
        <Checkbox v-model="checkedLg" label="Large checkbox" size="lg" />
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: `
      <div class="w-96">
        <Checkbox v-model="checked">
          <div>
            <p class="font-semibold text-white">Custom content</p>
            <p class="text-sm text-gray-400">You can use slots for rich content</p>
          </div>
        </Checkbox>
      </div>
    `,
  }),
}

export const CheckboxGroup: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const selections = ref({
        feature1: false,
        feature2: true,
        feature3: false,
        feature4: true,
      })
      return { args, selections }
    },
    template: `
      <div class="w-96">
        <h3 class="text-lg font-semibold text-white mb-4">Select features</h3>
        <div class="space-y-3">
          <Checkbox v-model="selections.feature1" label="Advanced Analytics" />
          <Checkbox v-model="selections.feature2" label="Priority Support" />
          <Checkbox v-model="selections.feature3" label="Custom Branding" />
          <Checkbox v-model="selections.feature4" label="API Access" />
        </div>
        <div class="mt-4 p-3 bg-secondary-800 rounded border border-secondary-700">
          <p class="text-sm text-gray-400">Selected: {{ Object.values(selections).filter(Boolean).length }} of 4</p>
        </div>
      </div>
    `,
  }),
}
