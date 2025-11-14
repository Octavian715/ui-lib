import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Tooltip from './Tooltip.vue'
import Button from '../Button/Button.vue'

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
    variant: {
      control: 'select',
      options: ['normal', 'danger', 'success', 'warning'],
    },
    delay: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Top: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Hover me</Button>
      </Tooltip>
    `,
  }),
  args: {
    content: 'This is a tooltip on top',
    position: 'top',
    variant: 'normal',
  },
}

export const Bottom: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Hover me</Button>
      </Tooltip>
    `,
  }),
  args: {
    content: 'This is a tooltip on bottom',
    position: 'bottom',
    variant: 'normal',
  },
}

export const Left: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Hover me</Button>
      </Tooltip>
    `,
  }),
  args: {
    content: 'This is a tooltip on left',
    position: 'left',
    variant: 'normal',
  },
}

export const Right: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Hover me</Button>
      </Tooltip>
    `,
  }),
  args: {
    content: 'This is a tooltip on right',
    position: 'right',
    variant: 'normal',
  },
}

export const Danger: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button variant="danger">Delete</Button>
      </Tooltip>
    `,
  }),
  args: {
    content: 'This action cannot be undone',
    position: 'top',
    variant: 'danger',
  },
}

export const Success: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button variant="success">Save</Button>
      </Tooltip>
    `,
  }),
  args: {
    content: 'Click to save your changes',
    position: 'top',
    variant: 'success',
  },
}

export const Warning: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Warning</Button>
      </Tooltip>
    `,
  }),
  args: {
    content: 'Please review before proceeding',
    position: 'top',
    variant: 'warning',
  },
}

export const WithDelay: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <Button>Hover me (500ms delay)</Button>
      </Tooltip>
    `,
  }),
  args: {
    content: 'This tooltip appears after a delay',
    position: 'top',
    variant: 'normal',
    delay: 500,
  },
}

export const CustomContent: Story = {
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip position="top">
        <Button>Hover for details</Button>
        <template #content>
          <div class="space-y-1">
            <p class="font-bold">Custom Tooltip</p>
            <p class="text-xs">You can add any HTML content here</p>
          </div>
        </template>
      </Tooltip>
    `,
  }),
}

export const OnText: Story = {
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args }
    },
    template: `
      <div class="text-white">
        Hover over
        <Tooltip v-bind="args">
          <span class="underline cursor-help">this text</span>
        </Tooltip>
        to see a tooltip.
      </div>
    `,
  }),
  args: {
    content: 'Additional information about this term',
    position: 'top',
    variant: 'normal',
  },
}
