import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, onMounted, onUnmounted } from 'vue'
import Progress from './Progress.vue'

const meta = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    value: {
      control: 'number',
    },
    max: {
      control: 'number',
    },
    showPercentage: {
      control: 'boolean',
    },
    showLabel: {
      control: 'boolean',
    },
    animated: {
      control: 'boolean',
    },
    striped: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: '<div class="w-96"><Progress v-bind="args" /></div>',
  }),
  args: {
    value: 60,
    label: 'Progress',
  },
}

export const WithPercentage: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: '<div class="w-96"><Progress v-bind="args" /></div>',
  }),
  args: {
    value: 75,
    label: 'Upload Progress',
    showPercentage: true,
  },
}

export const Variants: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96 space-y-6">
        <Progress value="65" label="Default" variant="default" showPercentage />
        <Progress value="80" label="Success" variant="success" showPercentage />
        <Progress value="45" label="Warning" variant="warning" showPercentage />
        <Progress value="25" label="Danger" variant="danger" showPercentage />
        <Progress value="90" label="Info" variant="info" showPercentage />
      </div>
    `,
  }),
  args: { value: 0 },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96 space-y-6">
        <Progress value="60" label="Small" size="sm" showPercentage />
        <Progress value="70" label="Medium" size="md" showPercentage />
        <Progress value="80" label="Large" size="lg" showPercentage />
      </div>
    `,
  }),
  args: { value: 0 },
}

export const Animated: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: '<div class="w-96"><Progress v-bind="args" /></div>',
  }),
  args: {
    value: 70,
    label: 'Loading...',
    animated: true,
    showPercentage: true,
  },
}

export const Striped: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: '<div class="w-96"><Progress v-bind="args" /></div>',
  }),
  args: {
    value: 65,
    label: 'Processing',
    striped: true,
    showPercentage: true,
    size: 'lg',
  },
}

export const AnimatedStriped: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: '<div class="w-96"><Progress v-bind="args" /></div>',
  }),
  args: {
    value: 55,
    label: 'Processing with animation',
    striped: true,
    animated: true,
    showPercentage: true,
    size: 'lg',
  },
}

export const WithHint: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: '<div class="w-96"><Progress v-bind="args" /></div>',
  }),
  args: {
    value: 42,
    label: 'Download',
    hint: 'Approximately 2 minutes remaining',
    showPercentage: true,
  },
}

export const SimulatedProgress: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      const progress = ref(0)
      let interval: ReturnType<typeof setInterval>

      onMounted(() => {
        interval = setInterval(() => {
          if (progress.value < 100) {
            progress.value += 1
          } else {
            progress.value = 0
          }
        }, 50)
      })

      onUnmounted(() => {
        if (interval) clearInterval(interval)
      })

      return { args, progress }
    },
    template: `
      <div class="w-96">
        <Progress
          :value="progress"
          label="Auto-incrementing Progress"
          showPercentage
          animated
        />
      </div>
    `,
  }),
  args: { value: 0 },
}

export const MultipleSteps: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96 space-y-4">
        <div>
          <h3 class="text-white font-semibold mb-2">Installation Progress</h3>
          <Progress value="100" label="Download" variant="success" size="sm" showPercentage />
        </div>
        <div>
          <Progress value="100" label="Extract" variant="success" size="sm" showPercentage />
        </div>
        <div>
          <Progress value="67" label="Install" variant="default" size="sm" showPercentage animated />
        </div>
        <div>
          <Progress value="0" label="Configure" variant="default" size="sm" showPercentage />
        </div>
      </div>
    `,
  }),
  args: { value: 0 },
}
