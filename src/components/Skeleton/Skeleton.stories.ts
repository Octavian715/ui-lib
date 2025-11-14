import type { Meta, StoryObj } from '@storybook/vue3'
import Skeleton from './Skeleton.vue'
import Card from '../Card/Card.vue'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
    animated: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="w-[400px] space-y-3">
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="80%" />
      </div>
    `,
  }),
  args: {},
}

export const Circular: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="flex gap-4">
        <Skeleton variant="circular" width="40" />
        <Skeleton variant="circular" width="60" />
        <Skeleton variant="circular" width="80" />
      </div>
    `,
  }),
  args: {},
}

export const Rectangular: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="space-y-4">
        <Skeleton variant="rectangular" width="300" height="200" />
        <Skeleton variant="rectangular" width="300" height="100" />
      </div>
    `,
  }),
  args: {},
}

export const Rounded: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="space-y-4">
        <Skeleton variant="rounded" width="300" height="200" />
        <Skeleton variant="rounded" width="300" height="100" />
      </div>
    `,
  }),
  args: {},
}

export const CardLoading: Story = {
  render: () => ({
    components: { Skeleton, Card },
    template: `
      <Card class="w-[400px]">
        <div class="space-y-4">
          <div class="flex items-center gap-4">
            <Skeleton variant="circular" width="48" />
            <div class="flex-1 space-y-2">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="60%" />
            </div>
          </div>
          <Skeleton variant="rounded" width="100%" height="200" />
          <div class="space-y-2">
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="90%" />
            <Skeleton variant="text" width="70%" />
          </div>
        </div>
      </Card>
    `,
  }),
  args: {},
}

export const ProfileLoading: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="w-[400px] space-y-6">
        <!-- Header -->
        <div class="flex items-center gap-4">
          <Skeleton variant="circular" width="80" />
          <div class="flex-1 space-y-3">
            <Skeleton variant="text" width="50%" height="24" />
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4">
          <div class="space-y-2">
            <Skeleton variant="text" width="100%" height="32" />
            <Skeleton variant="text" width="100%" />
          </div>
          <div class="space-y-2">
            <Skeleton variant="text" width="100%" height="32" />
            <Skeleton variant="text" width="100%" />
          </div>
          <div class="space-y-2">
            <Skeleton variant="text" width="100%" height="32" />
            <Skeleton variant="text" width="100%" />
          </div>
        </div>

        <!-- Bio -->
        <div class="space-y-2">
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="95%" />
          <Skeleton variant="text" width="80%" />
        </div>
      </div>
    `,
  }),
  args: {},
}

export const WithoutAnimation: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <div class="w-[400px] space-y-3">
        <Skeleton variant="text" width="100%" :animated="false" />
        <Skeleton variant="text" width="90%" :animated="false" />
        <Skeleton variant="text" width="80%" :animated="false" />
      </div>
    `,
  }),
  args: {},
}
