import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Switch from './Switch.vue'

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const enabled = ref(false)
      return { args, enabled }
    },
    template: `
      <div class="flex items-center gap-4">
        <Switch v-bind="args" v-model="enabled" />
        <span class="text-sm text-gray-400">Status: {{ enabled ? 'On' : 'Off' }}</span>
      </div>
    `,
  }),
}

export const WithLabel: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const enabled = ref(true)
      return { args, enabled }
    },
    template: `
      <div class="flex items-center">
        <Switch v-bind="args" v-model="enabled" />
      </div>
    `,
  }),
  args: {
    label: 'Enable notifications',
  },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const enabledSm = ref(true)
      const enabledMd = ref(true)
      const enabledLg = ref(true)
      return { args, enabledSm, enabledMd, enabledLg }
    },
    template: `
      <div class="space-y-4">
        <div class="flex items-center">
          <Switch v-model="enabledSm" size="sm" label="Small" />
        </div>
        <div class="flex items-center">
          <Switch v-model="enabledMd" size="md" label="Medium" />
        </div>
        <div class="flex items-center">
          <Switch v-model="enabledLg" size="lg" label="Large" />
        </div>
      </div>
    `,
  }),
}

export const Disabled: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const enabled = ref(true)
      return { args, enabled }
    },
    template: `
      <div class="flex items-center">
        <Switch v-bind="args" v-model="enabled" />
      </div>
    `,
  }),
  args: {
    label: 'Disabled switch',
    disabled: true,
  },
}

export const SettingsPanel: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const settings = ref({
        notifications: true,
        darkMode: false,
        autoSave: true,
        analytics: false,
      })
      return { args, settings }
    },
    template: `
      <div class="w-80 bg-secondary-800 border border-secondary-700 rounded-lg p-6 space-y-4">
        <h3 class="text-lg font-semibold text-white mb-4">Settings</h3>

        <div class="flex items-center justify-between">
          <span class="text-white">Notifications</span>
          <Switch v-model="settings.notifications" />
        </div>

        <div class="flex items-center justify-between">
          <span class="text-white">Dark Mode</span>
          <Switch v-model="settings.darkMode" />
        </div>

        <div class="flex items-center justify-between">
          <span class="text-white">Auto Save</span>
          <Switch v-model="settings.autoSave" />
        </div>

        <div class="flex items-center justify-between">
          <span class="text-white">Analytics</span>
          <Switch v-model="settings.analytics" />
        </div>
      </div>
    `,
  }),
}
