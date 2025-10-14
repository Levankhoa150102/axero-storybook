import React from 'react';
import { Dropdown, DropdownSelect } from './Dropdown';
import { SpaceNavbarWithSearch } from './SpaceNavbarWithSearch';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI Components/Dropdown',
  component: Dropdown,
  parameters: {
    // Use padded layout to give more space for the dropdown menu
    layout: 'padded',
  },
  decorators: [
    (Story) => React.createElement(
      'div',
      { 
        style: { 
          minHeight: '200px',
          paddingTop: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }
      },
      React.createElement(Story)
    ),
  ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    buttonText: {
      control: 'text',
      description: 'Text to display on the dropdown button',
    },
    buttonIcon: {
      control: 'text',
      description: 'FontAwesome icon class for the button',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Show only icon without text or caret',
    },
    position: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the dropdown menu',
    },
    onItemClick: { action: 'item clicked' },
    openLeft: {
      control: 'boolean',
      description: 'Open the dropdown menu to the left',
    },
  },
};

// Sample menu items based on the provided HTML
const sampleMenuItems = [
  {
    id: 'articles',
    text: 'Articles',
    href: '',
    icon: 'fas fa-file',
  },
  {
    id: 'blogs',
    text: 'Blogs',
    href: '',
    icon: 'fas fa-copy',
  },
  {
    id: 'calendar',
    text: 'Calendar',
    href: '',
    icon: 'fas fa-calendar',
  },
  {
    id: 'discussions',
    text: 'Discussions',
    href: '',
    icon: 'fas fa-comments',
  },
];

// Menu items for IconOnly dropdown (based on entity detail options)
const iconOnlyMenuItems = [
  {
    id: 'edit',
    text: 'Edit',
    href: '',
    icon: 'fas fa-edit',
    title: 'Edit',
  },
  {
    id: 'print',
    text: 'Print',
    href: '',
    icon: 'fas fa-print',
    title: 'Print',
  },
  {
    id: 'share',
    text: 'Share',
    href: '',
    icon: 'fas fa-share-alt',
    title: 'Share',
  },
  {
    id: 'notify',
    text: 'Notify People',
    href: '',
    icon: 'fas fa-bullhorn',
    title: 'Notify People',
  },
  {
    id: 'bookmark',
    text: 'Bookmark',
    href: '',
    icon: 'fas fa-bookmark',
    title: 'Bookmark',
  },
  {
    id: 'report',
    text: 'Report abuse',
    href: '',
    icon: 'fas fa-flag',
    title: 'Report abuse',
  },
  {
    id: 'export',
    text: 'Export to PDF',
    href: '',
    icon: 'fas fa-download',
    title: 'Export to PDF',
  },
  {
    id: 'history',
    text: 'Version History',
    href: '',
    icon: 'fas fa-clock',
    title: 'Version History',
  },
  {
    id: 'report-view',
    text: 'View Report',
    href: '',
    icon: 'fas fa-file-alt',
    title: 'View Report',
  },
  {
    id: 'delete',
    text: 'Delete',
    href: '',
    icon: 'fas fa-trash',
    title: 'Delete',
  },
  {
    id: 'copy',
    text: 'Copy',
    href: '',
    icon: 'fas fa-copy',
    title: 'Copy',
  },
  {
    id: 'move',
    text: 'Move',
    href: '',
    icon: 'fas fa-arrows-alt',
    title: 'Move',
  },
  {
    id: 'promote',
    text: 'Promote in Search',
    href: '',
    icon: 'fas fa-search',
    title: 'Promote in Search',
  },
];

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args

// Case 1: Text + Caret only (no icon)
export const NavbarDropdown = {
  args: {
    buttonText: 'Browse',
    items: sampleMenuItems,
    position: 'left',
    className: "dropdown",
    openLeft: true,
    navbar: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Navbar dropdown with text and caret. Designed for navigation bars with left-aligned menu and pointer indicator.',
      },
      source: {
        code: `<div class="navbar">
  <div class="dropdown open open-left">
    <a class="btn dropdown-toggle" href="#" aria-expanded="true">
      Browse <span class="caret"></span>
    </a>
    <ul class="dropdown-menu pull-right">
      <li>
        <a href="" title="Articles">
          <i class="fas fa-file"></i>
          Articles
        </a>
      </li>
      <li>
        <a href="" title="Blogs">
          <i class="fas fa-copy"></i>
          Blogs
        </a>
      </li>
      <li>
        <a href="" title="Calendar">
          <i class="fas fa-calendar"></i>
          Calendar
        </a>
      </li>
      <li>
        <a href="" title="Discussions">
          <i class="fas fa-comments"></i>
          Discussions
        </a>
      </li>
    </ul>
  </div>
</div>`
      }
    },
  },
};

// Case 2: Icon + Text + Caret (default with icon)
export const WithIcon = {
  args: {
    buttonIcon: 'fas fa-cog',
    items: iconOnlyMenuItems,
    position: 'left',
    className: "btn-group",
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown button with icon and caret. Perfect for action menus and settings with visual icon indicators.',
      },
      source: {
        code: `<div class="btn-group open">
  <a class="btn dropdown-toggle" href="#" aria-expanded="true">
    <i class="fas fa-cog"></i> <span class="caret"></span>
  </a>
  <ul class="dropdown-menu">
    <li>
      <a href="" title="Edit">
        <i class="fas fa-edit"></i>
        Edit
      </a>
    </li>
    <li>
      <a href="" title="Print">
        <i class="fas fa-print"></i>
        Print
      </a>
    </li>
    <li>
      <a href="" title="Share">
        <i class="fas fa-share-alt"></i>
        Share
      </a>
    </li>
    <li>
      <a href="" title="Delete">
        <i class="fas fa-trash"></i>
        Delete
      </a>
    </li>
  </ul>
</div>`
      }
    },
  },
};

// Case 3: Icon only (no text, no caret)
export const IconOnly = {
  args: {
    buttonText: 'Options', // Used for aria-label
    buttonIcon: 'fas fa-ellipsis-v',
    iconOnly: true,
    items: iconOnlyMenuItems,
    position: 'left',
    className: "btn-group",
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact dropdown displaying only an icon without text or caret. Ideal for space-constrained layouts like toolbars and action bars.',
      },
      source: {
        code: `<div class="btn-group open">
  <a class="btn dropdown-toggle" href="#" aria-expanded="true" aria-label="Options">
    <i class="fas fa-ellipsis-v"></i>
  </a>
  <ul class="dropdown-menu">
    <li>
      <a href="" title="Edit">
        <i class="fas fa-edit"></i>
        Edit
      </a>
    </li>
    <li>
      <a href="" title="Print">
        <i class="fas fa-print"></i>
        Print
      </a>
    </li>
    <li>
      <a href="" title="Share">
        <i class="fas fa-share-alt"></i>
        Share
      </a>
    </li>
    <li>
      <a href="" title="Notify People">
        <i class="fas fa-bullhorn"></i>
        Notify People
      </a>
    </li>
    <li>
      <a href="" title="Bookmark">
        <i class="fas fa-bookmark"></i>
        Bookmark
      </a>
    </li>
    <li>
      <a href="" title="Report abuse">
        <i class="fas fa-flag"></i>
        Report abuse
      </a>
    </li>
    <li>
      <a href="" title="Delete">
        <i class="fas fa-trash"></i>
        Delete
      </a>
    </li>
  </ul>
</div>`
      }
    },
  },
};

// Selection menu items for category dropdown
const selectionMenuItems = [
  {
    id: 'placeholder',
    text: 'Select category',
    href: '#',
  },
  {
    id: 'news',
    text: 'News',
    href: '#',
  },
  {
    id: 'press-release',
    text: 'Press Release',
    href: '#',
  },
  {
    id: 'blog',
    text: 'Blog',
    href: '#',
  },
  {
    id: 'announcement',
    text: 'Announcement',
    href: '#',
  },
];

export const WithSelection = {
  component: DropdownSelect,
  render: function(args) {
    return React.createElement(DropdownSelect, {
      ...args,
      onSelectionChange: (selectedItem) => {
        console.log('Selected:', selectedItem);
        if (args.onSelectionChange) {
          args.onSelectionChange(selectedItem);
        }
      }
    });
  },
  args: {
    label: 'Parent category',
    placeholder: 'Select category...',
    items: selectionMenuItems,
    required: false,
  },
  argTypes: {
    // Disable dropdown-specific controls that don't apply to DropdownSelect
    buttonText: { control: false, table: { disable: true } },
    buttonIcon: { control: false, table: { disable: true } },
    iconOnly: { control: false, table: { disable: true } },
    position: { control: false, table: { disable: true } },
    openLeft: { control: false, table: { disable: true } },
    navbar: { control: false, table: { disable: true } },
    onItemClick: { control: false, table: { disable: true } },
    
    // Enable DropdownSelect-specific controls
    label: { control: 'text' },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    onSelectionChange: { action: 'selection changed' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Dropdown with Input-style appearance. Looks like a regular input field with a dropdown arrow. Click the input or arrow to show selection options. Perfect for form fields like category selection.',
      },
      source: {
        code: `<div class="input-wrapper">
  <label class="input-label" for="dropdown-select-abc123">
    Parent category
    <span class="input-required"> *</span>
  </label>
  
  <div class="dropdown-select-container">
    <select 
      id="dropdown-select-abc123"
      name="dropdown-select-parent-category"
      class="input dropdown-select-input"
      required
    >
      <option value="" disabled>Select category...</option>
      <option value="news">News</option>
      <option value="press-release" selected>Press Release</option>
      <option value="blog">Blog</option>
      <option value="announcement">Announcement</option>
    </select>
    
    <div class="input-error" role="alert">
      Please select a category
    </div>
  </div>
</div>`
      }
    },
  },
};