import React from 'react';
import { MultiSelect } from './MultiSelect.jsx';

const sampleOptions = [
  { value: 'abhishek', label: 'Abhishek Singh', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', role: 'Member' },
  { value: 'john', label: 'John Doe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', role: 'Admin' },
  { value: 'jane', label: 'Jane Smith', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', role: 'Member' },
  { value: 'alex', label: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', role: 'Member' },
  { value: 'emma', label: 'Emma Brown', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', role: 'Member' },
];

export default {
  title: 'UI Components/MultiSelect',
  component: MultiSelect,
  parameters: {
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
};

export const Default = {
  args: {
    options: sampleOptions,
    placeholder: 'Invite people...',
  },
  parameters: {
    docs: {
      description: {
        story: 'The default MultiSelect component allowing multiple selections with avatars and roles.'
      },
      source: {
        code: `<div class="multi-select-root">
  <div class="multi-select-input-box">
    <span class="multi-select-tag">Abhishek Singh <button class="multi-select-tag-remove" aria-label="Remove Abhishek Singh">×</button></span>
    <input class="multi-select-input" placeholder="Invite people..." />
  </div>
  <div class="multi-select-dropdown">
    <div class="multi-select-option">
      <span class="multi-select-avatar">
        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Abhishek Singh" />
      </span>
      Abhishek Singh
    </div>
    <div class="multi-select-option">
      <span class="multi-select-avatar">
        <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Jane Smith" />
      </span>
      Jane Smith
    </div>
  </div>
</div>`
      }
    }
  },
};
