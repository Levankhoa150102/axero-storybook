import React from 'react';
import { fn } from '@storybook/test';
import { Radio } from './Radio.jsx';

export default {
  title: 'UI Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onChange: { action: 'option selected' },
  },
};

// Sample options based on the image
const spaceTypeOptions = [
  {
    value: 'public',
    label: 'Public space',
    description: '(Appears in lists of public spaces.)',
  },
  {
    value: 'private',
    label: 'Private space',
    description: '(Only invited people know about it)',
  },
];

export const Default = {
  render: function(args) {
    const [selectedValue, setSelectedValue] = React.useState(args.value || "");

    const handleChange = (value, event) => {
      setSelectedValue(value);
      if (args.onChange) {
        args.onChange(value, event);
      }
    };

    return React.createElement(Radio, {
      ...args,
      value: selectedValue,
      onChange: handleChange,
    });
  },
  args: {
    label: 'Type of space',
    name: 'space-type',
    options: spaceTypeOptions,
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default Radio component with label and description for each option. Perfect for forms where users need to select one option from multiple choices.',
      },
        source: {
            code: `<fieldset class="radio-wrapper">
  <legend class="radio-label">
    Type of space <span class="radio-required"> *</span>
  </legend>
  <ul class="radio-list" role="radiogroup" aria-labelledby="radio-group-xyz" aria-required="true">
    <li class="radio-item">
      <label class="radio-option" for="radio-group-xyz-option-0">
        <input 
          id="radio-group-xyz-option-0" 
          type="radio" 
          name="space-type" 
          value="public" 
          required
        />
        <span class="radio-text">
          Public space (Appears in lists of public spaces.)
        </span>
      </label>
    </li>
    <li class="radio-item">
      <label class="radio-option" for="radio-group-xyz-option-1">
        <input 
          id="radio-group-xyz-option-1" 
          type="radio" 
          name="space-type" 
          value="private" 
          required
        />
        <span class="radio-text">
          Private space (Only invited people know about it)
        </span>
      </label>
    </li>
  </ul>
</fieldset>`,
        },
    },
  }
};