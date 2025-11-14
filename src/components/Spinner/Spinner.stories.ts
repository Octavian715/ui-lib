import type { Meta, StoryObj } from '@storybook/vue3'
import Spinner from './Spinner.vue'
import Card from '../Card/Card.vue'

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'white', 'secondary', 'success', 'danger'],
    },
    center: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args }
    },
    template: '<Spinner v-bind="args" />',
  }),
}

export const WithLabel: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args }
    },
    template: '<Spinner v-bind="args" />',
  }),
  args: {
    label: 'Loading...',
  },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center gap-6">
        <Spinner size="xs" label="XS" />
        <Spinner size="sm" label="SM" />
        <Spinner size="md" label="MD" />
        <Spinner size="lg" label="LG" />
        <Spinner size="xl" label="XL" />
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args }
    },
    template: `
      <div class="flex gap-6 flex-wrap">
        <Spinner variant="primary" label="Primary" />
        <Spinner variant="white" label="White" />
        <Spinner variant="secondary" label="Secondary" />
        <Spinner variant="success" label="Success" />
        <Spinner variant="danger" label="Danger" />
      </div>
    `,
  }),
}

export const Centered: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96 h-32 bg-secondary-800 border border-secondary-700 rounded-lg">
        <Spinner v-bind="args" />
      </div>
    `,
  }),
  args: {
    center: true,
    label: 'Loading content...',
    size: 'lg',
  },
}

export const InCard: Story = {
  render: (args) => ({
    components: { Spinner, Card },
    setup() {
      return { args }
    },
    template: `
      <Card class="w-96" title="Loading Data">
        <div class="py-8">
          <Spinner center size="lg" label="Fetching data..." />
        </div>
      </Card>
    `,
  }),
}

export const InlineWithText: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center gap-2 text-white">
        <span>Processing your request</span>
        <Spinner size="sm" />
      </div>
    `,
  }),
}

export const LoadingStates: Story = {
  render: (args) => ({
    components: { Spinner, Card },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-4 w-96">
        <Card padding="md">
          <div class="flex items-center justify-between">
            <span class="text-white">Uploading file...</span>
            <Spinner size="sm" variant="primary" />
          </div>
        </Card>

        <Card padding="md">
          <div class="flex items-center justify-between">
            <span class="text-white">Processing payment...</span>
            <Spinner size="sm" variant="success" />
          </div>
        </Card>

        <Card padding="md">
          <div class="flex items-center justify-between">
            <span class="text-white">Syncing data...</span>
            <Spinner size="sm" variant="white" />
          </div>
        </Card>
      </div>
    `,
  }),
}

export const FullPage: Story = {
  render: (args) => ({
    components: { Spinner },
    setup() {
      return { args }
    },
    template: `
      <div class="fixed inset-0 bg-secondary-900/80 backdrop-blur-sm flex items-center justify-center">
        <div class="text-center">
          <Spinner size="xl" variant="white" />
          <p class="mt-4 text-white text-lg">Loading application...</p>
        </div>
      </div>
    `,
  }),
}
