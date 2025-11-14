import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Table from './Table.vue'
import type { TableColumn } from './Table.vue'
import Badge from '../Badge/Badge.vue'
import Button from '../Button/Button.vue'

const meta = {
  title: 'Components/Table',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    selectable: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
    paginated: {
      control: 'boolean',
    },
    striped: {
      control: 'boolean',
    },
    hoverable: {
      control: 'boolean',
    },
    bordered: {
      control: 'boolean',
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta

export default meta
type Story = StoryObj

// Sample Data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2023-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', joinDate: '2023-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', joinDate: '2023-03-10' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', role: 'Editor', status: 'active', joinDate: '2023-04-05' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'active', joinDate: '2023-05-12' },
  { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Admin', status: 'active', joinDate: '2023-06-18' },
  { id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'Editor', status: 'inactive', joinDate: '2023-07-22' },
  { id: 8, name: 'Fiona Apple', email: 'fiona@example.com', role: 'User', status: 'active', joinDate: '2023-08-30' },
  { id: 9, name: 'George Michael', email: 'george@example.com', role: 'User', status: 'active', joinDate: '2023-09-14' },
  { id: 10, name: 'Helen Hunt', email: 'helen@example.com', role: 'Editor', status: 'inactive', joinDate: '2023-10-25' },
]

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'joinDate', label: 'Join Date', sortable: true },
]

export const Default: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return { users, columns }
    },
    template: `
      <div class="w-full">
        <Table :data="users" :columns="columns" />
      </div>
    `,
  }),
  args: {},
}

export const WithSearch: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return { users, columns }
    },
    template: `
      <div class="w-full">
        <Table :data="users" :columns="columns" searchable />
      </div>
    `,
  }),
  args: {},
}

export const WithPagination: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return { users, columns }
    },
    template: `
      <div class="w-full">
        <Table :data="users" :columns="columns" paginated :page-size="5" />
      </div>
    `,
  }),
  args: {},
}

export const WithSelection: Story = {
  render: () => ({
    components: { Table },
    setup() {
      const selectedRows = ref<any[]>([])
      const handleSelectionChange = (rows: any[]) => {
        selectedRows.value = rows
      }
      return { users, columns, selectedRows, handleSelectionChange }
    },
    template: `
      <div class="w-full">
        <Table
          :data="users"
          :columns="columns"
          selectable
          @selection-change="handleSelectionChange"
        />
        <div v-if="selectedRows.length > 0" class="mt-4 p-3 bg-primary-500/10 rounded-lg border border-primary-500/30">
          <p class="text-sm text-neutral-300">
            Selected {{ selectedRows.length }} row(s):
            <span class="font-semibold text-primary-400">
              {{ selectedRows.map(r => r.name).join(', ') }}
            </span>
          </p>
        </div>
      </div>
    `,
  }),
  args: {},
}

export const WithCustomCells: Story = {
  render: () => ({
    components: { Table, Badge },
    setup() {
      return { users, columns }
    },
    template: `
      <div class="w-full">
        <Table :data="users" :columns="columns">
          <template #cell-status="{ value }">
            <Badge :variant="value === 'active' ? 'success' : 'default'">
              {{ value }}
            </Badge>
          </template>
          <template #cell-role="{ value }">
            <Badge
              :variant="
                value === 'Admin' ? 'danger' :
                value === 'Editor' ? 'warning' :
                'info'
              "
            >
              {{ value }}
            </Badge>
          </template>
        </Table>
      </div>
    `,
  }),
  args: {},
}

export const WithActions: Story = {
  render: () => ({
    components: { Table, Button },
    setup() {
      const handleEdit = (row: any) => {
        alert(`Editing ${row.name}`)
      }
      const handleDelete = (row: any) => {
        alert(`Deleting ${row.name}`)
      }
      return { users, columns, handleEdit, handleDelete }
    },
    template: `
      <div class="w-full">
        <Table :data="users" :columns="columns">
          <template #actions="{ row }">
            <div class="flex gap-2">
              <Button size="sm" variant="secondary" @click="handleEdit(row)">
                Edit
              </Button>
              <Button size="sm" variant="danger" @click="handleDelete(row)">
                Delete
              </Button>
            </div>
          </template>
        </Table>
      </div>
    `,
  }),
  args: {},
}

export const FullFeatured: Story = {
  render: () => ({
    components: { Table, Badge, Button },
    setup() {
      const selectedRows = ref<any[]>([])
      const handleSelectionChange = (rows: any[]) => {
        selectedRows.value = rows
      }
      const handleRowClick = (row: any) => {
        console.log('Row clicked:', row)
      }
      const handleEdit = (row: any) => {
        alert(`Editing ${row.name}`)
      }
      return {
        users,
        columns,
        selectedRows,
        handleSelectionChange,
        handleRowClick,
        handleEdit,
      }
    },
    template: `
      <div class="w-full">
        <h2 class="text-2xl font-bold text-white mb-6">User Management</h2>
        <Table
          :data="users"
          :columns="columns"
          searchable
          selectable
          paginated
          :page-size="5"
          striped
          hoverable
          bordered
          clickable-rows
          @selection-change="handleSelectionChange"
          @row-click="handleRowClick"
        >
          <template #cell-status="{ value }">
            <Badge :variant="value === 'active' ? 'success' : 'default'">
              {{ value }}
            </Badge>
          </template>
          <template #cell-role="{ value }">
            <Badge
              :variant="
                value === 'Admin' ? 'danger' :
                value === 'Editor' ? 'warning' :
                'info'
              "
            >
              {{ value }}
            </Badge>
          </template>
          <template #actions="{ row }">
            <Button size="sm" variant="secondary" @click.stop="handleEdit(row)">
              Edit
            </Button>
          </template>
        </Table>

        <div v-if="selectedRows.length > 0" class="mt-6 p-4 bg-primary-500/10 rounded-lg border border-primary-500/30">
          <p class="text-sm text-neutral-300">
            <span class="font-semibold text-white">{{ selectedRows.length }}</span> user(s) selected
          </p>
        </div>
      </div>
    `,
  }),
  args: {},
}

export const LoadingState: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return { users: [], columns }
    },
    template: `
      <div class="w-full">
        <Table :data="users" :columns="columns" loading loading-text="Loading users..." />
      </div>
    `,
  }),
  args: {},
}

export const EmptyState: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return { users: [], columns }
    },
    template: `
      <div class="w-full">
        <Table :data="users" :columns="columns" empty-text="No users found" />
      </div>
    `,
  }),
  args: {},
}

export const CustomEmptyState: Story = {
  render: () => ({
    components: { Table, Button },
    setup() {
      return { users: [], columns }
    },
    template: `
      <div class="w-full">
        <Table :data="users" :columns="columns">
          <template #empty>
            <div class="flex flex-col items-center gap-4 py-8">
              <svg class="h-16 w-16 text-neutral-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
              <div class="text-center">
                <h3 class="text-lg font-semibold text-white mb-1">No users yet</h3>
                <p class="text-neutral-400 mb-4">Get started by adding your first user.</p>
                <Button variant="primary">Add User</Button>
              </div>
            </div>
          </template>
        </Table>
      </div>
    `,
  }),
  args: {},
}

export const Sizes: Story = {
  render: () => ({
    components: { Table },
    setup() {
      const smallData = users.slice(0, 3)
      return { data: smallData, columns }
    },
    template: `
      <div class="w-full space-y-8">
        <div>
          <h3 class="text-lg font-semibold text-white mb-3">Small</h3>
          <Table :data="data" :columns="columns" size="sm" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white mb-3">Medium (default)</h3>
          <Table :data="data" :columns="columns" size="md" />
        </div>
        <div>
          <h3 class="text-lg font-semibold text-white mb-3">Large</h3>
          <Table :data="data" :columns="columns" size="lg" />
        </div>
      </div>
    `,
  }),
  args: {},
}

export const Striped: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return { users, columns }
    },
    template: `
      <div class="w-full">
        <Table :data="users" :columns="columns" striped />
      </div>
    `,
  }),
  args: {},
}

export const Bordered: Story = {
  render: () => ({
    components: { Table },
    setup() {
      return { users, columns }
    },
    template: `
      <div class="w-full">
        <Table :data="users" :columns="columns" bordered />
      </div>
    `,
  }),
  args: {},
}
