import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Drawer from './Drawer.vue'
import Button from '../Button/Button.vue'

const meta = {
  title: 'Components/Drawer',
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closable: {
      control: 'boolean',
    },
    closeOnOverlay: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div class="p-8">
        <Button @click="isOpen = true">Open Drawer</Button>
        <Drawer v-model="isOpen" title="Drawer Title">
          <p class="text-neutral-300">This is the drawer content.</p>
          <p class="text-neutral-300 mt-4">
            You can put any content here, including forms, lists, or custom components.
          </p>
        </Drawer>
      </div>
    `,
  }),
  args: {},
}

export const Placements: Story = {
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const leftOpen = ref(false)
      const rightOpen = ref(false)
      const topOpen = ref(false)
      const bottomOpen = ref(false)
      return { leftOpen, rightOpen, topOpen, bottomOpen }
    },
    template: `
      <div class="p-8 flex flex-wrap gap-4">
        <Button @click="leftOpen = true">Left Drawer</Button>
        <Button @click="rightOpen = true">Right Drawer</Button>
        <Button @click="topOpen = true">Top Drawer</Button>
        <Button @click="bottomOpen = true">Bottom Drawer</Button>

        <Drawer v-model="leftOpen" placement="left" title="Left Drawer">
          <p class="text-neutral-300">Drawer from the left side</p>
        </Drawer>

        <Drawer v-model="rightOpen" placement="right" title="Right Drawer">
          <p class="text-neutral-300">Drawer from the right side</p>
        </Drawer>

        <Drawer v-model="topOpen" placement="top" title="Top Drawer">
          <p class="text-neutral-300">Drawer from the top</p>
        </Drawer>

        <Drawer v-model="bottomOpen" placement="bottom" title="Bottom Drawer">
          <p class="text-neutral-300">Drawer from the bottom</p>
        </Drawer>
      </div>
    `,
  }),
  args: {},
}

export const Sizes: Story = {
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const smOpen = ref(false)
      const mdOpen = ref(false)
      const lgOpen = ref(false)
      const xlOpen = ref(false)
      return { smOpen, mdOpen, lgOpen, xlOpen }
    },
    template: `
      <div class="p-8 flex flex-wrap gap-4">
        <Button @click="smOpen = true">Small</Button>
        <Button @click="mdOpen = true">Medium</Button>
        <Button @click="lgOpen = true">Large</Button>
        <Button @click="xlOpen = true">Extra Large</Button>

        <Drawer v-model="smOpen" size="sm" title="Small Drawer">
          <p class="text-neutral-300">Small size drawer</p>
        </Drawer>

        <Drawer v-model="mdOpen" size="md" title="Medium Drawer">
          <p class="text-neutral-300">Medium size drawer (default)</p>
        </Drawer>

        <Drawer v-model="lgOpen" size="lg" title="Large Drawer">
          <p class="text-neutral-300">Large size drawer</p>
        </Drawer>

        <Drawer v-model="xlOpen" size="xl" title="Extra Large Drawer">
          <p class="text-neutral-300">Extra large size drawer</p>
        </Drawer>
      </div>
    `,
  }),
  args: {},
}

export const WithFooter: Story = {
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      const handleSave = () => {
        alert('Saved!')
        isOpen.value = false
      }
      return { isOpen, handleSave }
    },
    template: `
      <div class="p-8">
        <Button @click="isOpen = true">Open Form Drawer</Button>
        <Drawer v-model="isOpen" title="Edit Profile">
          <div class="space-y-4">
            <p class="text-neutral-300">
              Update your profile information below.
            </p>
            <div class="space-y-4 mt-6">
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-1">Name</label>
                <input
                  type="text"
                  class="w-full px-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-neutral-300 mb-1">Email</label>
                <input
                  type="email"
                  class="w-full px-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          </div>
          <template #footer>
            <div class="flex gap-3 justify-end">
              <Button variant="secondary" @click="isOpen = false">Cancel</Button>
              <Button variant="primary" @click="handleSave">Save Changes</Button>
            </div>
          </template>
        </Drawer>
      </div>
    `,
  }),
  args: {},
}

export const CustomHeader: Story = {
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div class="p-8">
        <Button @click="isOpen = true">Open Drawer</Button>
        <Drawer v-model="isOpen">
          <template #header>
            <div class="flex items-center gap-3">
              <div class="h-10 w-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                <svg class="h-6 w-6 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-white">User Profile</h2>
                <p class="text-sm text-neutral-400">Manage your account settings</p>
              </div>
            </div>
          </template>
          <p class="text-neutral-300">Custom header content</p>
        </Drawer>
      </div>
    `,
  }),
  args: {},
}
