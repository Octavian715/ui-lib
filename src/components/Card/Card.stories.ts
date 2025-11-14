import type { Meta, StoryObj } from '@storybook/vue3'
import Card from './Card.vue'
import Button from '../Button/Button.vue'

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated', 'flat'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    hoverable: {
      control: 'boolean',
    },
    clickable: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args" class="w-96">
        <p class="text-gray-300">
          This is a default card with some content inside. Cards are great for organizing information.
        </p>
      </Card>
    `,
  }),
  args: {
    title: 'Card Title',
  },
}

export const WithHeaderAndFooter: Story = {
  render: (args) => ({
    components: { Card, Button },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args" class="w-96">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-white">Custom Header</h3>
            <span class="text-xs text-gray-400">2 min ago</span>
          </div>
        </template>

        <p class="text-gray-300">
          Card with custom header and footer slots.
        </p>

        <template #footer>
          <div class="flex gap-2">
            <Button size="sm" variant="primary">Accept</Button>
            <Button size="sm" variant="outline">Decline</Button>
          </div>
        </template>
      </Card>
    `,
  }),
}

export const Variants: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-4 w-96">
        <Card variant="default" title="Default">
          <p class="text-gray-300">Default card variant</p>
        </Card>
        <Card variant="bordered" title="Bordered">
          <p class="text-gray-300">Bordered card variant</p>
        </Card>
        <Card variant="elevated" title="Elevated">
          <p class="text-gray-300">Elevated card with shadow</p>
        </Card>
        <Card variant="flat" title="Flat">
          <p class="text-gray-300">Flat card without border</p>
        </Card>
      </div>
    `,
  }),
}

export const Hoverable: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args" class="w-96">
        <p class="text-gray-300">Hover over this card to see the effect</p>
      </Card>
    `,
  }),
  args: {
    title: 'Hoverable Card',
    hoverable: true,
  },
}

export const Clickable: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      const handleClick = () => {
        alert('Card clicked!')
      }
      return { args, handleClick }
    },
    template: `
      <Card v-bind="args" class="w-96" @click="handleClick">
        <p class="text-gray-300">Click this card to trigger an action</p>
      </Card>
    `,
  }),
  args: {
    title: 'Clickable Card',
    clickable: true,
  },
}

export const NoPadding: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card padding="none" class="w-96" title="Gallery">
        <img
          src="https://picsum.photos/400/200"
          alt="Placeholder"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <p class="text-gray-300">Card with no padding, perfect for images</p>
        </div>
      </Card>
    `,
  }),
}

export const ProductCard: Story = {
  render: (args) => ({
    components: { Card, Button },
    setup() {
      return { args }
    },
    template: `
      <Card class="w-80" hoverable padding="none">
        <img
          src="https://picsum.photos/320/180"
          alt="Product"
          class="w-full h-44 object-cover"
        />
        <div class="p-4">
          <h3 class="text-xl font-bold text-white mb-2">Premium Product</h3>
          <p class="text-gray-400 text-sm mb-4">
            High quality product with amazing features and benefits.
          </p>
          <div class="flex items-center justify-between">
            <span class="text-2xl font-bold text-primary-400">$99.99</span>
            <Button size="sm" variant="primary">Add to Cart</Button>
          </div>
        </div>
      </Card>
    `,
  }),
}

export const DashboardCards: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <div class="grid grid-cols-3 gap-4">
        <Card variant="elevated" padding="lg">
          <div class="text-center">
            <p class="text-gray-400 text-sm mb-2">Total Users</p>
            <p class="text-3xl font-bold text-white">1,234</p>
            <p class="text-green-500 text-sm mt-2">+12% from last month</p>
          </div>
        </Card>
        <Card variant="elevated" padding="lg">
          <div class="text-center">
            <p class="text-gray-400 text-sm mb-2">Revenue</p>
            <p class="text-3xl font-bold text-white">$45.2K</p>
            <p class="text-green-500 text-sm mt-2">+8% from last month</p>
          </div>
        </Card>
        <Card variant="elevated" padding="lg">
          <div class="text-center">
            <p class="text-gray-400 text-sm mb-2">Orders</p>
            <p class="text-3xl font-bold text-white">567</p>
            <p class="text-red-500 text-sm mt-2">-3% from last month</p>
          </div>
        </Card>
      </div>
    `,
  }),
}
