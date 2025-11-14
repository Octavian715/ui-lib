import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Rating from './Rating.vue'

const meta = {
  title: 'Components/Rating',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: 'select',
      options: ['yellow', 'orange', 'red', 'blue', 'green'],
    },
    max: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    showValue: {
      control: 'boolean',
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
    components: { Rating },
    setup() {
      const rating = ref(3)
      return { rating }
    },
    template: '<Rating v-model="rating" />',
  }),
  args: {},
}

export const WithValue: Story = {
  render: () => ({
    components: { Rating },
    setup() {
      const rating = ref(4)
      return { rating }
    },
    template: `
      <div class="space-y-2">
        <Rating v-model="rating" show-value />
        <p class="text-sm text-neutral-400">Current rating: {{ rating }}</p>
      </div>
    `,
  }),
  args: {},
}

export const Sizes: Story = {
  render: () => ({
    components: { Rating },
    setup() {
      const rating = ref(4)
      return { rating }
    },
    template: `
      <div class="space-y-6">
        <div>
          <p class="text-sm text-neutral-400 mb-2">Small</p>
          <Rating v-model="rating" size="sm" show-value />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Medium (default)</p>
          <Rating v-model="rating" size="md" show-value />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Large</p>
          <Rating v-model="rating" size="lg" show-value />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Extra Large</p>
          <Rating v-model="rating" size="xl" show-value />
        </div>
      </div>
    `,
  }),
  args: {},
}

export const Colors: Story = {
  render: () => ({
    components: { Rating },
    setup() {
      const rating = ref(4)
      return { rating }
    },
    template: `
      <div class="space-y-4">
        <Rating v-model="rating" color="yellow" show-value />
        <Rating v-model="rating" color="orange" show-value />
        <Rating v-model="rating" color="red" show-value />
        <Rating v-model="rating" color="blue" show-value />
        <Rating v-model="rating" color="green" show-value />
      </div>
    `,
  }),
  args: {},
}

export const Readonly: Story = {
  render: () => ({
    components: { Rating },
    template: `
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <Rating :model-value="5" readonly show-value />
          <span class="text-neutral-400">Excellent</span>
        </div>
        <div class="flex items-center gap-4">
          <Rating :model-value="4" readonly show-value color="green" />
          <span class="text-neutral-400">Good</span>
        </div>
        <div class="flex items-center gap-4">
          <Rating :model-value="3" readonly show-value color="orange" />
          <span class="text-neutral-400">Average</span>
        </div>
        <div class="flex items-center gap-4">
          <Rating :model-value="2" readonly show-value color="red" />
          <span class="text-neutral-400">Poor</span>
        </div>
      </div>
    `,
  }),
  args: {},
}

export const Disabled: Story = {
  render: () => ({
    components: { Rating },
    setup() {
      const rating = ref(3)
      return { rating }
    },
    template: '<Rating v-model="rating" disabled show-value />',
  }),
  args: {},
}

export const CustomMax: Story = {
  render: () => ({
    components: { Rating },
    setup() {
      const rating1 = ref(5)
      const rating2 = ref(7)
      return { rating1, rating2 }
    },
    template: `
      <div class="space-y-4">
        <div>
          <p class="text-sm text-neutral-400 mb-2">10 Stars</p>
          <Rating v-model="rating2" :max="10" show-value size="sm" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">5 Stars (default)</p>
          <Rating v-model="rating1" :max="5" show-value />
        </div>
      </div>
    `,
  }),
  args: {},
}

export const Interactive: Story = {
  render: () => ({
    components: { Rating },
    setup() {
      const rating = ref(0)
      const feedback = ref('')

      const updateFeedback = (value: number) => {
        const messages = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
        feedback.value = messages[value] || ''
      }

      const handleChange = (value: number) => {
        updateFeedback(value)
      }

      return { rating, feedback, handleChange }
    },
    template: `
      <div class="space-y-4">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-white mb-4">Rate Your Experience</h3>
          <Rating
            v-model="rating"
            size="xl"
            color="yellow"
            @change="handleChange"
          />
          <p v-if="feedback" class="mt-4 text-lg font-semibold text-primary-400">
            {{ feedback }}
          </p>
        </div>
      </div>
    `,
  }),
  args: {},
}
