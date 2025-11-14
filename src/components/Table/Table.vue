<template>
  <div :class="wrapperClass">
    <!-- Search Bar -->
    <div v-if="searchable" class="mb-4">
      <Input
        v-model="searchQuery"
        placeholder="Search..."
        type="search"
        :size="size"
      >
        <template #prefix>
          <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
        </template>
      </Input>
    </div>

    <!-- Table Container -->
    <div :class="containerClass">
      <table :class="tableClass">
        <!-- Header -->
        <thead :class="headerClass">
          <tr>
            <!-- Selection Column -->
            <th v-if="selectable" :class="cellClass" class="w-12">
              <Checkbox
                :model-value="isAllSelected"
                :indeterminate="isSomeSelected && !isAllSelected"
                @update:model-value="toggleSelectAll"
              />
            </th>

            <!-- Data Columns -->
            <th
              v-for="column in columns"
              :key="column.key"
              :class="[cellClass, column.headerClass, column.sortable && 'cursor-pointer select-none']"
              :style="{ width: column.width }"
              @click="column.sortable && handleSort(column.key)"
            >
              <div class="flex items-center gap-2">
                <span>{{ column.label }}</span>
                <span v-if="column.sortable" class="flex flex-col">
                  <svg
                    :class="[
                      'h-3 w-3 transition-colors',
                      sortKey === column.key && sortOrder === 'asc'
                        ? 'text-primary-500'
                        : 'text-neutral-500'
                    ]"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
            </th>

            <!-- Actions Column -->
            <th v-if="$slots.actions" :class="cellClass" class="w-24">
              Actions
            </th>
          </tr>
        </thead>

        <!-- Body -->
        <tbody v-if="!loading && paginatedData.length > 0" :class="bodyClass">
          <tr
            v-for="(row, index) in paginatedData"
            :key="getRowKey(row, index)"
            :class="[
              rowClass,
              isRowSelected(row) && 'bg-primary-500/10',
              clickableRows && 'cursor-pointer',
            ]"
            @click="handleRowClick(row, index)"
          >
            <!-- Selection Cell -->
            <td v-if="selectable" :class="cellClass">
              <Checkbox
                :model-value="isRowSelected(row)"
                @update:model-value="toggleRowSelection(row)"
                @click.stop
              />
            </td>

            <!-- Data Cells -->
            <td
              v-for="column in columns"
              :key="column.key"
              :class="[cellClass, column.cellClass]"
            >
              <slot
                :name="`cell-${column.key}`"
                :row="row"
                :column="column"
                :value="getCellValue(row, column.key)"
              >
                {{ formatCell(row, column) }}
              </slot>
            </td>

            <!-- Actions Cell -->
            <td v-if="$slots.actions" :class="cellClass">
              <slot name="actions" :row="row" :index="index" />
            </td>
          </tr>
        </tbody>

        <!-- Loading State -->
        <tbody v-else-if="loading">
          <tr>
            <td :colspan="totalColumns" class="py-12 text-center">
              <Spinner size="lg" />
              <p class="mt-3 text-sm text-neutral-400">{{ loadingText }}</p>
            </td>
          </tr>
        </tbody>

        <!-- Empty State -->
        <tbody v-else>
          <tr>
            <td :colspan="totalColumns" class="py-12 text-center">
              <slot name="empty">
                <div class="flex flex-col items-center gap-3">
                  <svg class="h-12 w-12 text-neutral-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v11.75A2.75 2.75 0 0016.75 18h-12A2.75 2.75 0 012 15.25V3.5zm3.75 7a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zm0 3a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5zM5 5.75A.75.75 0 015.75 5h4.5a.75.75 0 010 1.5h-4.5A.75.75 0 015 5.75zm.75 2.25a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-4.5z" clip-rule="evenodd" />
                  </svg>
                  <p class="text-neutral-400 font-medium">{{ emptyText }}</p>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footer with Info and Pagination -->
    <div v-if="paginated && paginatedData.length > 0" class="mt-4 flex items-center justify-between">
      <div class="text-sm text-neutral-400">
        Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, filteredData.length) }} of {{ filteredData.length }} results
      </div>
      <Pagination
        v-model:current-page="currentPage"
        :total-pages="totalPages"
        :size="size"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, useSlots } from 'vue'
import { cn } from '@/utils/cn'
import Input from '../Input/Input.vue'
import Checkbox from '../Checkbox/Checkbox.vue'
import Spinner from '../Spinner/Spinner.vue'
import Pagination from '../Pagination/Pagination.vue'

const slots = useSlots()

export interface TableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
  headerClass?: string
  cellClass?: string
  format?: (value: any, row: any) => string
}

interface TableProps {
  data: any[]
  columns: TableColumn[]
  rowKey?: string
  selectable?: boolean
  searchable?: boolean
  paginated?: boolean
  pageSize?: number
  loading?: boolean
  loadingText?: string
  emptyText?: string
  striped?: boolean
  hoverable?: boolean
  bordered?: boolean
  clickableRows?: boolean
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<TableProps>(), {
  rowKey: 'id',
  selectable: false,
  searchable: false,
  paginated: false,
  pageSize: 10,
  loading: false,
  loadingText: 'Loading...',
  emptyText: 'No data available',
  striped: false,
  hoverable: true,
  bordered: false,
  clickableRows: false,
  size: 'md',
})

const emit = defineEmits<{
  'row-click': [row: any, index: number]
  'selection-change': [selectedRows: any[]]
  'sort-change': [key: string, order: 'asc' | 'desc' | null]
}>()

const searchQuery = ref('')
const sortKey = ref<string | null>(null)
const sortOrder = ref<'asc' | 'desc' | null>(null)
const currentPage = ref(1)
const selectedRows = ref<Set<any>>(new Set())

// Computed
const filteredData = computed(() => {
  let result = [...props.data]

  // Search
  if (searchQuery.value && props.searchable) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter((row) => {
      return props.columns.some((column) => {
        const value = getCellValue(row, column.key)
        return String(value).toLowerCase().includes(query)
      })
    })
  }

  // Sort
  if (sortKey.value && sortOrder.value) {
    result.sort((a, b) => {
      const aValue = getCellValue(a, sortKey.value!)
      const bValue = getCellValue(b, sortKey.value!)

      if (aValue === bValue) return 0

      const comparison = aValue > bValue ? 1 : -1
      return sortOrder.value === 'asc' ? comparison : -comparison
    })
  }

  return result
})

const totalPages = computed(() => {
  if (!props.paginated) return 1
  return Math.ceil(filteredData.value.length / props.pageSize)
})

const startIndex = computed(() => {
  if (!props.paginated) return 0
  return (currentPage.value - 1) * props.pageSize
})

const endIndex = computed(() => {
  if (!props.paginated) return filteredData.value.length
  return startIndex.value + props.pageSize
})

const paginatedData = computed(() => {
  if (!props.paginated) return filteredData.value
  return filteredData.value.slice(startIndex.value, endIndex.value)
})

const totalColumns = computed(() => {
  let count = props.columns.length
  if (props.selectable) count++
  if (slots.actions) count++
  return count
})

const isAllSelected = computed(() => {
  return paginatedData.value.length > 0 &&
    paginatedData.value.every(row => selectedRows.value.has(getRowKey(row, 0)))
})

const isSomeSelected = computed(() => {
  return paginatedData.value.some(row => selectedRows.value.has(getRowKey(row, 0)))
})

// Methods
const getCellValue = (row: any, key: string): any => {
  return key.split('.').reduce((obj, k) => obj?.[k], row)
}

const formatCell = (row: any, column: TableColumn): string => {
  const value = getCellValue(row, column.key)
  if (column.format) {
    return column.format(value, row)
  }
  return value ?? ''
}

const getRowKey = (row: any, index: number): string | number => {
  return getCellValue(row, props.rowKey) ?? index
}

const handleSort = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : sortOrder.value === 'desc' ? null : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }

  if (sortOrder.value === null) {
    sortKey.value = null
  }

  emit('sort-change', sortKey.value!, sortOrder.value)
}

const isRowSelected = (row: any): boolean => {
  return selectedRows.value.has(getRowKey(row, 0))
}

const toggleRowSelection = (row: any) => {
  const key = getRowKey(row, 0)
  if (selectedRows.value.has(key)) {
    selectedRows.value.delete(key)
  } else {
    selectedRows.value.add(key)
  }
  emitSelectionChange()
}

const toggleSelectAll = (checked: boolean) => {
  if (checked) {
    paginatedData.value.forEach(row => {
      selectedRows.value.add(getRowKey(row, 0))
    })
  } else {
    paginatedData.value.forEach(row => {
      selectedRows.value.delete(getRowKey(row, 0))
    })
  }
  emitSelectionChange()
}

const emitSelectionChange = () => {
  const selected = props.data.filter(row =>
    selectedRows.value.has(getRowKey(row, 0))
  )
  emit('selection-change', selected)
}

const handleRowClick = (row: any, index: number) => {
  if (props.clickableRows) {
    emit('row-click', row, index)
  }
}

// Watch
watch(() => props.data, () => {
  // Clear selection when data changes
  selectedRows.value.clear()
  currentPage.value = 1
})

// Classes
const wrapperClass = computed(() => cn('w-full', props.class))

const containerClass = computed(() =>
  cn(
    'overflow-x-auto rounded-lg',
    props.bordered && 'border border-white/10'
  )
)

const tableClass = computed(() =>
  cn('w-full border-collapse')
)

const headerClass = computed(() =>
  cn(
    'bg-neutral-900/70 backdrop-blur-sm',
    'border-b border-white/10',
    'sticky top-0 z-10'
  )
)

const bodyClass = computed(() =>
  cn(props.striped && '[&>tr:nth-child(odd)]:bg-neutral-900/30')
)

const rowClass = computed(() =>
  cn(
    'border-b border-white/5 last:border-0',
    'transition-colors duration-150',
    props.hoverable && 'hover:bg-neutral-900/40'
  )
)

const cellClass = computed(() => {
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  }

  return cn(
    'text-left text-neutral-300',
    'whitespace-nowrap',
    sizeClasses[props.size]
  )
})
</script>
