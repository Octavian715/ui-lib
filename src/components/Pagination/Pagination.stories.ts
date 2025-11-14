import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Pagination from './Pagination.vue'

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    showText: {
      control: 'boolean',
    },
    showPageInfo: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(1)
      return { currentPage }
    },
    template: `
      <div class="w-[600px]">
        <Pagination
          v-model:current-page="currentPage"
          :total-pages="10"
        />
        <p class="mt-4 text-sm text-neutral-400 text-center">Current page: {{ currentPage }}</p>
      </div>
    `,
  }),
  args: {
    currentPage: 1,
    totalPages: 10,
  },
}

export const WithText: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(1)
      return { currentPage }
    },
    template: `
      <div class="w-[600px]">
        <Pagination
          v-model:current-page="currentPage"
          :total-pages="10"
          show-text
        />
      </div>
    `,
  }),
  args: {
    currentPage: 1,
    totalPages: 10,
  },
}

export const WithPageInfo: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(1)
      return { currentPage }
    },
    template: `
      <div class="w-[600px]">
        <Pagination
          v-model:current-page="currentPage"
          :total-pages="10"
          :total-items="250"
          show-page-info
        />
      </div>
    `,
  }),
  args: {
    currentPage: 1,
    totalPages: 10,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const pageSm = ref(1)
      const pageMd = ref(1)
      const pageLg = ref(1)
      return { pageSm, pageMd, pageLg }
    },
    template: `
      <div class="w-[700px] space-y-8">
        <div>
          <p class="text-sm text-neutral-400 mb-3">Small</p>
          <Pagination
            v-model:current-page="pageSm"
            :total-pages="8"
            size="sm"
          />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-3">Medium (default)</p>
          <Pagination
            v-model:current-page="pageMd"
            :total-pages="8"
            size="md"
          />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-3">Large</p>
          <Pagination
            v-model:current-page="pageLg"
            :total-pages="8"
            size="lg"
          />
        </div>
      </div>
    `,
  }),
  args: {
    currentPage: 1,
    totalPages: 8,
  },
}

export const ManyPages: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(25)
      return { currentPage }
    },
    template: `
      <div class="w-[700px]">
        <Pagination
          v-model:current-page="currentPage"
          :total-pages="100"
          :total-items="2500"
          show-text
          show-page-info
        />
      </div>
    `,
  }),
  args: {
    currentPage: 25,
    totalPages: 100,
  },
}

export const Complete: Story = {
  render: () => ({
    components: { Pagination },
    setup() {
      const currentPage = ref(5)
      return { currentPage }
    },
    template: `
      <div class="w-[700px]">
        <div class="mb-6 p-6 bg-neutral-900/50 rounded-lg border border-white/10">
          <h3 class="text-lg font-semibold text-white mb-2">Products List</h3>
          <p class="text-neutral-300">Showing results for page {{ currentPage }}</p>
        </div>
        <Pagination
          v-model:current-page="currentPage"
          :total-pages="20"
          :total-items="500"
          :max-visible-pages="5"
          show-text
          show-page-info
        />
      </div>
    `,
  }),
  args: {
    currentPage: 5,
    totalPages: 20,
  },
}
