import type { Meta, StoryObj } from '@storybook/vue3'
import Accordion from './Accordion.vue'
import AccordionItem from './AccordionItem.vue'

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <div class="w-[600px]">
        <Accordion>
          <AccordionItem title="What is Vue.js?">
            Vue.js is a progressive JavaScript framework for building user interfaces.
            Unlike other monolithic frameworks, Vue is designed from the ground up to be incrementally adoptable.
          </AccordionItem>
          <AccordionItem title="How do I get started?">
            Getting started with Vue is easy! You can include it via CDN or install it via npm.
            The official documentation provides comprehensive guides for beginners.
          </AccordionItem>
          <AccordionItem title="Is Vue suitable for large applications?">
            Absolutely! Vue scales between a library and a full-featured framework.
            With features like Vuex for state management and Vue Router for routing,
            it's perfectly suited for large-scale applications.
          </AccordionItem>
        </Accordion>
      </div>
    `,
  }),
  args: {},
}

export const AllowMultiple: Story = {
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <div class="w-[600px]">
        <Accordion :allow-multiple="true">
          <AccordionItem title="Features">
            Vue offers reactive data binding, component-based architecture,
            virtual DOM, and an extensive ecosystem.
          </AccordionItem>
          <AccordionItem title="Performance">
            Vue is extremely lightweight and performant. The virtual DOM implementation
            ensures optimal rendering performance.
          </AccordionItem>
          <AccordionItem title="Community">
            Vue has a large and active community with plenty of resources,
            plugins, and third-party components available.
          </AccordionItem>
        </Accordion>
      </div>
    `,
  }),
  args: {},
}

export const WithDefaultOpen: Story = {
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <div class="w-[600px]">
        <Accordion>
          <AccordionItem title="Introduction" :default-open="true">
            This section is opened by default. Click to collapse.
          </AccordionItem>
          <AccordionItem title="Getting Started">
            Learn the basics of setting up your first Vue application.
          </AccordionItem>
          <AccordionItem title="Advanced Topics">
            Dive deeper into advanced Vue concepts and patterns.
          </AccordionItem>
        </Accordion>
      </div>
    `,
  }),
  args: {},
}

export const FAQ: Story = {
  render: () => ({
    components: { Accordion, AccordionItem },
    template: `
      <div class="w-[700px]">
        <h2 class="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <Accordion>
          <AccordionItem title="What payment methods do you accept?">
            We accept all major credit cards (Visa, MasterCard, American Express),
            PayPal, and bank transfers for enterprise customers.
          </AccordionItem>
          <AccordionItem title="What is your refund policy?">
            We offer a 30-day money-back guarantee. If you're not satisfied with our product,
            you can request a full refund within 30 days of purchase.
          </AccordionItem>
          <AccordionItem title="Do you offer customer support?">
            Yes! We provide 24/7 customer support via email and live chat.
            Premium customers also have access to phone support.
          </AccordionItem>
          <AccordionItem title="Can I upgrade my plan later?">
            Absolutely! You can upgrade or downgrade your plan at any time.
            Changes will be reflected in your next billing cycle.
          </AccordionItem>
          <AccordionItem title="Is my data secure?">
            Security is our top priority. We use industry-standard encryption and
            regularly audit our systems to ensure your data is protected.
          </AccordionItem>
        </Accordion>
      </div>
    `,
  }),
  args: {},
}
