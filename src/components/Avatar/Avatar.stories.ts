import type { Meta, StoryObj } from '@storybook/vue3'
import Avatar from './Avatar.vue'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    variant: {
      control: 'select',
      options: ['circle', 'rounded', 'square'],
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
    },
    bordered: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: '<Avatar v-bind="args" />',
  }),
  args: {
    initials: 'JD',
  },
}

export const WithImage: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: '<Avatar v-bind="args" />',
  }),
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
  },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center gap-4">
        <Avatar size="xs" initials="XS" />
        <Avatar size="sm" initials="SM" />
        <Avatar size="md" initials="MD" />
        <Avatar size="lg" initials="LG" />
        <Avatar size="xl" initials="XL" />
        <Avatar size="2xl" initials="2XL" />
      </div>
    `,
  }),
}

export const Variants: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center gap-4">
        <Avatar variant="circle" initials="JD" />
        <Avatar variant="rounded" initials="JD" />
        <Avatar variant="square" initials="JD" />
      </div>
    `,
  }),
}

export const WithStatus: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center gap-4">
        <Avatar initials="JD" status="online" />
        <Avatar initials="JD" status="offline" />
        <Avatar initials="JD" status="away" />
        <Avatar initials="JD" status="busy" />
      </div>
    `,
  }),
}

export const Bordered: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: '<Avatar v-bind="args" />',
  }),
  args: {
    src: 'https://i.pravatar.cc/150?img=2',
    bordered: true,
    size: 'lg',
  },
}

export const Fallback: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center gap-4">
        <Avatar src="invalid-url.jpg" />
        <Avatar initials="AB" />
        <Avatar />
      </div>
    `,
  }),
}

export const UserList: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-4 w-96">
        <div class="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
          <Avatar src="https://i.pravatar.cc/150?img=3" status="online" />
          <div>
            <p class="text-white font-semibold">John Doe</p>
            <p class="text-neutral-400 text-sm">online</p>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
          <Avatar initials="AB" status="away" />
          <div>
            <p class="text-white font-semibold">Alice Brown</p>
            <p class="text-neutral-400 text-sm">away</p>
          </div>
        </div>
        <div class="flex items-center gap-3 p-3 bg-neutral-900/50 rounded-lg">
          <Avatar src="https://i.pravatar.cc/150?img=5" status="offline" />
          <div>
            <p class="text-white font-semibold">Bob Smith</p>
            <p class="text-neutral-400 text-sm">offline</p>
          </div>
        </div>
      </div>
    `,
  }),
}

export const AvatarGroup: Story = {
  render: (args) => ({
    components: { Avatar },
    setup() {
      return { args }
    },
    template: `
      <div class="flex -space-x-2">
        <Avatar src="https://i.pravatar.cc/150?img=6" bordered size="md" class="z-40" />
        <Avatar src="https://i.pravatar.cc/150?img=7" bordered size="md" class="z-30" />
        <Avatar src="https://i.pravatar.cc/150?img=8" bordered size="md" class="z-20" />
        <Avatar initials="+5" bordered size="md" class="z-10" />
      </div>
    `,
  }),
}
