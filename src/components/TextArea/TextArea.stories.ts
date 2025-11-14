import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import TextArea from './TextArea.vue'

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    disabled: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    showCount: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TextArea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
        <p class="mt-2 text-sm text-gray-400">Length: {{ value.length }}</p>
      </div>
    `,
  }),
  args: {
    label: 'Description',
    placeholder: 'Enter your description here...',
  },
}

export const WithHint: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Feedback',
    placeholder: 'Share your thoughts...',
    hint: 'Please be as detailed as possible',
    rows: 5,
  },
}

export const WithError: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('Too short')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Comment',
    placeholder: 'Write a comment...',
    error: true,
    errorMessage: 'Comment must be at least 10 characters',
  },
}

export const WithMaxLength: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('This is a sample text to demonstrate the character counter.')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    maxLength: 200,
    showCount: true,
  },
}

export const Required: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Required field',
    placeholder: 'This field is required',
    required: true,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('This textarea is disabled')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Disabled',
    disabled: true,
  },
}

export const Readonly: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('This content is read-only and cannot be edited.')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Read-only',
    readonly: true,
  },
}

export const Sizes: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const valueSm = ref('')
      const valueMd = ref('')
      const valueLg = ref('')
      return { args, valueSm, valueMd, valueLg }
    },
    template: `
      <div class="w-96 space-y-4">
        <TextArea v-model="valueSm" label="Small" size="sm" placeholder="Small textarea" rows="3" />
        <TextArea v-model="valueMd" label="Medium" size="md" placeholder="Medium textarea" rows="3" />
        <TextArea v-model="valueLg" label="Large" size="lg" placeholder="Large textarea" rows="3" />
      </div>
    `,
  }),
}

export const ResizeOptions: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value1 = ref('')
      const value2 = ref('')
      const value3 = ref('')
      const value4 = ref('')
      return { args, value1, value2, value3, value4 }
    },
    template: `
      <div class="w-96 space-y-4">
        <TextArea v-model="value1" label="No resize" resize="none" rows="3" />
        <TextArea v-model="value2" label="Vertical resize" resize="vertical" rows="3" />
        <TextArea v-model="value3" label="Horizontal resize" resize="horizontal" rows="3" />
        <TextArea v-model="value4" label="Both directions" resize="both" rows="3" />
      </div>
    `,
  }),
}

export const LongForm: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div class="w-96">
        <TextArea v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Article Content',
    placeholder: 'Write your article here...',
    rows: 10,
    maxLength: 5000,
    hint: 'Markdown formatting is supported',
  },
}
