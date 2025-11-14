import type { Meta, StoryObj } from '@storybook/vue3'
import { h, ref } from 'vue'
import Tag from './Tag.vue'

const meta = {
  title: 'Components/Tag',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    rounded: {
      control: 'boolean',
    },
    closable: {
      control: 'boolean',
    },
    bordered: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta

export default meta
type Story = StoryObj

const tagIcon = () => h('svg', {
  viewBox: '0 0 20 20',
  fill: 'currentColor',
}, [
  h('path', {
    'fill-rule': 'evenodd',
    'd': 'M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z',
    'clip-rule': 'evenodd',
  }),
])

export const Default: Story = {
  render: () => ({
    components: { Tag },
    template: '<Tag label="Default Tag" />',
  }),
  args: {},
}

export const Variants: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div class="flex flex-wrap gap-3">
        <Tag label="Default" variant="default" />
        <Tag label="Primary" variant="primary" />
        <Tag label="Success" variant="success" />
        <Tag label="Warning" variant="warning" />
        <Tag label="Danger" variant="danger" />
        <Tag label="Info" variant="info" />
      </div>
    `,
  }),
  args: {},
}

export const Sizes: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div class="flex items-center gap-3">
        <Tag label="Small" size="sm" variant="primary" />
        <Tag label="Medium" size="md" variant="primary" />
        <Tag label="Large" size="lg" variant="primary" />
      </div>
    `,
  }),
  args: {},
}

export const Rounded: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div class="flex flex-wrap gap-3">
        <Tag label="Rounded Default" variant="default" rounded />
        <Tag label="Rounded Primary" variant="primary" rounded />
        <Tag label="Rounded Success" variant="success" rounded />
        <Tag label="Rounded Warning" variant="warning" rounded />
      </div>
    `,
  }),
  args: {},
}

export const Bordered: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div class="flex flex-wrap gap-3">
        <Tag label="Bordered Default" variant="default" bordered />
        <Tag label="Bordered Primary" variant="primary" bordered />
        <Tag label="Bordered Success" variant="success" bordered />
        <Tag label="Bordered Danger" variant="danger" bordered />
      </div>
    `,
  }),
  args: {},
}

export const WithIcon: Story = {
  render: () => ({
    components: { Tag },
    setup() {
      return { tagIcon }
    },
    template: `
      <div class="flex flex-wrap gap-3">
        <Tag label="With Icon" variant="primary">
          <template #icon>
            <component :is="tagIcon" />
          </template>
        </Tag>
        <Tag label="Success Tag" variant="success" size="lg">
          <template #icon>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
            </svg>
          </template>
        </Tag>
      </div>
    `,
  }),
  args: {},
}

export const Closable: Story = {
  render: () => ({
    components: { Tag },
    setup() {
      const tags = ref(['React', 'Vue', 'Angular', 'Svelte', 'Next.js'])
      const removeTag = (index: number) => {
        tags.value.splice(index, 1)
      }
      return { tags, removeTag }
    },
    template: `
      <div class="flex flex-wrap gap-2">
        <Tag
          v-for="(tag, index) in tags"
          :key="tag"
          :label="tag"
          variant="primary"
          closable
          @close="removeTag(index)"
        />
      </div>
    `,
  }),
  args: {},
}

export const TagGroup: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-sm text-neutral-400 mb-2">Technologies</p>
          <div class="flex flex-wrap gap-2">
            <Tag label="TypeScript" variant="primary" bordered />
            <Tag label="Vue 3" variant="success" bordered />
            <Tag label="Tailwind CSS" variant="info" bordered />
            <Tag label="Vite" variant="warning" bordered />
          </div>
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Status Tags</p>
          <div class="flex flex-wrap gap-2">
            <Tag label="Active" variant="success" rounded />
            <Tag label="Pending" variant="warning" rounded />
            <Tag label="Inactive" variant="default" rounded />
            <Tag label="Error" variant="danger" rounded />
          </div>
        </div>
      </div>
    `,
  }),
  args: {},
}
