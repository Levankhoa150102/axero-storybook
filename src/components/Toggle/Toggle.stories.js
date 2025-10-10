import React from 'react';
import { Toggle } from './Toggle';

export default {
    title: 'UI Components/Toggle',
    component: Toggle,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        checked: {
            control: 'boolean',
            description: 'Whether the toggle is checked (controlled component)',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the toggle is disabled',
        },
        onChange: {
            action: 'changed',
            description: 'Callback fired when the toggle state changes',
        },
    },
};

export const Default = {
    args: {
        label: 'Toggle me',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default toggle with label text.',
            },
            source: {
                code: `<div class="toggle-wrapper">
  <label for="toggle" class="toggle-label">
    <input id="toggle" type="checkbox" class="toggle-input" />
    <span class="toggle-switch">
      <span class="toggle-slider"></span>
    </span>
    <span class="toggle-text">Toggle me</span>
  </label>
</div>`,
            },
        },
    },
};

export const WithoutLabel = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: 'Toggle without a label - useful when the context provides the meaning.',
            },
            source: {
                code: `<div class="toggle-wrapper">
  <label for="toggle" class="toggle-label">
    <input id="toggle" type="checkbox" class="toggle-input" />
    <span class="toggle-switch">
      <span class="toggle-slider"></span>
    </span>
  </label>
</div>`,
            },
        },
    },
};


export const Disabled = {
    args: {
        label: 'Disabled toggle',
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Disabled toggle that cannot be interacted with.',
            },
            source: {
                code: `<div class="toggle-wrapper">
  <label for="toggle" class="toggle-label toggle-label--disabled">
    <input id="toggle" type="checkbox" class="toggle-input" disabled />
    <span class="toggle-switch toggle-switch--disabled">
      <span class="toggle-slider"></span>
    </span>
    <span class="toggle-text">Disabled toggle</span>
  </label>
</div>`,
            },
        },
    },
};