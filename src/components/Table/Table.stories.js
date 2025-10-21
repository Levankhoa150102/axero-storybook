import React from 'react';
import { fn } from '@storybook/test';
import { Table } from './Table.jsx';

export default {
  title: 'UI Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
};

const sampleUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-03-15',
    posts: 42
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'Active',
    lastLogin: '2024-03-14',
    posts: 28
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'Author',
    status: 'Inactive',
    lastLogin: '2024-03-10',
    posts: 15
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'Editor',
    status: 'Active',
    lastLogin: '2024-03-16',
    posts: 33
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'Author',
    status: 'Active',
    lastLogin: '2024-03-13',
    posts: 19
  }
];

const basicColumns = [
  {
    key: 'name',
    title: 'Name',
    align: 'left'
  },
  {
    key: 'email',
    title: 'Email',
    align: 'left'
  },
  {
    key: 'role',
    title: 'Role',
    align: 'center'
  },
  {
    key: 'status',
    title: 'Status',
    align: 'center'
  },
  {
    key: 'posts',
    title: 'Posts',
    align: 'right',
  }
];

export const Default = {
  args: {
    columns: basicColumns,
    data: sampleUsers,
    showHeader: true,
    onRowSelect: fn(),
    onRowAction: fn(),
    onHeaderAction: fn(),
    headerBgColor: 'var(--background-secondary, #f4f4f4)',
  },
  parameters: {
    docs: {
      source: {
        code: `<div class="table-container">
  <div class="table-toolbar">
    <div class="table-info">
      <span class="table-record-count">Total records: 5</span>
    </div>
    <div class="table-actions-header">
      <button class="btn btn--danger">Delete Selected</button>
      <button class="btn btn--secondary">Bulk Edit</button>
    </div>
  </div>
  
  <table class="table">
    <thead class="table-header">
      <tr>
        <th class="table-cell table-cell--header table-cell--left">Name</th>
        <th class="table-cell table-cell--header table-cell--left">Email</th>
        <th class="table-cell table-cell--header table-cell--center">Role</th>
        <th class="table-cell table-cell--header table-cell--center">Status</th>
        <th class="table-cell table-cell--header table-cell--right">Posts</th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr class="table-row">
        <td class="table-cell table-cell--left">John Doe</td>
        <td class="table-cell table-cell--left">john.doe@example.com</td>
        <td class="table-cell table-cell--center">Admin</td>
        <td class="table-cell table-cell--center">
          <span class="status-badge status-badge--active">Active</span>
        </td>
        <td class="table-cell table-cell--right">42</td>
      </tr>
    </tbody>
  </table>
</div>`
      }
    }
  }
};

export const WithSelection = {
  args: {
    ...Default.args,
    selectable: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<div class="table-container">
  <div class="table-toolbar">
    <div class="table-info">
      <span class="table-record-count">Total records: 5</span>
    </div>
    <div class="table-actions-header">
      <button class="btn btn--danger">Delete Selected</button>
      <button class="btn btn--secondary">Bulk Edit</button>
    </div>
  </div>
  
  <table class="table">
    <thead class="table-header">
      <tr>
        <th class="table-cell table-cell--header table-cell--select">
          <input type="checkbox" class="checkbox-input" aria-label="Select all rows">
        </th>
        <th class="table-cell table-cell--header table-cell--left">Name</th>
        <th class="table-cell table-cell--header table-cell--left">Email</th>
        <th class="table-cell table-cell--header table-cell--center">Role</th>
        <th class="table-cell table-cell--header table-cell--center">Status</th>
        <th class="table-cell table-cell--header table-cell--right">Posts</th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr class="table-row">
        <td class="table-cell table-cell--select">
          <input type="checkbox" class="checkbox-input" aria-label="Select row 1">
        </td>
        <td class="table-cell table-cell--left">John Doe</td>
        <td class="table-cell table-cell--left">john.doe@example.com</td>
        <td class="table-cell table-cell--center">Admin</td>
        <td class="table-cell table-cell--center">
          <span class="status-badge status-badge--active">Active</span>
        </td>
        <td class="table-cell table-cell--right">42</td>
      </tr>
    </tbody>
  </table>
</div>`
      }
    }
  }
};

export const WithPagination = {
  args: {
    ...Default.args,
    showPagination: true,
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 25,
    onPageChange: fn(),
    onItemsPerPageChange: fn(),
    pageSizeOptions: [10, 25, 50],
  },
  parameters: {
    docs: {
      source: {
        code: `
<div class="table-container">
  <div class="table-toolbar">
    <div class="table-info">
      <span class="table-record-count">Total records: 25</span>
    </div>
    <div class="table-actions-header">
      <button class="btn btn--danger">Delete Selected</button>
      <button class="btn btn--secondary">Bulk Edit</button>
    </div>
  </div>

  <table class="table">
    <thead class="table-header">
      <tr>
        <th class="table-cell table-cell--header table-cell--left">Name</th>
        <th class="table-cell table-cell--header table-cell--left">Email</th>
        <th class="table-cell table-cell--header table-cell--center">Role</th>
        <th class="table-cell table-cell--header table-cell--center">Status</th>
        <th class="table-cell table-cell--header table-cell--right">Posts</th>
      </tr>
    </thead>
    <tbody class="table-body">
      <tr class="table-row">
        <td class="table-cell table-cell--left">John Doe</td>
        <td class="table-cell table-cell--left">john.doe@example.com</td>
        <td class="table-cell table-cell--center">Admin</td>
        <td class="table-cell table-cell--center">
          <span class="status-badge status-badge--active">Active</span>
        </td>
        <td class="table-cell table-cell--right">42</td>
      </tr>
    </tbody>
  </table>

  <div class="table-pagination">
    <div class="table-pagination-info">
      <span class="table-pagination-summary">Page 1 of 3 (25 items)</span>
    </div>
    <div class="table-pagination-controls">
      <div class="table-pagination-size">
        <label for="items-per-page" class="table-pagination-label">
          per page
        </label>
        <select
          id="items-per-page"
          class="table-pagination-select"
          value="10"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  </div>
</div>
`
      }
    }
  }
};
