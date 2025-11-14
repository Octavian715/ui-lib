import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Tabs from './Tabs.vue'
import TabPanel from './TabPanel.vue'

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'underline', 'pills'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const activeTab = ref('tab1')
      const tabs = [
        { label: 'Profile', value: 'tab1' },
        { label: 'Settings', value: 'tab2' },
        { label: 'Team', value: 'tab3' },
      ]
      return { activeTab, tabs }
    },
    template: `
      <div class="w-[600px]">
        <Tabs v-model="activeTab" :tabs="tabs">
          <TabPanel value="tab1">
            <div class="p-4">
              <h3 class="text-lg font-semibold text-white mb-2">Profile Content</h3>
              <p class="text-neutral-300">
                Manage your profile information and preferences here.
              </p>
            </div>
          </TabPanel>
          <TabPanel value="tab2">
            <div class="p-4">
              <h3 class="text-lg font-semibold text-white mb-2">Settings Content</h3>
              <p class="text-neutral-300">
                Configure your application settings and preferences.
              </p>
            </div>
          </TabPanel>
          <TabPanel value="tab3">
            <div class="p-4">
              <h3 class="text-lg font-semibold text-white mb-2">Team Content</h3>
              <p class="text-neutral-300">
                Manage your team members and permissions.
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    tabs: [],
  },
}

export const Variants: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const activeTab1 = ref('tab1')
      const activeTab2 = ref('tab1')
      const activeTab3 = ref('tab1')
      const tabs = [
        { label: 'Home', value: 'tab1' },
        { label: 'About', value: 'tab2' },
        { label: 'Contact', value: 'tab3' },
      ]
      return { activeTab1, activeTab2, activeTab3, tabs }
    },
    template: `
      <div class="w-[600px] space-y-8">
        <div>
          <p class="text-sm text-neutral-400 mb-2">Default</p>
          <Tabs v-model="activeTab1" :tabs="tabs" variant="default">
            <TabPanel value="tab1"><div class="p-4 text-neutral-300">Home content</div></TabPanel>
            <TabPanel value="tab2"><div class="p-4 text-neutral-300">About content</div></TabPanel>
            <TabPanel value="tab3"><div class="p-4 text-neutral-300">Contact content</div></TabPanel>
          </Tabs>
        </div>

        <div>
          <p class="text-sm text-neutral-400 mb-2">Underline</p>
          <Tabs v-model="activeTab2" :tabs="tabs" variant="underline">
            <TabPanel value="tab1"><div class="p-4 text-neutral-300">Home content</div></TabPanel>
            <TabPanel value="tab2"><div class="p-4 text-neutral-300">About content</div></TabPanel>
            <TabPanel value="tab3"><div class="p-4 text-neutral-300">Contact content</div></TabPanel>
          </Tabs>
        </div>

        <div>
          <p class="text-sm text-neutral-400 mb-2">Pills</p>
          <Tabs v-model="activeTab3" :tabs="tabs" variant="pills">
            <TabPanel value="tab1"><div class="p-4 text-neutral-300">Home content</div></TabPanel>
            <TabPanel value="tab2"><div class="p-4 text-neutral-300">About content</div></TabPanel>
            <TabPanel value="tab3"><div class="p-4 text-neutral-300">Contact content</div></TabPanel>
          </Tabs>
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    tabs: [],
  },
}

export const WithBadges: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const activeTab = ref('inbox')
      const tabs = [
        { label: 'Inbox', value: 'inbox', badge: '12' },
        { label: 'Sent', value: 'sent', badge: '5' },
        { label: 'Drafts', value: 'drafts', badge: '3' },
        { label: 'Spam', value: 'spam', badge: '99+' },
      ]
      return { activeTab, tabs }
    },
    template: `
      <div class="w-[600px]">
        <Tabs v-model="activeTab" :tabs="tabs" variant="underline">
          <TabPanel value="inbox">
            <div class="p-4 text-neutral-300">12 unread messages in inbox</div>
          </TabPanel>
          <TabPanel value="sent">
            <div class="p-4 text-neutral-300">5 sent messages</div>
          </TabPanel>
          <TabPanel value="drafts">
            <div class="p-4 text-neutral-300">3 draft messages</div>
          </TabPanel>
          <TabPanel value="spam">
            <div class="p-4 text-neutral-300">99+ spam messages</div>
          </TabPanel>
        </Tabs>
      </div>
    `,
  }),
  args: {
    modelValue: 'inbox',
    tabs: [],
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const activeSm = ref('tab1')
      const activeMd = ref('tab1')
      const activeLg = ref('tab1')
      const tabs = [
        { label: 'First', value: 'tab1' },
        { label: 'Second', value: 'tab2' },
        { label: 'Third', value: 'tab3' },
      ]
      return { activeSm, activeMd, activeLg, tabs }
    },
    template: `
      <div class="w-[600px] space-y-8">
        <div>
          <p class="text-sm text-neutral-400 mb-2">Small</p>
          <Tabs v-model="activeSm" :tabs="tabs" size="sm" variant="pills">
            <TabPanel value="tab1"><div class="p-3 text-sm text-neutral-300">Small content</div></TabPanel>
            <TabPanel value="tab2"><div class="p-3 text-sm text-neutral-300">Small content</div></TabPanel>
            <TabPanel value="tab3"><div class="p-3 text-sm text-neutral-300">Small content</div></TabPanel>
          </Tabs>
        </div>

        <div>
          <p class="text-sm text-neutral-400 mb-2">Medium</p>
          <Tabs v-model="activeMd" :tabs="tabs" size="md" variant="pills">
            <TabPanel value="tab1"><div class="p-4 text-neutral-300">Medium content</div></TabPanel>
            <TabPanel value="tab2"><div class="p-4 text-neutral-300">Medium content</div></TabPanel>
            <TabPanel value="tab3"><div class="p-4 text-neutral-300">Medium content</div></TabPanel>
          </Tabs>
        </div>

        <div>
          <p class="text-sm text-neutral-400 mb-2">Large</p>
          <Tabs v-model="activeLg" :tabs="tabs" size="lg" variant="pills">
            <TabPanel value="tab1"><div class="p-4 text-lg text-neutral-300">Large content</div></TabPanel>
            <TabPanel value="tab2"><div class="p-4 text-lg text-neutral-300">Large content</div></TabPanel>
            <TabPanel value="tab3"><div class="p-4 text-lg text-neutral-300">Large content</div></TabPanel>
          </Tabs>
        </div>
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    tabs: [],
  },
}

export const WithDisabled: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const activeTab = ref('tab1')
      const tabs = [
        { label: 'Enabled', value: 'tab1' },
        { label: 'Disabled', value: 'tab2', disabled: true },
        { label: 'Enabled', value: 'tab3' },
      ]
      return { activeTab, tabs }
    },
    template: `
      <div class="w-[600px]">
        <Tabs v-model="activeTab" :tabs="tabs" variant="underline">
          <TabPanel value="tab1">
            <div class="p-4 text-neutral-300">First tab content</div>
          </TabPanel>
          <TabPanel value="tab2">
            <div class="p-4 text-neutral-300">This tab is disabled</div>
          </TabPanel>
          <TabPanel value="tab3">
            <div class="p-4 text-neutral-300">Third tab content</div>
          </TabPanel>
        </Tabs>
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    tabs: [],
  },
}

export const FullWidth: Story = {
  render: () => ({
    components: { Tabs, TabPanel },
    setup() {
      const activeTab = ref('tab1')
      const tabs = [
        { label: 'Overview', value: 'tab1' },
        { label: 'Analytics', value: 'tab2' },
        { label: 'Reports', value: 'tab3' },
        { label: 'Notifications', value: 'tab4' },
      ]
      return { activeTab, tabs }
    },
    template: `
      <div class="w-[600px]">
        <Tabs v-model="activeTab" :tabs="tabs" fullWidth variant="underline">
          <TabPanel value="tab1"><div class="p-4 text-neutral-300">Overview content</div></TabPanel>
          <TabPanel value="tab2"><div class="p-4 text-neutral-300">Analytics content</div></TabPanel>
          <TabPanel value="tab3"><div class="p-4 text-neutral-300">Reports content</div></TabPanel>
          <TabPanel value="tab4"><div class="p-4 text-neutral-300">Notifications content</div></TabPanel>
        </Tabs>
      </div>
    `,
  }),
  args: {
    modelValue: 'tab1',
    tabs: [],
  },
}
