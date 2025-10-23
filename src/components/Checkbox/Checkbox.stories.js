import React from 'react';
import { Checkbox } from './Checkbox';
import CheckboxList from './CheckboxList/CheckboxList.jsx';
import { action } from '@storybook/addon-actions';

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

export const WithList = {
    render: () => {
        const items = [1, 2, 3, 4, 5];
        const [checkedState, setCheckedState] = React.useState({});

        const handleChange = (id, val) => {
            setCheckedState(prev => ({ ...prev, [id]: val }));
            action('checkbox-list-change')({ id, checked: val });
        };

        return React.createElement(
            'div',
            { style: { width: 260 } },
            React.createElement(CheckboxList, {
            items: items,
            checked: checkedState,
            onChange: handleChange
            })
        );
    },
    argTypes: {
        label: { control: false, table: { disable: true } },
        disabled: { control: false, table: { disable: true } },
    },
    parameters: {
        docs: {
            description: {
                story: 'A list of checkboxes allowing multiple selections.',
            },
            source: {
                code: `<div class="checkbox-list-root" role="list"></div>
  <label class="checkbox-list-row" role="listitem">
    <input type="checkbox" class="checkbox-input checkbox-list-input" aria-label="Select 1" />
    <span class="checkbox-text">1</span>
  </label>
  <label class="checkbox-list-row" role="listitem">
    <input type="checkbox" class="checkbox-input checkbox-list-input" aria-label="Select 2" />
    <span class="checkbox-text">2</span>
  </label>
  <label class="checkbox-list-row" role="listitem">
    <input type="checkbox" class="checkbox-input checkbox-list-input" aria-label="Select 3" />
    <span class="checkbox-text">3</span>
  </label>
  <label class="checkbox-list-row" role="listitem">
    <input type="checkbox" class="checkbox-input checkbox-list-input" aria-label="Select 4" />
    <span class="checkbox-text">4</span>
  </label>
  <label class="checkbox-list-row" role="listitem">
    <input type="checkbox" class="checkbox-input checkbox-list-input" aria-label="Select 5" />
    <span class="checkbox-text">5</span>
  </label>
</div>`,
            },
        },
    },
};