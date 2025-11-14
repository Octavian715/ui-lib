import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Modal from './Modal.vue'
import Button from '../Button/Button.vue'

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    showFooter: {
      control: 'boolean',
    },
    showCancel: {
      control: 'boolean',
    },
    showConfirm: {
      control: 'boolean',
    },
    confirmVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success'],
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)

      const openModal = () => {
        isOpen.value = true
      }

      const closeModal = () => {
        isOpen.value = false
      }

      return { args, isOpen, openModal, closeModal }
    },
    template: `
      <div>
        <Button @click="openModal">Open Modal</Button>
        <Modal
          v-bind="args"
          :is-open="isOpen"
          @close="closeModal"
          @confirm="closeModal"
        >
          <p class="text-gray-300">
            This is the modal body content. You can put any content here.
          </p>
        </Modal>
      </div>
    `,
  }),
  args: {
    isOpen: false,
    title: 'Example Modal',
    description: 'This is an example modal dialog with a title and description.',
    size: 'md',
    showFooter: true,
    showCancel: true,
    showConfirm: true,
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    confirmVariant: 'primary',
  },
}

export const LargeModal: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)

      const openModal = () => {
        isOpen.value = true
      }

      const closeModal = () => {
        isOpen.value = false
      }

      return { args, isOpen, openModal, closeModal }
    },
    template: `
      <div>
        <Button @click="openModal">Open Large Modal</Button>
        <Modal
          v-bind="args"
          :is-open="isOpen"
          @close="closeModal"
          @confirm="closeModal"
        >
          <p class="text-gray-300 mb-4">
            This is a large modal with more content.
          </p>
          <p class="text-gray-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </Modal>
      </div>
    `,
  }),
  args: {
    isOpen: false,
    title: 'Large Modal',
    description: 'This modal uses the large size variant.',
    size: 'lg',
  },
}

export const DangerModal: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)

      const openModal = () => {
        isOpen.value = true
      }

      const closeModal = () => {
        isOpen.value = false
      }

      return { args, isOpen, openModal, closeModal }
    },
    template: `
      <div>
        <Button variant="danger" @click="openModal">Delete Item</Button>
        <Modal
          v-bind="args"
          :is-open="isOpen"
          @close="closeModal"
          @confirm="closeModal"
        >
          <p class="text-gray-300">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        </Modal>
      </div>
    `,
  }),
  args: {
    isOpen: false,
    title: 'Delete Confirmation',
    description: 'This action is irreversible.',
    confirmText: 'Delete',
    confirmVariant: 'danger',
    cancelText: 'Cancel',
  },
}

export const NoFooter: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)

      const openModal = () => {
        isOpen.value = true
      }

      const closeModal = () => {
        isOpen.value = false
      }

      return { args, isOpen, openModal, closeModal }
    },
    template: `
      <div>
        <Button @click="openModal">Open Modal</Button>
        <Modal
          v-bind="args"
          :is-open="isOpen"
          @close="closeModal"
        >
          <p class="text-gray-300 mb-4">
            This modal has no footer buttons.
          </p>
          <Button @click="closeModal" class="w-full">
            Custom Close Button
          </Button>
        </Modal>
      </div>
    `,
  }),
  args: {
    isOpen: false,
    title: 'No Footer Modal',
    showFooter: false,
  },
}

export const CustomSlots: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      const isOpen = ref(false)

      const openModal = () => {
        isOpen.value = true
      }

      const closeModal = () => {
        isOpen.value = false
      }

      return { args, isOpen, openModal, closeModal }
    },
    template: `
      <div>
        <Button @click="openModal">Open Custom Modal</Button>
        <Modal
          :is-open="isOpen"
          @close="closeModal"
          @confirm="closeModal"
        >
          <template #header>
            <div class="flex items-center gap-2">
              <span class="text-2xl">🎨</span>
              <span>Custom Header</span>
            </div>
          </template>

          <template #description>
            <p class="italic">This modal uses custom slots for header and footer.</p>
          </template>

          <p class="text-gray-300">
            You can fully customize the modal content using slots.
          </p>

          <template #footer>
            <div class="flex gap-2">
              <Button variant="outline" size="sm" @click="closeModal">Later</Button>
              <Button variant="success" size="sm" @click="closeModal">Save</Button>
            </div>
          </template>
        </Modal>
      </div>
    `,
  }),
  args: {
    isOpen: false,
  },
}
