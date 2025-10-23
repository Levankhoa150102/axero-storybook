import React, { useState } from 'react';
import { Select } from './Select.jsx';
import { SelectWithSearch } from './SelectWithSearch/SelectWithSearch.jsx';
import { SelectWithNoSearch } from './SelectWithNoSearch/SelectWithNoSearch.jsx';

export default {
    title: 'UI Components/Select',
    component: Select,
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
    argTypes: {
        value: { control: 'text' },
        disabled: { control: 'boolean' },
        options: { control: 'object' },
    },
};

const defaultOptions = [
    { value: '', label: 'Select' },
    { value: '1', label: 'Top level community' },
    { value: '2', label: 'Axero Solutions' },
    { value: '3', label: 'Axero Space' },
    { value: '4', label: 'Training and Development' },
];

export const Default = {
    args: {
        label: 'Space',
        value: '',
        options: defaultOptions,
        disabled: false,
    },
    render: (args) => {
        const [value, setValue] = useState(args.value);
        return React.createElement(
            Select,
            {
                ...args,
                value: value,
                onChange: e => setValue(e.target.value)
            }
        );
    },
    parameters: {
        docs: {
            source: {
                code: ` 
                <label className='axero-select-container'>
  <span className="input-label">Space</span>
  <select class="axero-select">
    <option value="">Select</option>
    <option value="1">Top level community</option>
    <option value="2">Axero Solutions</option>
    <option value="3">Axero Space</option>
    <option value="4">Training and Development</option>
  </select>
</label>`
            }
        },
        layout: 'centered',
    }
};

const spaceOptions = [
  { value: 'all', label: 'View All' },
  { value: 'top-level', label: 'Top level community' },
  { value: 'anh-space', label: 'Anh Space' },
  { value: 'anhle-test', label: 'anhle-test' },
  { value: 'axero-solutions', label: 'Axero Solutions' },
  { value: 'axero-space', label: 'Axero Space' },
];

export const SelectedOption = {
  component: SelectWithNoSearch,
  render: function(args) {
    return React.createElement(SelectWithNoSearch, {
      ...args,
      onChange: (value) => {
        if (args.onChange) {
          args.onChange(value);
        }
      }
    });
  },
  args: {
    label: 'Select',
    required: false,
    options: spaceOptions,
    value: 'all',
  },
  argTypes: {
    // Disable dropdown-specific controls that don't apply to DropdownWithSearch
    buttonText: { control: false, table: { disable: true } },
    buttonIcon: { control: false, table: { disable: true } },
    iconOnly: { control: false, table: { disable: true } },
    position: { control: false, table: { disable: true } },
    openLeft: { control: false, table: { disable: true } },
    navbar: { control: false, table: { disable: true } },
    onItemClick: { control: false, table: { disable: true } },
    label: { control: false, table: { disable: true } },
    placeholder: { control: false, table: { disable: true } },
    required: { control: false, table: { disable: true } },
    error: { control: false, table: { disable: true } },
    errorMessage: { control: false, table: { disable: true } },
    emptyMessage:  { control: false, table: { disable: true } },
    
    // Enable DropdownWithSearch-specific controls
    options: { control: 'object' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    
    onChange: { action: 'changed' },
  },
  parameters: {
    docs: {
      description: {
        story: 'A searchable dropdown for filtering by space. Features a label, select trigger, and a dropdown with search functionality. When clicked, it opens to reveal a list of options with a search bar at the top for filtering. Perfect for space selection interfaces.',
      },
      layout: 'padded',
      source: {
        code: `
<div class="dropdown-with-search">
  <label className="dropdown-with-search__label">
        Select
  </label>
  <div class="dropdown-with-search__container">
    <button type="button" class="dropdown-with-search__trigger" aria-haspopup="listbox" aria-expanded="false">
      <span class="dropdown-with-search__value">View All</span>
      <b class="dropdown-with-search__icon"></b>
    </button>

    <div class="dropdown-with-search__menu">
      <div class="dropdown-with-search__options">
        <button type="button" class="dropdown-with-search__option dropdown-with-search__option--selected">View All</button>
        <button type="button" class="dropdown-with-search__option">Top level community</button>
        <button type="button" class="dropdown-with-search__option">Anh Space</button>
        <button type="button" class="dropdown-with-search__option">anhle-test</button>
        <button type="button" class="dropdown-with-search__option">Axero Solutions</button>
        <button type="button" class="dropdown-with-search__option">Axero Space</button>
      </div>
    </div>
  </div>
</div>`
      }
    },
  },
};

// Sample space options matching the image


export const WithSearch = {
  component: SelectWithSearch,
  render: function(args) {
    return React.createElement(SelectWithSearch, {
      ...args,
      onChange: (value) => {
        if (args.onChange) {
          args.onChange(value);
        }
      }
    });
  },
  args: {
    label: 'Filter by space',
    options: spaceOptions,
    value: 'all',
    required: true,
  },
  argTypes: {
    // Disable dropdown-specific controls that don't apply to DropdownWithSearch
    buttonText: { control: false, table: { disable: true } },
    buttonIcon: { control: false, table: { disable: true } },
    iconOnly: { control: false, table: { disable: true } },
    position: { control: false, table: { disable: true } },
    openLeft: { control: false, table: { disable: true } },
    navbar: { control: false, table: { disable: true } },
    onItemClick: { control: false, table: { disable: true } },
      label: { control: false, table: { disable: true } },
    placeholder: { control: false, table: { disable: true } },
    required: { control: false, table: { disable: true } },
    error: { control: false, table: { disable: true } },
    errorMessage: { control: false, table: { disable: true } },
    
    // Enable DropdownWithSearch-specific controls
    options: { control: 'object' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
    emptyMessage: { control: 'text' },
    onChange: { action: 'changed' },
  },
  parameters: {
    docs: {
      description: {
        story: 'A searchable dropdown for filtering by space. Features a label, select trigger, and a dropdown with search functionality. When clicked, it opens to reveal a list of options with a search bar at the top for filtering. Perfect for space selection interfaces.',
      },
      layout: 'padded',
      source: {
        code: `
<div class="dropdown-with-search">
  <label className="dropdown-with-search__label">
        Filter by space
        <span className="input-required"> *</span>
  </label>
  <div class="dropdown-with-search__container">
    <button type="button" class="dropdown-with-search__trigger" aria-haspopup="listbox" aria-expanded="false">
      <span class="dropdown-with-search__value">View All</span>
      <b class="dropdown-with-search__icon"></b>
    </button>

    <div class="dropdown-with-search__menu">
      <div class="dropdown-with-search__search-container">
        <div class="dropdown-with-search__search-input-wrapper">
          <input type="text" class="dropdown-with-search__search-input"/>
        </div>
      </div>

      <div class="dropdown-with-search__options">
        <button type="button" class="dropdown-with-search__option dropdown-with-search__option--selected">View All</button>
        <button type="button" class="dropdown-with-search__option">Top level community</button>
        <button type="button" class="dropdown-with-search__option">Anh Space</button>
        <button type="button" class="dropdown-with-search__option">anhle-test</button>
        <button type="button" class="dropdown-with-search__option">Axero Solutions</button>
        <button type="button" class="dropdown-with-search__option">Axero Space</button>
      </div>
    </div>
  </div>
</div>`
      }
    },
  },
};

