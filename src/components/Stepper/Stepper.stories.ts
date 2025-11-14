import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Stepper from './Stepper.vue'
import type { Step } from './Stepper.vue'
import Button from '../Button/Button.vue'

const meta = {
  title: 'Components/Stepper',
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['default', 'simple', 'circles'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    clickable: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj

const steps: Step[] = [
  { label: 'Account Details', description: 'Create your account' },
  { label: 'Personal Info', description: 'Tell us about yourself' },
  { label: 'Preferences', description: 'Customize your experience' },
  { label: 'Review', description: 'Confirm and submit' },
]

export const Default: Story = {
  render: () => ({
    components: { Stepper, Button },
    setup() {
      const currentStep = ref(1)
      const handleNext = () => {
        if (currentStep.value < steps.length - 1) {
          currentStep.value++
        }
      }
      const handlePrev = () => {
        if (currentStep.value > 0) {
          currentStep.value--
        }
      }
      return { currentStep, steps, handleNext, handlePrev }
    },
    template: `
      <div class="w-full space-y-6">
        <Stepper :steps="steps" :current-step="currentStep" />
        <div class="flex gap-3 justify-center">
          <Button
            variant="secondary"
            :disabled="currentStep === 0"
            @click="handlePrev"
          >
            Previous
          </Button>
          <Button
            :disabled="currentStep === steps.length - 1"
            @click="handleNext"
          >
            Next
          </Button>
        </div>
      </div>
    `,
  }),
  args: {},
}

export const Vertical: Story = {
  render: () => ({
    components: { Stepper },
    setup() {
      const currentStep = ref(1)
      return { currentStep, steps }
    },
    template: `
      <div class="max-w-md">
        <Stepper
          :steps="steps"
          :current-step="currentStep"
          orientation="vertical"
        />
      </div>
    `,
  }),
  args: {},
}

export const Clickable: Story = {
  render: () => ({
    components: { Stepper },
    setup() {
      const currentStep = ref(1)
      return { currentStep, steps }
    },
    template: `
      <div class="w-full">
        <Stepper
          :steps="steps"
          v-model:current-step="currentStep"
          clickable
        />
        <p class="text-center mt-6 text-neutral-400">
          Current step: {{ currentStep + 1 }}
        </p>
      </div>
    `,
  }),
  args: {},
}

export const Sizes: Story = {
  render: () => ({
    components: { Stepper },
    setup() {
      const currentStep = ref(1)
      return { currentStep, steps }
    },
    template: `
      <div class="w-full space-y-12">
        <div>
          <p class="text-sm text-neutral-400 mb-4">Small</p>
          <Stepper :steps="steps" :current-step="currentStep" size="sm" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-4">Medium (default)</p>
          <Stepper :steps="steps" :current-step="currentStep" size="md" />
        </div>
        <div>
          <p class="text-sm text-neutral-400 mb-4">Large</p>
          <Stepper :steps="steps" :current-step="currentStep" size="lg" />
        </div>
      </div>
    `,
  }),
  args: {},
}

export const SimpleSteps: Story = {
  render: () => ({
    components: { Stepper },
    setup() {
      const currentStep = ref(2)
      const simpleSteps: Step[] = [
        { label: 'Cart' },
        { label: 'Shipping' },
        { label: 'Payment' },
        { label: 'Confirm' },
      ]
      return { currentStep, simpleSteps }
    },
    template: `
      <div class="w-full">
        <Stepper :steps="simpleSteps" :current-step="currentStep" />
      </div>
    `,
  }),
  args: {},
}

export const MultiStepForm: Story = {
  render: () => ({
    components: { Stepper, Button },
    setup() {
      const currentStep = ref(0)
      const formSteps: Step[] = [
        { label: 'Basic Info', description: 'Name and email' },
        { label: 'Address', description: 'Shipping details' },
        { label: 'Payment', description: 'Billing information' },
        { label: 'Complete', description: 'Review and submit' },
      ]

      const handleNext = () => {
        if (currentStep.value < formSteps.length - 1) {
          currentStep.value++
        }
      }

      const handlePrev = () => {
        if (currentStep.value > 0) {
          currentStep.value--
        }
      }

      return { currentStep, formSteps, handleNext, handlePrev }
    },
    template: `
      <div class="w-full max-w-3xl mx-auto">
        <Stepper :steps="formSteps" :current-step="currentStep" class="mb-8" />

        <div class="bg-neutral-900 rounded-lg border border-white/10 p-6 min-h-[300px]">
          <div v-if="currentStep === 0">
            <h3 class="text-lg font-semibold text-white mb-4">Basic Information</h3>
            <div class="space-y-4">
              <input
                type="text"
                class="w-full px-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                placeholder="Full Name"
              />
              <input
                type="email"
                class="w-full px-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                placeholder="Email Address"
              />
            </div>
          </div>

          <div v-if="currentStep === 1">
            <h3 class="text-lg font-semibold text-white mb-4">Shipping Address</h3>
            <div class="space-y-4">
              <input
                type="text"
                class="w-full px-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                placeholder="Street Address"
              />
              <div class="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  class="w-full px-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                  placeholder="City"
                />
                <input
                  type="text"
                  class="w-full px-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                  placeholder="Postal Code"
                />
              </div>
            </div>
          </div>

          <div v-if="currentStep === 2">
            <h3 class="text-lg font-semibold text-white mb-4">Payment Method</h3>
            <div class="space-y-4">
              <input
                type="text"
                class="w-full px-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                placeholder="Card Number"
              />
              <div class="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  class="w-full px-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                  placeholder="MM/YY"
                />
                <input
                  type="text"
                  class="w-full px-4 py-2 bg-neutral-800 border border-white/10 rounded-lg text-white"
                  placeholder="CVV"
                />
              </div>
            </div>
          </div>

          <div v-if="currentStep === 3">
            <h3 class="text-lg font-semibold text-white mb-4">Review & Submit</h3>
            <p class="text-neutral-300">
              Please review your information before submitting.
            </p>
          </div>
        </div>

        <div class="flex gap-3 justify-between mt-6">
          <Button
            variant="secondary"
            :disabled="currentStep === 0"
            @click="handlePrev"
          >
            Previous
          </Button>
          <Button
            @click="handleNext"
          >
            {{ currentStep === formSteps.length - 1 ? 'Submit' : 'Next' }}
          </Button>
        </div>
      </div>
    `,
  }),
  args: {},
}
