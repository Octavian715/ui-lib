# Usage Examples

This document provides practical examples of how to use the UI library in real-world scenarios.

## Complete Form Example

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Input, Dropdown, Button, Modal } from '@custom/ui-lib'
import '@custom/ui-lib/style.css'

const formData = ref({
  name: '',
  email: '',
  role: undefined,
  password: '',
})

const roles = [
  { id: 'admin', name: 'Administrator' },
  { id: 'user', name: 'User' },
  { id: 'guest', name: 'Guest' },
]

const errors = ref({
  name: false,
  email: false,
  role: false,
  password: false,
})

const showSuccess = ref(false)

const validateForm = () => {
  errors.value.name = !formData.value.name
  errors.value.email = !formData.value.email || !formData.value.email.includes('@')
  errors.value.role = !formData.value.role
  errors.value.password = formData.value.password.length < 8

  return !Object.values(errors.value).some(error => error)
}

const handleSubmit = () => {
  if (validateForm()) {
    showSuccess.value = true
    // Handle form submission
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-6 bg-secondary-900">
    <h1 class="text-2xl font-bold mb-6 text-white">User Registration</h1>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <Input
        v-model="formData.name"
        label="Full Name"
        placeholder="John Doe"
        required
        :error="errors.name"
        error-message="Name is required"
      />

      <Input
        v-model="formData.email"
        label="Email"
        type="email"
        placeholder="john@example.com"
        required
        :error="errors.email"
        error-message="Please enter a valid email"
      >
        <template #prefix>
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        </template>
      </Input>

      <Dropdown
        v-model="formData.role"
        :options="roles"
        value-key="id"
        label-key="name"
        label="Role"
        placeholder="Select a role..."
        :error="errors.role"
      />

      <Input
        v-model="formData.password"
        label="Password"
        type="password"
        placeholder="••••••••"
        required
        :error="errors.password"
        error-message="Password must be at least 8 characters"
        hint="Use a strong password with letters and numbers"
      />

      <div class="flex gap-3">
        <Button type="submit" variant="primary" class="flex-1">
          Create Account
        </Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>

    <Modal
      :is-open="showSuccess"
      @close="showSuccess = false"
      title="Success!"
      confirm-variant="success"
      :show-cancel="false"
      confirm-text="Got it"
      @confirm="showSuccess = false"
    >
      <p class="text-gray-300">Your account has been created successfully!</p>
    </Modal>
  </div>
</template>
```

## Data Table with Actions

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Tooltip, Modal, Dropdown } from '@custom/ui-lib'

const users = ref([
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User' },
  { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'User' },
])

const selectedUser = ref(null)
const showDeleteModal = ref(false)
const actionFilter = ref('all')

const handleDelete = () => {
  users.value = users.value.filter(u => u.id !== selectedUser.value.id)
  showDeleteModal.value = false
}

const confirmDelete = (user) => {
  selectedUser.value = user
  showDeleteModal.value = true
}
</script>

<template>
  <div class="p-6 bg-secondary-900">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-2xl font-bold text-white">Users</h2>
      <div class="flex gap-2">
        <Dropdown
          v-model="actionFilter"
          :options="['all', 'admins', 'users']"
          placeholder="Filter..."
          size="sm"
        />
        <Button variant="primary" size="sm">Add User</Button>
      </div>
    </div>

    <table class="w-full border border-secondary-700 rounded-lg overflow-hidden">
      <thead class="bg-secondary-800">
        <tr>
          <th class="px-4 py-3 text-left text-white">Name</th>
          <th class="px-4 py-3 text-left text-white">Email</th>
          <th class="px-4 py-3 text-left text-white">Role</th>
          <th class="px-4 py-3 text-right text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          class="border-t border-secondary-700 hover:bg-secondary-800/50"
        >
          <td class="px-4 py-3 text-white">{{ user.name }}</td>
          <td class="px-4 py-3 text-gray-400">{{ user.email }}</td>
          <td class="px-4 py-3 text-gray-400">{{ user.role }}</td>
          <td class="px-4 py-3 text-right">
            <div class="flex gap-2 justify-end">
              <Tooltip content="Edit user" position="top">
                <Button variant="ghost" size="sm">Edit</Button>
              </Tooltip>
              <Tooltip content="Delete user" position="top" variant="danger">
                <Button
                  variant="danger"
                  size="sm"
                  @click="confirmDelete(user)"
                >
                  Delete
                </Button>
              </Tooltip>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <Modal
      :is-open="showDeleteModal"
      @close="showDeleteModal = false"
      @confirm="handleDelete"
      title="Delete User"
      description="This action cannot be undone."
      confirm-text="Delete"
      confirm-variant="danger"
    >
      <p class="text-gray-300">
        Are you sure you want to delete <strong>{{ selectedUser?.name }}</strong>?
      </p>
    </Modal>
  </div>
</template>
```

## Settings Panel

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Input, Dropdown, Button, Tooltip } from '@custom/ui-lib'

const settings = ref({
  username: 'johndoe',
  email: 'john@example.com',
  theme: 'dark',
  notifications: 'all',
})

const themes = ['light', 'dark', 'auto']
const notificationOptions = [
  { value: 'all', label: 'All Notifications' },
  { value: 'important', label: 'Important Only' },
  { value: 'none', label: 'None' },
]

const saved = ref(false)

const handleSave = () => {
  saved.value = true
  setTimeout(() => {
    saved.value = false
  }, 3000)
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-secondary-900">
    <h1 class="text-3xl font-bold mb-6 text-white">Settings</h1>

    <div class="space-y-6">
      <section class="bg-secondary-800 border border-secondary-700 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 text-white">Profile</h2>
        <div class="space-y-4">
          <Input
            v-model="settings.username"
            label="Username"
            hint="This is your public display name"
          />
          <Input
            v-model="settings.email"
            label="Email"
            type="email"
            hint="We'll send updates to this email"
          />
        </div>
      </section>

      <section class="bg-secondary-800 border border-secondary-700 rounded-lg p-6">
        <h2 class="text-xl font-semibold mb-4 text-white">Preferences</h2>
        <div class="space-y-4">
          <Dropdown
            v-model="settings.theme"
            :options="themes"
            label="Theme"
          />
          <Dropdown
            v-model="settings.notifications"
            :options="notificationOptions"
            label="Notifications"
          />
        </div>
      </section>

      <div class="flex gap-3">
        <Tooltip
          :content="saved ? 'Settings saved!' : 'Save your changes'"
          :variant="saved ? 'success' : 'normal'"
          position="top"
        >
          <Button
            variant="primary"
            @click="handleSave"
            class="flex-1"
          >
            {{ saved ? 'Saved!' : 'Save Changes' }}
          </Button>
        </Tooltip>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  </div>
</template>
```

## Search with Filters

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Input, Dropdown, Button } from '@custom/ui-lib'

const searchQuery = ref('')
const categoryFilter = ref('all')
const sortBy = ref('recent')

const categories = ['all', 'articles', 'videos', 'podcasts']
const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'alphabetical', label: 'A-Z' },
]

const results = computed(() => {
  // Filter logic here
  return []
})

const clearFilters = () => {
  searchQuery.value = ''
  categoryFilter.value = 'all'
  sortBy.value = 'recent'
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-secondary-900">
    <div class="mb-6">
      <Input
        v-model="searchQuery"
        type="search"
        placeholder="Search..."
        size="lg"
        clearable
      >
        <template #prefix>
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
        </template>
      </Input>
    </div>

    <div class="mb-6 flex gap-4 items-end">
      <Dropdown
        v-model="categoryFilter"
        :options="categories"
        label="Category"
        class="flex-1"
      />
      <Dropdown
        v-model="sortBy"
        :options="sortOptions"
        label="Sort By"
        class="flex-1"
      />
      <Button variant="outline" @click="clearFilters">
        Clear Filters
      </Button>
    </div>

    <div class="text-gray-400">
      Found {{ results.length }} results
    </div>
  </div>
</template>
```

## Multi-Step Wizard

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Input, Dropdown, Modal } from '@custom/ui-lib'

const currentStep = ref(1)
const formData = ref({
  name: '',
  email: '',
  company: '',
  plan: undefined,
})

const plans = [
  { id: 'free', name: 'Free Plan' },
  { id: 'pro', name: 'Pro Plan' },
  { id: 'enterprise', name: 'Enterprise Plan' },
]

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const complete = ref(false)

const handleComplete = () => {
  complete.value = true
}
</script>

<template>
  <div class="max-w-2xl mx-auto p-6 bg-secondary-900">
    <div class="mb-8">
      <div class="flex justify-between items-center">
        <div
          v-for="step in 3"
          :key="step"
          class="flex-1"
          :class="{ 'opacity-50': step > currentStep }"
        >
          <div class="flex items-center">
            <div
              class="w-8 h-8 rounded-full flex items-center justify-center"
              :class="step <= currentStep ? 'bg-primary-500 text-white' : 'bg-secondary-700 text-gray-400'"
            >
              {{ step }}
            </div>
            <div v-if="step < 3" class="flex-1 h-0.5 bg-secondary-700 mx-2" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentStep === 1" class="space-y-4">
      <h2 class="text-2xl font-bold text-white mb-4">Personal Information</h2>
      <Input v-model="formData.name" label="Full Name" required />
      <Input v-model="formData.email" label="Email" type="email" required />
    </div>

    <div v-if="currentStep === 2" class="space-y-4">
      <h2 class="text-2xl font-bold text-white mb-4">Company Details</h2>
      <Input v-model="formData.company" label="Company Name" />
      <Dropdown
        v-model="formData.plan"
        :options="plans"
        value-key="id"
        label-key="name"
        label="Select Plan"
      />
    </div>

    <div v-if="currentStep === 3" class="space-y-4">
      <h2 class="text-2xl font-bold text-white mb-4">Review</h2>
      <div class="bg-secondary-800 border border-secondary-700 rounded-lg p-4 space-y-2">
        <p class="text-white"><strong>Name:</strong> {{ formData.name }}</p>
        <p class="text-white"><strong>Email:</strong> {{ formData.email }}</p>
        <p class="text-white"><strong>Company:</strong> {{ formData.company }}</p>
        <p class="text-white"><strong>Plan:</strong> {{ formData.plan?.name }}</p>
      </div>
    </div>

    <div class="flex justify-between mt-8">
      <Button
        variant="outline"
        @click="prevStep"
        :disabled="currentStep === 1"
      >
        Previous
      </Button>
      <Button
        v-if="currentStep < 3"
        variant="primary"
        @click="nextStep"
      >
        Next
      </Button>
      <Button
        v-else
        variant="success"
        @click="handleComplete"
      >
        Complete
      </Button>
    </div>

    <Modal
      :is-open="complete"
      @close="complete = false"
      title="Success!"
      :show-cancel="false"
      confirm-text="Done"
      @confirm="complete = false"
    >
      <p class="text-gray-300">Your registration is complete!</p>
    </Modal>
  </div>
</template>
```

These examples demonstrate real-world usage patterns and can be adapted to your specific needs.
