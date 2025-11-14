import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'
import Breadcrumb from './Breadcrumb.vue'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    separator: {
      control: 'select',
      options: ['slash', 'chevron', 'arrow'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

const homeIcon = () => h('svg', {
  viewBox: '0 0 20 20',
  fill: 'currentColor',
}, [
  h('path', {
    'fill-rule': 'evenodd',
    'd': 'M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z',
    'clip-rule': 'evenodd',
  }),
])

export const Default: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Electronics', href: '/products/electronics' },
        { label: 'Laptops' },
      ]
      return { items }
    },
    template: `
      <div class="w-[600px]">
        <Breadcrumb :items="items" />
      </div>
    `,
  }),
  args: {
    items: [],
  },
}

export const WithIcon: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items = [
        { label: 'Home', href: '/', icon: homeIcon },
        { label: 'Dashboard', href: '/dashboard' },
        { label: 'Settings', href: '/dashboard/settings' },
        { label: 'Profile' },
      ]
      return { items }
    },
    template: `
      <div class="w-[600px]">
        <Breadcrumb :items="items" />
      </div>
    `,
  }),
  args: {
    items: [],
  },
}

export const Separators: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Category', href: '/category' },
        { label: 'Subcategory' },
      ]
      return { items }
    },
    template: `
      <div class="w-[600px] space-y-6">
        <div>
          <p class="text-sm text-neutral-400 mb-2">Chevron (default)</p>
          <Breadcrumb :items="items" separator="chevron" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Slash</p>
          <Breadcrumb :items="items" separator="slash" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Arrow</p>
          <Breadcrumb :items="items" separator="arrow" />
        </div>
      </div>
    `,
  }),
  args: {
    items: [],
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: '/products' },
        { label: 'Details' },
      ]
      return { items }
    },
    template: `
      <div class="w-[600px] space-y-6">
        <div>
          <p class="text-sm text-neutral-400 mb-2">Small</p>
          <Breadcrumb :items="items" size="sm" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Medium (default)</p>
          <Breadcrumb :items="items" size="md" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Large</p>
          <Breadcrumb :items="items" size="lg" />
        </div>
      </div>
    `,
  }),
  args: {
    items: [],
  },
}

export const WithDisabled: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Disabled Item', href: '/disabled', disabled: true },
        { label: 'Current Page' },
      ]
      return { items }
    },
    template: `
      <div class="w-[600px]">
        <Breadcrumb :items="items" />
      </div>
    `,
  }),
  args: {
    items: [],
  },
}

export const LongPath: Story = {
  render: () => ({
    components: { Breadcrumb },
    setup() {
      const items = [
        { label: 'Home', href: '/', icon: homeIcon },
        { label: 'Documentation', href: '/docs' },
        { label: 'Components', href: '/docs/components' },
        { label: 'Navigation', href: '/docs/components/navigation' },
        { label: 'Breadcrumb', href: '/docs/components/navigation/breadcrumb' },
        { label: 'Examples' },
      ]
      return { items }
    },
    template: `
      <div class="w-[700px]">
        <Breadcrumb :items="items" />
      </div>
    `,
  }),
  args: {
    items: [],
  },
}
