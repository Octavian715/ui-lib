# Vue 3 UI Library

A modern, fully-featured UI component library built with Vue 3, TypeScript, Tailwind CSS, and HeadlessUI. Designed for SSR compatibility and optimized for production use.

## Features

- 🎨 **Beautiful Design** - Modern, dark-themed components with Tailwind CSS
- 🔧 **TypeScript** - Full TypeScript support with type definitions
- ♿ **Accessible** - Built with HeadlessUI for WCAG compliance
- 🎭 **Variants** - Multiple variants and sizes using CVA (Class Variance Authority)
- 📦 **Tree-shakeable** - Only import what you need
- 🚀 **SSR Ready** - Full server-side rendering support
- 📚 **Storybook** - Interactive component documentation
- ⚡ **Vite Powered** - Lightning-fast development and building

## Components

- **Button** - Versatile button component with multiple variants (primary, secondary, outline, ghost, danger, success)
- **Modal** - Accessible dialog/modal component with customizable sizes
- **Tooltip** - Contextual information overlay with multiple positions
- **Dropdown** - Select/dropdown component with search support
- **Input** - Form input component with validation and error states

## Installation

```bash
npm install
```

## Development

### Start Development Server

```bash
npm run dev
```

### Start Storybook

```bash
npm run storybook
```

### Build Library

```bash
npm run build
```

### Type Check

```bash
npm run type-check
```

## Usage

### 1. Install as Global Plugin

```typescript
// main.ts
import { createApp } from 'vue'
import UILibPlugin from '@custom/ui-lib'
import '@custom/ui-lib/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(UILibPlugin)
app.mount('#app')
```

Then use components directly:

```vue
<template>
  <UIButton variant="primary">Click me</UIButton>
</template>
```

### 2. Import Individual Components

```vue
<script setup lang="ts">
import { Button, Modal, Input } from '@custom/ui-lib'
import '@custom/ui-lib/style.css'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <div>
    <Button @click="isOpen = true">Open Modal</Button>

    <Modal
      :is-open="isOpen"
      @close="isOpen = false"
      title="Example Modal"
    >
      <p>Modal content here</p>
    </Modal>
  </div>
</template>
```

## Component Documentation

### Button

```vue
<script setup lang="ts">
import { Button } from '@custom/ui-lib'
</script>

<template>
  <!-- Variants -->
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="danger">Danger</Button>
  <Button variant="success">Success</Button>

  <!-- Sizes -->
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>

  <!-- States -->
  <Button disabled>Disabled</Button>
  <Button loading>Loading</Button>
</template>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `loading`: boolean
- `type`: 'button' | 'submit' | 'reset'

**Events:**
- `@click`: Emitted when button is clicked

---

### Modal

```vue
<script setup lang="ts">
import { Modal, Button } from '@custom/ui-lib'
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <Button @click="isOpen = true">Open Modal</Button>

  <Modal
    :is-open="isOpen"
    @close="isOpen = false"
    @confirm="handleConfirm"
    title="Confirm Action"
    description="Are you sure you want to proceed?"
    size="md"
    confirm-text="Yes, proceed"
    cancel-text="Cancel"
  >
    <p>Additional modal content...</p>
  </Modal>
</template>
```

**Props:**
- `isOpen`: boolean (required)
- `title`: string
- `description`: string
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `showFooter`: boolean (default: true)
- `showCancel`: boolean (default: true)
- `showConfirm`: boolean (default: true)
- `cancelText`: string (default: 'Cancel')
- `confirmText`: string (default: 'Confirm')
- `confirmVariant`: ButtonVariant (default: 'primary')

**Events:**
- `@close`: Emitted when modal should close
- `@confirm`: Emitted when confirm button is clicked

**Slots:**
- `header`: Custom header content
- `description`: Custom description content
- `default`: Modal body content
- `footer`: Custom footer content

---

### Input

```vue
<script setup lang="ts">
import { Input } from '@custom/ui-lib'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <!-- Basic -->
  <Input
    v-model="email"
    label="Email"
    type="email"
    placeholder="you@example.com"
  />

  <!-- With validation -->
  <Input
    v-model="email"
    label="Email"
    type="email"
    error
    error-message="Please enter a valid email"
  />

  <!-- With hint -->
  <Input
    v-model="email"
    label="Email"
    hint="We'll never share your email"
  />

  <!-- Clearable -->
  <Input
    v-model="email"
    label="Search"
    type="search"
    clearable
  />

  <!-- With prefix/suffix -->
  <Input
    v-model="price"
    label="Price"
    type="number"
  >
    <template #prefix>$</template>
    <template #suffix>USD</template>
  </Input>
</template>
```

**Props:**
- `modelValue`: string | number
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
- `label`: string
- `placeholder`: string
- `hint`: string
- `errorMessage`: string
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `readonly`: boolean
- `required`: boolean
- `error`: boolean
- `clearable`: boolean

**Events:**
- `@update:modelValue`: Emitted when value changes
- `@blur`: Emitted on blur
- `@focus`: Emitted on focus
- `@input`: Emitted on input

**Slots:**
- `prefix`: Content before input
- `suffix`: Content after input

---

### Dropdown

```vue
<script setup lang="ts">
import { Dropdown } from '@custom/ui-lib'
import { ref } from 'vue'

const selected = ref()
const options = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
]
</script>

<template>
  <!-- Simple strings -->
  <Dropdown
    v-model="selected"
    :options="['Option 1', 'Option 2', 'Option 3']"
    label="Select option"
  />

  <!-- Objects -->
  <Dropdown
    v-model="selected"
    :options="options"
    value-key="id"
    label-key="name"
    label="Select option"
  />

  <!-- With error -->
  <Dropdown
    v-model="selected"
    :options="options"
    error
    label="Required field"
  />
</template>
```

**Props:**
- `modelValue`: T
- `options`: T[] (required)
- `label`: string
- `placeholder`: string (default: 'Select an option')
- `disabled`: boolean
- `valueKey`: string (default: 'value')
- `labelKey`: string (default: 'label')
- `size`: 'sm' | 'md' | 'lg'
- `error`: boolean

**Events:**
- `@update:modelValue`: Emitted when selection changes

---

### Tooltip

```vue
<script setup lang="ts">
import { Tooltip, Button } from '@custom/ui-lib'
</script>

<template>
  <!-- Basic -->
  <Tooltip content="Helpful information" position="top">
    <Button>Hover me</Button>
  </Tooltip>

  <!-- Variants -->
  <Tooltip content="Normal tooltip" variant="normal">
    <span>Hover</span>
  </Tooltip>

  <Tooltip content="Danger!" variant="danger">
    <Button variant="danger">Delete</Button>
  </Tooltip>

  <!-- Positions -->
  <Tooltip content="Top tooltip" position="top">
    <Button>Top</Button>
  </Tooltip>
  <Tooltip content="Bottom tooltip" position="bottom">
    <Button>Bottom</Button>
  </Tooltip>
  <Tooltip content="Left tooltip" position="left">
    <Button>Left</Button>
  </Tooltip>
  <Tooltip content="Right tooltip" position="right">
    <Button>Right</Button>
  </Tooltip>

  <!-- Custom content -->
  <Tooltip position="top">
    <Button>Hover</Button>
    <template #content>
      <div>
        <p class="font-bold">Custom</p>
        <p class="text-xs">Any HTML here</p>
      </div>
    </template>
  </Tooltip>
</template>
```

**Props:**
- `content`: string
- `position`: 'top' | 'bottom' | 'left' | 'right' (default: 'top')
- `variant`: 'normal' | 'danger' | 'success' | 'warning' (default: 'normal')
- `delay`: number (default: 0)
- `disabled`: boolean

**Slots:**
- `default` or `trigger`: Element that triggers the tooltip
- `content`: Custom tooltip content

---

## Utilities

### `cn()` - Class Name Utility

Merge and deduplicate Tailwind CSS classes:

```typescript
import { cn } from '@custom/ui-lib'

const buttonClass = cn(
  'px-4 py-2',
  'bg-blue-500',
  condition && 'bg-red-500', // Conditionally apply classes
  className // Merge with external classes
)
```

## SSR Support

This library is fully compatible with SSR frameworks like Nuxt 3:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@custom/ui-lib/style.css'],
  build: {
    transpile: ['@custom/ui-lib']
  }
})
```

## Customization

### Tailwind Configuration

Extend the default theme in your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './node_modules/@custom/ui-lib/**/*.{js,ts,vue}',
    // your content paths
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Your custom primary colors
        }
      }
    }
  }
}
```

### Component Variants

Create custom variants using CVA:

```typescript
import { buttonVariants } from '@custom/ui-lib'

const customButton = buttonVariants({
  variant: 'primary',
  size: 'lg',
  class: 'custom-class'
})
```

## Project Structure

```
ui-lib/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.vue
│   │   │   ├── buttonVariants.ts
│   │   │   ├── Button.stories.ts
│   │   │   └── index.ts
│   │   ├── Modal/
│   │   ├── Tooltip/
│   │   ├── Dropdown/
│   │   └── Input/
│   ├── utils/
│   │   └── cn.ts
│   ├── style.css
│   └── index.ts
├── .storybook/
├── dist/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── tailwind.config.js
```

## Building for Production

```bash
npm run build
```

This creates:
- `dist/ui-lib.es.js` - ES module
- `dist/ui-lib.umd.js` - UMD module
- `dist/style.css` - Compiled styles
- `dist/index.d.ts` - TypeScript declarations

## Publishing

1. Update version in `package.json`
2. Build the library: `npm run build`
3. Publish to npm: `npm publish`

## Best Practices

1. **Always import styles**: `import '@custom/ui-lib/style.css'`
2. **Tree-shake imports**: Import only what you need
3. **Type safety**: Use TypeScript for better DX
4. **SSR compatibility**: Test with your SSR framework
5. **Accessibility**: Components are built with a11y in mind

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run `npm run type-check`
6. Submit a pull request

## License

MIT License - feel free to use this library in your projects!

## Questions?

If you have any questions or need help, please open an issue on GitHub.
