import React from 'react';
import { Checkbox } from './Checkbox';

export default {
    title: 'UI Components/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        disabled: {
            control: 'boolean',
            description: 'Whether the checkbox is disabled',
        },
        onChange: {
            action: 'changed',
            description: 'Callback fired when the checkbox state changes',
        },
    },
};

export const Default = {
    args: {
        label: 'Check me',
    },
    parameters: {
        docs: {
            description: {
                story: 'Default checkbox with label text.',
            },
            source: {
                code: `<div class="checkbox-wrapper">
  <label for="checkbox" class="checkbox-label">
    <input id="checkbox" type="checkbox" class="checkbox-input" />
    <span class="checkbox-text">Check me</span>
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
                story: 'Checkbox without a label - useful when the context provides the meaning.',
            },
            source: {
                code: `<div class="checkbox-wrapper">
  <label for="checkbox" class="checkbox-label">
    <input id="checkbox" type="checkbox" class="checkbox-input" />
  </label>
</div>`,
            },
        },
    },
};

export const Disabled = {
    args: {
        label: 'Disabled option',
        disabled: true,
    },
    parameters: {
        docs: {
            description: {
                story: 'Checkbox in disabled state that cannot be interacted with.',
            },
            source: {
                code: `<div class="checkbox-wrapper">
  <label for="checkbox" class="checkbox-label checkbox-label--disabled">
    <input id="checkbox" type="checkbox" class="checkbox-input" disabled />
    <span class="checkbox-text">Disabled option</span>
  </label>
</div>`,
            },
        },
    },
};