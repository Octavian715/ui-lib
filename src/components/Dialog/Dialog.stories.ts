import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Dialog from './Dialog.vue'
import Button from '../Button/Button.vue'

const meta = {
  title: 'Components/Dialog',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Dialog</Button>
        <Dialog
          v-model="isOpen"
          title="Dialog Title"
          description="This is a dialog description that provides more context about what the dialog is for."
          confirm-text="Confirm"
          cancel-text="Cancel"
        />
      </div>
    `,
  }),
  args: {},
}

export const Variants: Story = {
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const successOpen = ref(false)
      const warningOpen = ref(false)
      const dangerOpen = ref(false)
      const infoOpen = ref(false)
      return { successOpen, warningOpen, dangerOpen, infoOpen }
    },
    template: `
      <div class="flex flex-wrap gap-3">
        <Button variant="primary" @click="successOpen = true">Success Dialog</Button>
        <Button variant="warning" @click="warningOpen = true">Warning Dialog</Button>
        <Button variant="danger" @click="dangerOpen = true">Danger Dialog</Button>
        <Button variant="secondary" @click="infoOpen = true">Info Dialog</Button>

        <Dialog
          v-model="successOpen"
          variant="success"
          title="Success!"
          description="Your action was completed successfully."
          confirm-text="OK"
        />

        <Dialog
          v-model="warningOpen"
          variant="warning"
          title="Warning"
          description="Please review this action carefully before proceeding."
          confirm-text="Proceed"
          cancel-text="Cancel"
        />

        <Dialog
          v-model="dangerOpen"
          variant="danger"
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          confirm-text="Delete"
          cancel-text="Cancel"
        />

        <Dialog
          v-model="infoOpen"
          variant="info"
          title="Information"
          description="Here is some important information you should know."
          confirm-text="Got it"
        />
      </div>
    `,
  }),
  args: {},
}

export const WithCustomContent: Story = {
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Form Dialog</Button>
        <Dialog
          v-model="isOpen"
          title="Create Account"
          confirm-text="Create"
          cancel-text="Cancel"
        >
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-1">Username</label>
              <input
                type="text"
                class="w-full px-3 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-neutral-300 mb-1">Email</label>
              <input
                type="email"
                class="w-full px-3 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                placeholder="Enter email"
              />
            </div>
          </div>
        </Dialog>
      </div>
    `,
  }),
  args: {},
}

export const LoadingState: Story = {
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const isOpen = ref(false)
      const isLoading = ref(false)

      const handleConfirm = () => {
        isLoading.value = true
        setTimeout(() => {
          isLoading.value = false
          isOpen.value = false
        }, 2000)
      }

      return { isOpen, isLoading, handleConfirm }
    },
    template: `
      <div>
        <Button @click="isOpen = true">Open Dialog</Button>
        <Dialog
          v-model="isOpen"
          title="Save Changes"
          description="Are you sure you want to save these changes?"
          confirm-text="Save"
          cancel-text="Cancel"
          :loading="isLoading"
          @confirm="handleConfirm"
        />
      </div>
    `,
  }),
  args: {},
}

export const Sizes: Story = {
  render: () => ({
    components: { Dialog, Button },
    setup() {
      const smOpen = ref(false)
      const mdOpen = ref(false)
      const lgOpen = ref(false)
      const xlOpen = ref(false)
      return { smOpen, mdOpen, lgOpen, xlOpen }
    },
    template: `
      <div class="flex flex-wrap gap-3">
        <Button @click="smOpen = true">Small</Button>
        <Button @click="mdOpen = true">Medium</Button>
        <Button @click="lgOpen = true">Large</Button>
        <Button @click="xlOpen = true">Extra Large</Button>

        <Dialog
          v-model="smOpen"
          size="sm"
          title="Small Dialog"
          description="This is a small dialog."
          confirm-text="OK"
        />

        <Dialog
          v-model="mdOpen"
          size="md"
          title="Medium Dialog"
          description="This is a medium dialog (default size)."
          confirm-text="OK"
        />

        <Dialog
          v-model="lgOpen"
          size="lg"
          title="Large Dialog"
          description="This is a large dialog with more space for content."
          confirm-text="OK"
        />

        <Dialog
          v-model="xlOpen"
          size="xl"
          title="Extra Large Dialog"
          description="This is an extra large dialog with plenty of space for detailed content."
          confirm-text="OK"
        />
      </div>
    `,
  }),
  args: {},
}
