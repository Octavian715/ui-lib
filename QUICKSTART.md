# Quick Start Guide

Get your Vue 3 UI Library up and running in minutes!

## 🚀 Installation

```bash
# Install dependencies
npm install
```

## 🎨 View Components in Storybook

The fastest way to see all components in action:

```bash
# Start Storybook
npm run storybook
```

This will open Storybook in your browser at `http://localhost:6006` where you can:
- View all components interactively
- Test different variants and props
- Copy code examples
- See documentation

## 🏗️ Build the Library

Build the library for production:

```bash
npm run build
```

This creates:
- `dist/ui-lib.es.js` - ES module for modern bundlers
- `dist/ui-lib.umd.js` - UMD module for browsers
- `dist/style.css` - Compiled Tailwind styles
- `dist/index.d.ts` - TypeScript definitions

## 📦 Using in Another Project

### Option 1: Link Locally (Development)

In this library directory:
```bash
npm link
```

In your project:
```bash
npm link @custom/ui-lib
```

### Option 2: Publish to NPM

```bash
# Update version in package.json first
npm run build
npm publish
```

Then in your project:
```bash
npm install @custom/ui-lib
```

## 💡 Basic Usage

```vue
<script setup lang="ts">
import { Button, Modal, Input } from '@custom/ui-lib'
import '@custom/ui-lib/style.css'
import { ref } from 'vue'

const name = ref('')
</script>

<template>
  <div>
    <Input v-model="name" label="Name" placeholder="Enter your name" />
    <Button variant="primary" @click="console.log(name)">
      Submit
    </Button>
  </div>
</template>
```

## 🎯 What's Included?

### Components
- ✅ **Button** - 6 variants, 3 sizes, loading & disabled states
- ✅ **Modal** - Fully accessible dialog with customizable sizes
- ✅ **Tooltip** - 4 positions, 4 variants, custom content support
- ✅ **Dropdown** - Object/string support, searchable, validation
- ✅ **Input** - All input types, prefix/suffix slots, validation

### Features
- 🎨 Dark theme design with Tailwind CSS
- 📘 TypeScript support with full type definitions
- ♿ Accessibility with HeadlessUI
- 🚀 SSR ready (Nuxt 3 compatible)
- 📚 Storybook documentation
- 🌲 Tree-shakeable exports
- ⚡ Vite powered build

## 🔧 Development

```bash
# Start dev server
npm run dev

# Type check
npm run type-check

# Build Storybook
npm run build-storybook
```

## 📖 Next Steps

1. Check out [README.md](./README.md) for complete documentation
2. See [USAGE_EXAMPLE.md](./USAGE_EXAMPLE.md) for real-world examples
3. Browse components in Storybook
4. Customize Tailwind theme in `tailwind.config.js`

## ❓ Common Issues

**Styles not loading?**
```typescript
// Make sure to import the CSS
import '@custom/ui-lib/style.css'
```

**TypeScript errors?**
```bash
# Run type check
npm run type-check
```

**Build failing?**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 🎉 You're Ready!

Start exploring the components in Storybook or jump straight into using them in your project!
