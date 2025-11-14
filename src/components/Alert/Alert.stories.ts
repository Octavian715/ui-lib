import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Alert from './Alert.vue'
import Button from '../Button/Button.vue'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger'],
    },
    icon: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96">
        <Alert v-bind="args" />
      </div>
    `,
  }),
  args: {
    variant: 'info',
    title: 'Information',
    description: 'This is an informational alert message.',
  },
}

export const Success: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96">
        <Alert v-bind="args" />
      </div>
    `,
  }),
  args: {
    variant: 'success',
    title: 'Success',
    description: 'Your action was completed successfully!',
  },
}

export const Warning: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96">
        <Alert v-bind="args" />
      </div>
    `,
  }),
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Please review this important information.',
  },
}

export const Danger: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96">
        <Alert v-bind="args" />
      </div>
    `,
  }),
  args: {
    variant: 'danger',
    title: 'Error',
    description: 'An error occurred while processing your request.',
  },
}

export const Closable: Story = {
  render: (args) => ({
    components: { Alert, Button },
    setup() {
      const visible = ref(true)
      const showAlert = () => {
        visible.value = true
      }
      return { args, visible, showAlert }
    },
    template: `
      <div class="w-96 space-y-4">
        <Alert v-bind="args" v-model="visible" />
        <Button v-if="!visible" @click="showAlert" variant="outline" size="sm">
          Show Alert Again
        </Button>
      </div>
    `,
  }),
  args: {
    variant: 'info',
    title: 'Closable Alert',
    description: 'You can close this alert by clicking the X button.',
    closable: true,
  },
}

export const WithoutIcon: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96">
        <Alert v-bind="args" />
      </div>
    `,
  }),
  args: {
    variant: 'info',
    title: 'No Icon',
    description: 'This alert does not display an icon.',
    icon: false,
  },
}

export const WithoutTitle: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96">
        <Alert v-bind="args" />
      </div>
    `,
  }),
  args: {
    variant: 'success',
    description: 'This alert only has a description.',
  },
}

export const AllVariants: Story = {
  render: (args) => ({
    components: { Alert },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96 space-y-4">
        <Alert variant="info" title="Information" description="This is an info alert" />
        <Alert variant="success" title="Success" description="This is a success alert" />
        <Alert variant="warning" title="Warning" description="This is a warning alert" />
        <Alert variant="danger" title="Error" description="This is an error alert" />
      </div>
    `,
  }),
}

export const CustomContent: Story = {
  render: (args) => ({
    components: { Alert, Button },
    setup() {
      return { args }
    },
    template: `
      <div class="w-96">
        <Alert variant="warning" title="Action Required" closable>
          <p class="mb-3">Your subscription will expire in 3 days. Renew now to continue enjoying premium features.</p>
          <Button size="sm" variant="primary">Renew Subscription</Button>
        </Alert>
      </div>
    `,
  }),
}
