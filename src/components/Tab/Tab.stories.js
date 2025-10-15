import React from 'react';
import { fn } from '@storybook/test';
import { Tab } from './Tab.jsx';

export default {
  title: 'UI Components/Tab',
  component: Tab,
  parameters: {
    layout: 'padded',
  },
};

const sampleTabs = [
  {
    label: 'Profile',
    content: '<h3>User Profile</h3><p>Manage your personal information and account settings.</p>'
  },
  {
    label: 'Messages',
    badge: 5,
    content: '<h3>Messages</h3><p>View and manage your messages and conversations.</p>'
  },
  {
    label: 'Settings',
    content: '<h3>Account Settings</h3><p>Configure your account preferences and settings.</p>'
  }
];

export const Default = {
  args: {
    tabs: sampleTabs,
    defaultActiveTab: 0,
    onTabChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'The default Tab component with text labels and optional badges.'
      },
      source: {
        code: `<div class="tab-container">
  <div class="tab-nav" role="tablist">
    <button type="button" class="tab-nav__item tab-nav__item--active" role="tab" aria-selected="true" aria-controls="tabpanel-0" id="tab-0">
      <span class="tab-nav__label">Profile</span>
    </button>
    <button type="button" class="tab-nav__item" role="tab" aria-selected="false" aria-controls="tabpanel-1" id="tab-1">
      <span class="tab-nav__label">Messages</span>
      <span class="tab-nav__badge">5</span>
    </button>
    <button type="button" class="tab-nav__item" role="tab" aria-selected="false" aria-controls="tabpanel-2" id="tab-2">
      <span class="tab-nav__label">Settings</span>
    </button>
  </div>

  <div class="tab-content">
    <div class="tab-panel tab-panel--active" role="tabpanel" aria-labelledby="tab-0" id="tabpanel-0">
      <h3>User Profile</h3>
      <p>Manage your personal information and account settings.</p>
    </div>
    <div class="tab-panel" role="tabpanel" aria-labelledby="tab-1" id="tabpanel-1" hidden>
      <h3>Messages</h3>
      <p>View and manage your messages and conversations.</p>
    </div>
    <div class="tab-panel" role="tabpanel" aria-labelledby="tab-2" id="tabpanel-2" hidden>
      <h3>Account Settings</h3>
      <p>Configure your account preferences and settings.</p>
    </div>
  </div>
</div>`
      }
    }
  }
};
