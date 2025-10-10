import React, { useState } from 'react';
import { fn } from '@storybook/test';
import { Input } from './Input.jsx';

export default {
  title: 'UI Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    onChange: fn(),
  },
  parameters: {
    docs: {
      source: {
        code: `<div class="input-wrapper">
  <label for="input" class="input-label">Label</label>
  <input id="input" type="text" class="input" placeholder="Enter text..." />
</div>`
      }
    }
  }
};


export const Required = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required...',
    required: true,
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field marked as required with asterisk.',
      },
      source: {
        code: `<div class="input-wrapper">
  <label for="input" class="input-label">
    Required Field
    <span class="input-required"> *</span>
  </label>
  <input id="input" type="text" class="input" placeholder="This field is required..." />
</div>`
      }
    },
  },
};

export const WithError = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email...',
    value: 'invalid-email',
    required: true,
    error: true,
    errorMessage: 'Please enter a email',
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field showing validation error state.',
      },
      source: {
        code: `<div class="input-wrapper">
  <div class="flex-between">
    <label for="input" class="input-label">
      Email
      <span class="input-required"> *</span>
    </label>
    <div>
      <div id="input-error" class="input-error" role="alert">
        Please enter a email
      </div>
    </div>
  </div>
  <input 
    id="input" 
    type="text" 
    class="input input--error" 
    placeholder="Enter your email..." 
    value="invalid-email"
    aria-invalid="true"
    aria-describedby="input-error"
  />
</div>`
      }
    },
  },
};

export const AsTextarea = {
  args: {
    label: 'Summary',
    description: 'A short summary.',
    placeholder: 'Summary',
    required: true,
    as: 'textarea',
    rows: 3,
    onChange: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Input component rendered as a textarea with description text after the required asterisk.',
      },
      source: {
        code: `<div class="input-wrapper">
  <label for="textarea" class="input-label">
    Summary
    <span class="input-description"> A short plaintext summary. </span>
    <span class="input-required"> *</span>
  </label>
  <textarea id="textarea" class="input" placeholder="Summary" rows="3"></textarea>
  <div class="input-character-count">Characters: 0</div>
</div>`
      }
    },
  },
};

export const WithCharacterCount = {    
  args: {
    label: 'Title',
    placeholder: 'Enter title...',
    showCharacterCount: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field with character counter showing the number of characters typed.',
      },
      source: {
        code: `<div class="input-wrapper">
  <div class="flex-between">
    <label for="title" class="input-label">Title</label>
    <div class="input-character-count">Characters: 0</div>
  </div>
  <input id="title" type="text" class="input" placeholder="Enter title..." />
</div>`
      }
    },
  },
};

export const WithButton = {
    args: {
        label: 'Search',
        placeholder: 'Enter search term...',
        withButton: true,
        buttonText: 'Search',
        buttonType: 'button',
        inputButtonError: false,
        inputButtonErrorMessage: 'There was an error with your search',
        onChange: fn(),
        onButtonClick: fn(),
    },
    parameters: {
        docs: {
            description: {
                story: 'Input field with an attached button for actions like search or submit.',
            },
            source: {
                code: `<div class="input-wrapper">
    <div class="flex-between">
        <label for="search" class="input-label">Search</label>
    </div>
    <div class="input-button-container">
        <div class="input-field-container">
            <input id="search" type="text" class="input" placeholder="Enter search term..." />
        </div>
        <div class="button-container">
            <button type="button" class="btn btn-with-input">Search</button>
        </div>
    </div>
</div>`
            }
        },
    },
};
