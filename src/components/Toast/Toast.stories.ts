import type { Meta, StoryObj } from '@storybook/vue3'
import ToastContainer from './ToastContainer.vue'
import { useToast } from '@/composables/useToast'
import Button from '../Button/Button.vue'

const meta = {
  title: 'Components/Toast',
  component: ToastContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ToastContainer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { ToastContainer, Button },
    setup() {
      const toast = useToast()

      const showSuccess = () => {
        toast.success('Your changes have been saved successfully!')
      }

      const showError = () => {
        toast.error('Failed to save changes. Please try again.')
      }

      const showWarning = () => {
        toast.warning('Your session will expire in 5 minutes.')
      }

      const showInfo = () => {
        toast.info('New updates are available.')
      }

      return { showSuccess, showError, showWarning, showInfo }
    },
    template: `
      <div class="p-8">
        <div class="flex flex-wrap gap-3">
          <Button @click="showSuccess" variant="primary">
            Show Success Toast
          </Button>
          <Button @click="showError" variant="danger">
            Show Error Toast
          </Button>
          <Button @click="showWarning" variant="warning">
            Show Warning Toast
          </Button>
          <Button @click="showInfo" variant="secondary">
            Show Info Toast
          </Button>
        </div>
        <ToastContainer />
      </div>
    `,
  }),
  args: {},
}

export const WithTitles: Story = {
  render: () => ({
    components: { ToastContainer, Button },
    setup() {
      const toast = useToast()

      const showSuccess = () => {
        toast.success('Your profile has been updated with the latest information.', 'Success')
      }

      const showError = () => {
        toast.error('Unable to connect to the server. Check your internet connection.', 'Error')
      }

      return { showSuccess, showError }
    },
    template: `
      <div class="p-8">
        <div class="flex gap-3">
          <Button @click="showSuccess" variant="primary">
            Success with Title
          </Button>
          <Button @click="showError" variant="danger">
            Error with Title
          </Button>
        </div>
        <ToastContainer />
      </div>
    `,
  }),
  args: {},
}

export const Positions: Story = {
  render: () => ({
    components: { ToastContainer, Button },
    setup() {
      const toast = useToast()

      const showToast = () => {
        toast.info('This is a notification message')
      }

      return { showToast }
    },
    template: `
      <div class="p-8">
        <p class="text-neutral-300 mb-4">Click the button to show toast in top-right position:</p>
        <Button @click="showToast" variant="primary">
          Show Toast
        </Button>
        <ToastContainer position="top-right" />
      </div>
    `,
  }),
  args: {},
}

export const LongDuration: Story = {
  render: () => ({
    components: { ToastContainer, Button },
    setup() {
      const toast = useToast()

      const showToast = () => {
        toast.info('This toast will stay for 10 seconds', 'Long Duration', 10000)
      }

      return { showToast }
    },
    template: `
      <div class="p-8">
        <Button @click="showToast" variant="primary">
          Show Long Duration Toast (10s)
        </Button>
        <ToastContainer />
      </div>
    `,
  }),
  args: {},
}
