import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Radio from './Radio.vue'

const meta = {
  title: 'Components/Radio',
  component: Radio,
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
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Radio },
    setup() {
      const selected = ref('option1')
      return { args, selected }
    },
    template: `
      <div class="w-96">
        <Radio v-model="selected" value="option1" label="Option 1" name="default" />
        <p class="mt-4 text-sm text-neutral-400">Selected: {{ selected }}</p>
      </div>
    `,
  }),
  args: { value: "" },
}

export const Group: Story = {
  render: (args) => ({
    components: { Radio },
    setup() {
      const selected = ref('react')
      return { args, selected }
    },
    template: `
      <div class="w-96 space-y-3">
        <Radio v-model="selected" value="react" label="React" name="framework" />
        <Radio v-model="selected" value="vue" label="Vue.js" name="framework" />
        <Radio v-model="selected" value="angular" label="Angular" name="framework" />
        <Radio v-model="selected" value="svelte" label="Svelte" name="framework" />
        <p class="mt-4 pt-4 border-t border-white/10 text-sm text-neutral-400">
          Selected: {{ selected }}
        </p>
      </div>
    `,
  }),
  args: { value: "" },
}

export const WithHint: Story = {
  render: (args) => ({
    components: { Radio },
    setup() {
      const selected = ref('email')
      return { args, selected }
    },
    template: `
      <div class="w-96 space-y-4">
        <Radio
          v-model="selected"
          value="email"
          label="Email notifications"
          hint="Receive notifications via email"
          name="notification"
        />
        <Radio
          v-model="selected"
          value="sms"
          label="SMS notifications"
          hint="Receive notifications via SMS"
          name="notification"
        />
        <Radio
          v-model="selected"
          value="push"
          label="Push notifications"
          hint="Receive push notifications on your device"
          name="notification"
        />
      </div>
    `,
  }),
  args: { value: "" },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { Radio },
    setup() {
      const selectedSm = ref('sm')
      const selectedMd = ref('md')
      const selectedLg = ref('lg')
      return { args, selectedSm, selectedMd, selectedLg }
    },
    template: `
      <div class="w-96 space-y-4">
        <Radio v-model="selectedSm" value="sm" label="Small radio" size="sm" name="size-sm" />
        <Radio v-model="selectedMd" value="md" label="Medium radio" size="md" name="size-md" />
        <Radio v-model="selectedLg" value="lg" label="Large radio" size="lg" name="size-lg" />
      </div>
    `,
  }),
  args: { value: "" },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Radio },
    setup() {
      const selected = ref('enabled')
      return { args, selected }
    },
    template: `
      <div class="w-96 space-y-3">
        <Radio v-model="selected" value="enabled" label="Enabled option" name="disabled" />
        <Radio v-model="selected" value="disabled1" label="Disabled unchecked" disabled name="disabled" />
        <Radio v-model="selected" value="disabled2" label="Disabled checked" disabled name="disabled" />
      </div>
    `,
  }),
  args: { value: "" },
}

export const WithError: Story = {
  render: (args) => ({
    components: { Radio },
    setup() {
      const selected = ref('')
      return { args, selected }
    },
    template: `
      <div class="w-96 space-y-3">
        <Radio
          v-model="selected"
          value="yes"
          label="Yes, I agree"
          error
          errorMessage="You must accept the terms"
          name="error"
        />
        <Radio v-model="selected" value="no" label="No, I decline" error name="error" />
      </div>
    `,
  }),
  args: { value: "" },
}

export const CustomContent: Story = {
  render: (args) => ({
    components: { Radio },
    setup() {
      const selected = ref('pro')
      return { args, selected }
    },
    template: `
      <div class="w-96 space-y-3">
        <Radio v-model="selected" value="free" name="plan">
          <div>
            <p class="font-semibold text-white">Free Plan</p>
            <p class="text-sm text-neutral-400">Basic features for individuals</p>
          </div>
        </Radio>
        <Radio v-model="selected" value="pro" name="plan">
          <div>
            <p class="font-semibold text-white">Pro Plan</p>
            <p class="text-sm text-neutral-400">Advanced features for professionals</p>
          </div>
        </Radio>
        <Radio v-model="selected" value="enterprise" name="plan">
          <div>
            <p class="font-semibold text-white">Enterprise Plan</p>
            <p class="text-sm text-neutral-400">Custom solutions for large teams</p>
          </div>
        </Radio>
      </div>
    `,
  }),
  args: { value: "" },
}
