import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Input from './Input.vue'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    clearable: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <Input v-bind="args" v-model="value" />
        <p class="mt-2 text-sm text-gray-400">Value: {{ value }}</p>
      </div>
    `,
  }),
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
}

export const WithHint: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <Input v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    hint: 'We will never share your email with anyone else.',
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('invalid-email')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <Input v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
    error: true,
    errorMessage: 'Please enter a valid email address.',
  },
}

export const Required: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <Input v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
    required: true,
  },
}

export const Password: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <Input v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('Disabled value')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <Input v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Disabled Input',
    disabled: true,
  },
}

export const Readonly: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('Read-only value')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <Input v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Read-only Input',
    readonly: true,
  },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const valueSm = ref('')
      const valueMd = ref('')
      const valueLg = ref('')
      return { args, valueSm, valueMd, valueLg }
    },
    template: `
      <div class="w-96 space-y-4">
        <Input v-model="valueSm" label="Small" size="sm" placeholder="Small input" />
        <Input v-model="valueMd" label="Medium" size="md" placeholder="Medium input" />
        <Input v-model="valueLg" label="Large" size="lg" placeholder="Large input" />
      </div>
    `,
  }),
}

export const Clearable: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('Clearable text')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <Input v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Search',
    type: 'search',
    placeholder: 'Search...',
    clearable: true,
  },
}

export const WithPrefix: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <Input v-bind="args" v-model="value">
          <template #prefix>
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </template>
        </Input>
      </div>
    `,
  }),
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'you@example.com',
  },
}

export const WithSuffix: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <Input v-bind="args" v-model="value">
          <template #suffix>
            <span class="text-gray-400 text-sm">USD</span>
          </template>
        </Input>
      </div>
    `,
  }),
  args: {
    label: 'Price',
    type: 'number',
    placeholder: '0.00',
  },
}

export const Number: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref<number>()
      return { args, value }
    },
    template: `
      <div class="w-96">
        <Input v-bind="args" v-model="value" />
        <p class="mt-2 text-sm text-gray-400">Value: {{ value }}</p>
      </div>
    `,
  }),
  args: {
    label: 'Age',
    type: 'number',
    placeholder: 'Enter your age',
  },
}
