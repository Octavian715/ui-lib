import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Badge from './Badge.vue'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Default</Badge>',
  }),
}

export const Variants: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-2 flex-wrap">
        <Badge variant="default">Default</Badge>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    `,
  }),
}

export const Sizes: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-2 items-center">
        <Badge size="sm" variant="primary">Small</Badge>
        <Badge size="md" variant="primary">Medium</Badge>
        <Badge size="lg" variant="primary">Large</Badge>
      </div>
    `,
  }),
}

export const Rounded: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-2 flex-wrap">
        <Badge variant="default" rounded>Default</Badge>
        <Badge variant="primary" rounded>Primary</Badge>
        <Badge variant="success" rounded>Success</Badge>
        <Badge variant="warning" rounded>Warning</Badge>
        <Badge variant="danger" rounded>Danger</Badge>
        <Badge variant="info" rounded>Info</Badge>
      </div>
    `,
  }),
}

export const StatusBadges: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <span class="text-white">Order Status:</span>
          <Badge variant="success">Delivered</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-white">Payment:</span>
          <Badge variant="warning">Pending</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-white">Account:</span>
          <Badge variant="danger">Suspended</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-white">Verification:</span>
          <Badge variant="info">In Progress</Badge>
        </div>
      </div>
    `,
  }),
}

export const WithIcons: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-2 flex-wrap">
        <Badge variant="success">
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
          Completed
        </Badge>
        <Badge variant="warning">
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
          </svg>
          Warning
        </Badge>
        <Badge variant="danger">
          <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
          Error
        </Badge>
      </div>
    `,
  }),
}

export const CounterBadges: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-4">
        <div class="relative inline-block">
          <button class="p-2 bg-secondary-800 rounded-lg text-white">
            Messages
          </button>
          <Badge variant="danger" size="sm" rounded class="absolute -top-1 -right-1">
            3
          </Badge>
        </div>
        <div class="relative inline-block">
          <button class="p-2 bg-secondary-800 rounded-lg text-white">
            Notifications
          </button>
          <Badge variant="primary" size="sm" rounded class="absolute -top-1 -right-1">
            12
          </Badge>
        </div>
        <div class="relative inline-block">
          <button class="p-2 bg-secondary-800 rounded-lg text-white">
            Cart
          </button>
          <Badge variant="success" size="sm" rounded class="absolute -top-1 -right-1">
            5
          </Badge>
        </div>
      </div>
    `,
  }),
}
