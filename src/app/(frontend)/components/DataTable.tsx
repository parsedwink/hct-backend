/**
 * try https://github.com/ninsau/flowers-nextjs-table
 */
// src/app/my-table-page.tsx
'use client'

import { Table } from 'flowers-nextjs-table'
import type { ColumnDef } from 'flowers-nextjs-table'
import 'flowers-nextjs-table/styles' // Optional: includes default styling

// import { getPayload } from 'payload'

// 1. Define your data type
type User = {
  id: number
  name: string
  role: 'Admin' | 'User'
}

// 2. Create your column definitions
const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Full Name',
    enableSorting: true, // This column is now sortable
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
]

const data: User[] = [
  { id: 1, name: 'Alice Johnson', role: 'Admin' },
  { id: 2, name: 'Bob Williams', role: 'User' },
]

// 3. Render the component
export default function MyTablePage() {
  return (
    <div className="p-4">
      <Table
        data={data}
        columns={columns}
        classNames={{
          container: 'p-1',
          table: 'w-full text-sm',
          thead: '',
          th: 'p-3 font-medium text-left',
          tr: 'hover:bg-gray-50',
          td: 'p-3 border-t border-gray-200',
          resizer: 'w-1 bg-gray-300 hover:bg-blue-500 cursor-col-resize',
          pagination: {
            container: 'p-3 border-t',
            button: 'px-3 py-1 border rounded-md hover:bg-gray-100',
            pageInfo: 'text-sm text-gray-600',
          },
        }}
      />
    </div>
  )
}
