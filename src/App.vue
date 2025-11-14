<template>
  <div class="min-h-screen bg-secondary-900 text-white p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-2">Vue 3 UI Library</h1>
      <p class="text-gray-400 mb-8">A custom UI library with SSR support, built with Vue 3, Tailwind CSS, and TypeScript</p>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold mb-4">Development Mode</h2>
          <p class="text-gray-400 mb-4">
            This is the development preview. To view components, run:
          </p>
          <pre class="bg-secondary-800 border border-secondary-700 rounded-lg p-4 text-sm">npm run storybook</pre>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4">Quick Start</h2>
          <div class="bg-secondary-800 border border-secondary-700 rounded-lg p-6">
            <h3 class="text-lg font-medium mb-3">Install Dependencies</h3>
            <pre class="bg-secondary-900 rounded p-3 text-sm mb-4">npm install</pre>

            <h3 class="text-lg font-medium mb-3">Start Storybook</h3>
            <pre class="bg-secondary-900 rounded p-3 text-sm mb-4">npm run storybook</pre>

            <h3 class="text-lg font-medium mb-3">Build Library</h3>
            <pre class="bg-secondary-900 rounded p-3 text-sm">npm run build</pre>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold mb-4">Components</h2>
          <ul class="grid grid-cols-2 gap-4">
            <li class="bg-secondary-800 border border-secondary-700 rounded-lg p-4">
              <div class="font-medium">Button</div>
              <div class="text-sm text-gray-400">Multiple variants and sizes</div>
            </li>
            <li class="bg-secondary-800 border border-secondary-700 rounded-lg p-4">
              <div class="font-medium">Modal</div>
              <div class="text-sm text-gray-400">Accessible dialog component</div>
            </li>
            <li class="bg-secondary-800 border border-secondary-700 rounded-lg p-4">
              <div class="font-medium">Tooltip</div>
              <div class="text-sm text-gray-400">Contextual information overlay</div>
            </li>
            <li class="bg-secondary-800 border border-secondary-700 rounded-lg p-4">
              <div class="font-medium">Dropdown</div>
              <div class="text-sm text-gray-400">Select component with search</div>
            </li>
            <li class="bg-secondary-800 border border-secondary-700 rounded-lg p-4">
              <div class="font-medium">Input</div>
              <div class="text-sm text-gray-400">Form input with validation</div>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// This is a placeholder app for development
</script>
