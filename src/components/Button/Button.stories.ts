import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Button from './Button.vue'

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Primary Button</Button>',
  }),
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Secondary Button</Button>',
  }),
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Outline Button</Button>',
  }),
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Ghost Button</Button>',
  }),
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    size: 'md',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Danger Button</Button>',
  }),
}

export const Success: Story = {
  args: {
    variant: 'success',
    size: 'md',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Success Button</Button>',
  }),
}

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Small Button</Button>',
  }),
}

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Large Button</Button>',
  }),
}

export const Loading: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    loading: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Loading...</Button>',
  }),
}

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
  },
  render: (args) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Disabled Button</Button>',
  }),
}
