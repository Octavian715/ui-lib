import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Radio from './Radio.vue'
import RadioGroup from './RadioGroup.vue'

const meta = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'button'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info'],
    },
    disabled: {
      control: 'boolean',
    },
    required: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('option1')
      return { selected }
    },
    template: `
      <div class="w-96 space-y-3">
        <Radio v-model="selected" value="option1" label="Option 1" name="default" />
        <Radio v-model="selected" value="option2" label="Option 2" name="default" />
        <Radio v-model="selected" value="option3" label="Option 3" name="default" />
        <p class="mt-4 text-sm text-neutral-400">Selected: {{ selected }}</p>
      </div>
    `,
  }),
  args: { value: '' },
}

export const WithDescription: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const plan = ref('basic')
      return { plan }
    },
    template: `
      <div class="w-96 space-y-3">
        <Radio
          v-model="plan"
          value="basic"
          label="Basic Plan"
          description="Perfect for individuals and small projects"
          name="plan"
        />
        <Radio
          v-model="plan"
          value="pro"
          label="Pro Plan"
          description="For professionals and growing teams"
          name="plan"
        />
        <Radio
          v-model="plan"
          value="enterprise"
          label="Enterprise Plan"
          description="Advanced features for large organizations"
          name="plan"
        />
      </div>
    `,
  }),
  args: { value: '' },
}

export const CardVariant: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const deployment = ref('vercel')
      return { deployment }
    },
    template: `
      <div class="w-96 space-y-3">
        <Radio
          v-model="deployment"
          value="vercel"
          label="Vercel"
          description="Deploy with Vercel for optimal performance"
          variant="card"
          name="deployment"
        />
        <Radio
          v-model="deployment"
          value="netlify"
          label="Netlify"
          description="Deploy with Netlify for simplicity"
          variant="card"
          name="deployment"
        />
        <Radio
          v-model="deployment"
          value="aws"
          label="AWS"
          description="Deploy with AWS for full control"
          variant="card"
          name="deployment"
        />
      </div>
    `,
  }),
  args: { value: '' },
}

export const ButtonVariant: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const size = ref('md')
      return { size }
    },
    template: `
      <div class="flex flex-wrap gap-2">
        <Radio v-model="size" value="sm" label="Small" variant="button" name="size" />
        <Radio v-model="size" value="md" label="Medium" variant="button" name="size" />
        <Radio v-model="size" value="lg" label="Large" variant="button" name="size" />
        <Radio v-model="size" value="xl" label="Extra Large" variant="button" name="size" />
      </div>
    `,
  }),
  args: { value: '' },
}

export const Colors: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const primary = ref('a')
      const success = ref('a')
      const warning = ref('a')
      const danger = ref('a')
      const info = ref('a')
      return { primary, success, warning, danger, info }
    },
    template: `
      <div class="w-96 space-y-6">
        <div>
          <p class="text-sm text-neutral-400 mb-2">Primary</p>
          <Radio v-model="primary" value="a" label="Primary color" color="primary" name="primary" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Success</p>
          <Radio v-model="success" value="a" label="Success color" color="success" name="success" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Warning</p>
          <Radio v-model="warning" value="a" label="Warning color" color="warning" name="warning" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Danger</p>
          <Radio v-model="danger" value="a" label="Danger color" color="danger" name="danger" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-2">Info</p>
          <Radio v-model="info" value="a" label="Info color" color="info" name="info" />
        </div>
      </div>
    `,
  }),
  args: { value: '' },
}

export const Sizes: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const sm = ref('a')
      const md = ref('a')
      const lg = ref('a')
      return { sm, md, lg }
    },
    template: `
      <div class="w-96 space-y-4">
        <Radio v-model="sm" value="a" label="Small radio" size="sm" name="sm" />
        <Radio v-model="md" value="a" label="Medium radio" size="md" name="md" />
        <Radio v-model="lg" value="a" label="Large radio" size="lg" name="lg" />
      </div>
    `,
  }),
  args: { value: '' },
}

export const WithHint: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const newsletter = ref('weekly')
      return { newsletter }
    },
    template: `
      <div class="w-96 space-y-3">
        <Radio
          v-model="newsletter"
          value="daily"
          label="Daily digest"
          hint="Receive updates every day"
          name="newsletter"
        />
        <Radio
          v-model="newsletter"
          value="weekly"
          label="Weekly digest"
          hint="Receive updates every week"
          name="newsletter"
        />
        <Radio
          v-model="newsletter"
          value="monthly"
          label="Monthly digest"
          hint="Receive updates every month"
          name="newsletter"
        />
      </div>
    `,
  }),
  args: { value: '' },
}

export const Disabled: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('option1')
      return { selected }
    },
    template: `
      <div class="w-96 space-y-3">
        <Radio v-model="selected" value="option1" label="Enabled option" name="disabled" />
        <Radio v-model="selected" value="option2" label="Disabled option" disabled name="disabled" />
        <Radio v-model="selected" value="option3" label="Disabled checked" disabled name="disabled" />
      </div>
    `,
  }),
  args: { value: '' },
}

export const WithError: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const selected = ref('')
      return { selected }
    },
    template: `
      <div class="w-96 space-y-3">
        <Radio
          v-model="selected"
          value="option1"
          label="Option 1"
          name="error"
          error
          error-message="Please select an option"
        />
        <Radio
          v-model="selected"
          value="option2"
          label="Option 2"
          name="error"
          error
        />
      </div>
    `,
  }),
  args: { value: '' },
}

export const WithRadioGroup: Story = {
  render: () => ({
    components: { RadioGroup, Radio },
    setup() {
      const notification = ref('email')
      return { notification }
    },
    template: `
      <RadioGroup v-model="notification" label="Notification method" class="w-96">
        <Radio value="email" label="Email" description="Get notified via email" />
        <Radio value="sms" label="SMS" description="Get notified via SMS" />
        <Radio value="push" label="Push" description="Get notified via push notification" />
      </RadioGroup>
    `,
  }),
  args: { value: '' },
}

export const CardVariantWithColors: Story = {
  render: () => ({
    components: { Radio },
    setup() {
      const priority = ref('medium')
      return { priority }
    },
    template: `
      <div class="w-96 space-y-3">
        <Radio
          v-model="priority"
          value="low"
          label="Low Priority"
          description="Can be done when time allows"
          variant="card"
          color="info"
          name="priority"
        />
        <Radio
          v-model="priority"
          value="medium"
          label="Medium Priority"
          description="Should be completed soon"
          variant="card"
          color="warning"
          name="priority"
        />
        <Radio
          v-model="priority"
          value="high"
          label="High Priority"
          description="Needs immediate attention"
          variant="card"
          color="danger"
          name="priority"
        />
      </div>
    `,
  }),
  args: { value: '' },
}
