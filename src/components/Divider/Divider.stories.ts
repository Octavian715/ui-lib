import type { Meta, StoryObj } from '@storybook/vue3'
import Divider from './Divider.vue'

const meta = {
  title: 'Components/Divider',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted', 'gradient'],
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="w-full">
        <p class="text-neutral-300">Content above divider</p>
        <Divider />
        <p class="text-neutral-300">Content below divider</p>
      </div>
    `,
  }),
  args: {},
}

export const WithLabel: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="w-full space-y-8">
        <div>
          <p class="text-neutral-300">Section 1</p>
          <Divider label="OR" />
          <p class="text-neutral-300">Section 2</p>
        </div>
      </div>
    `,
  }),
  args: {},
}

export const LabelPositions: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="w-full space-y-8">
        <div>
          <Divider label="Left Aligned" label-position="left" />
        </div>
        <div>
          <Divider label="Center Aligned" label-position="center" />
        </div>
        <div>
          <Divider label="Right Aligned" label-position="right" />
        </div>
      </div>
    `,
  }),
  args: {},
}

export const Variants: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="w-full space-y-8">
        <div>
          <p class="text-sm text-neutral-400 mb-2">Solid (default)</p>
          <Divider variant="solid" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Dashed</p>
          <Divider variant="dashed" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Dotted</p>
          <Divider variant="dotted" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Gradient</p>
          <Divider variant="gradient" />
        </div>
      </div>
    `,
  }),
  args: {},
}

export const Spacing: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="w-full">
        <p class="text-neutral-300">Content</p>
        <Divider spacing="sm" label="Small spacing" />
        <p class="text-neutral-300">Content</p>
        <Divider spacing="md" label="Medium spacing" />
        <p class="text-neutral-300">Content</p>
        <Divider spacing="lg" label="Large spacing" />
        <p class="text-neutral-300">Content</p>
        <Divider spacing="xl" label="Extra large spacing" />
        <p class="text-neutral-300">Content</p>
      </div>
    `,
  }),
  args: {},
}

export const Vertical: Story = {
  render: () => ({
    components: { Divider },
    template: `
      <div class="flex gap-4 h-32">
        <div class="flex-1 flex items-center justify-center text-neutral-300">
          Left Content
        </div>
        <Divider orientation="vertical" />
        <div class="flex-1 flex items-center justify-center text-neutral-300">
          Middle Content
        </div>
        <Divider orientation="vertical" variant="gradient" />
        <div class="flex-1 flex items-center justify-center text-neutral-300">
          Right Content
        </div>
      </div>
    `,
  }),
  args: {},
}
