import React, { useState } from 'react';
import { fn } from '@storybook/test';
import { Input } from './Input.jsx';
import { InputWithTags } from './InputWithTags/InputWithTag.jsx';
import { InputWithFilter } from './InputWithFilter/InputWithFilter.jsx';

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
  argTypes: {
    as: { control: false, table: { disable: true } },
    rows: { control: false, table: { disable: true } },
    showCharacterCount: { control: false, table: { disable: true } },
    withButton: { control: false, table: { disable: true } },
    buttonText: { control: false, table: { disable: true } },
    buttonType: { control: false, table: { disable: true } },
    onButtonClick: { control: false, table: { disable: true } },
    inputButtonError: { control: false, table: { disable: true } },
    inputButtonErrorMessage: { control: false, table: { disable: true } },
    withTags: { control: false, table: { disable: true } },
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

export const NoLabel = {
  render: function (args) {
    const [content, setContent] = useState('');
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const handleInput = (e) => {
      const value = e.target.textContent || '';
      const trimmedValue = value.trim();
      setContent(value);
      setShowPlaceholder(trimmedValue.length === 0);

      if (args.onChange) {
        // Create a mock event for compatibility
        args.onChange({ target: { value } });
      }
    };

    const handleFocus = () => {
      const value = content.trim();
      if (value.length === 0) {
        setShowPlaceholder(false);
      }
    };

    const handleBlur = (e) => {
      const value = e.target.textContent || '';
      const trimmedValue = value.trim();
      setShowPlaceholder(trimmedValue.length === 0);

      // Clean up empty content
      if (trimmedValue.length === 0) {
        e.target.textContent = '';
        setContent('');
      }
    };

    return React.createElement('div', { className: 'input-wrapper' }, [
      React.createElement('div', {
        key: 'hidden-input',
        style: { display: 'none' }
      }, [
        React.createElement('input', {
          key: 'input',
          type: 'hidden',
          value: content
        })
      ]),
      React.createElement('div', {
        key: 'editable-div',
        className: `input input--no-label input--expandable ${showPlaceholder ? 'input--placeholder' : ''}`,
        contentEditable: true,
        onInput: handleInput,
        onFocus: handleFocus,
        onBlur: handleBlur,
        'data-placeholder': "What's on your mind?",
        suppressContentEditableWarning: true,
        style: {
          minHeight: '20px',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }
      })
    ]);
  },
  args: {
    onChange: fn(),
  },
  argTypes: {
    placeholder: { control: false, table: { disable: true } },
    as: { control: false, table: { disable: true } },
    rows: { control: false, table: { disable: true } },
    showCharacterCount: { control: false, table: { disable: true } },
    withButton: { control: false, table: { disable: true } },
    buttonText: { control: false, table: { disable: true } },
    buttonType: { control: false, table: { disable: true } },
    onButtonClick: { control: false, table: { disable: true } },
    inputButtonError: { control: false, table: { disable: true } },
    inputButtonErrorMessage: { control: false, table: { disable: true } },
    withTags: { control: false, table: { disable: true } },
    isChecking: { control: false, table: { disable: true } },
    checkingMessage: { control: false, table: { disable: true } },
    isSuccess: { control: false, table: { disable: true } },
    successMessage: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Expandable input field without a label that grows as you type. Uses contenteditable div to automatically expand to multiple lines.',
      },
      source: {
        code: `<div class="input-wrapper">
  <div style="display: none;">
    <input type="hidden" value="" />
  </div>
  <div 
    class="input input--no-label input--expandable"
    contenteditable="true"
    data-placeholder="What's on your mind?"
    style="min-height: 20px; white-space: pre-wrap; word-wrap: break-word;"
  ></div>
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
  argTypes: {
    as: { control: false, table: { disable: true } },
    rows: { control: false, table: { disable: true } },
    showCharacterCount: { control: false, table: { disable: true } },
    withButton: { control: false, table: { disable: true } },
    buttonText: { control: false, table: { disable: true } },
    buttonType: { control: false, table: { disable: true } },
    onButtonClick: { control: false, table: { disable: true } },
    inputButtonError: { control: false, table: { disable: true } },
    inputButtonErrorMessage: { control: false, table: { disable: true } },
    withTags: { control: false, table: { disable: true } },
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
  argTypes: {
    as: { control: false, table: { disable: true } },
    rows: { control: false, table: { disable: true } },
    showCharacterCount: { control: false, table: { disable: true } },
    withButton: { control: false, table: { disable: true } },
    buttonText: { control: false, table: { disable: true } },
    buttonType: { control: false, table: { disable: true } },
    onButtonClick: { control: false, table: { disable: true } },
    inputButtonError: { control: false, table: { disable: true } },
    inputButtonErrorMessage: { control: false, table: { disable: true } },
    withTags: { control: false, table: { disable: true } },
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
  argTypes: {
    type: { control: false, table: { disable: true } },
    showCharacterCount: { control: false, table: { disable: true } },
    withButton: { control: false, table: { disable: true } },
    buttonText: { control: false, table: { disable: true } },
    buttonType: { control: false, table: { disable: true } },
    onButtonClick: { control: false, table: { disable: true } },
    inputButtonError: { control: false, table: { disable: true } },
    inputButtonErrorMessage: { control: false, table: { disable: true } },
    withTags: { control: false, table: { disable: true } },
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
  argTypes: {
    description: { control: false, table: { disable: true } },
    as: { control: false, table: { disable: true } },
    rows: { control: false, table: { disable: true } },
    withButton: { control: false, table: { disable: true } },
    buttonText: { control: false, table: { disable: true } },
    buttonType: { control: false, table: { disable: true } },
    onButtonClick: { control: false, table: { disable: true } },
    inputButtonError: { control: false, table: { disable: true } },
    inputButtonErrorMessage: { control: false, table: { disable: true } },
    withTags: { control: false, table: { disable: true } },
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
  argTypes: {
    description: { control: false, table: { disable: true } },
    as: { control: false, table: { disable: true } },
    rows: { control: false, table: { disable: true } },
    showCharacterCount: { control: false, table: { disable: true } },
    withTags: { control: false, table: { disable: true } },
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

export const InlineButton = {
  render: function (args) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
      if (args.onChange) {
        args.onChange(e);
      }
    };

    const handleButtonClick = (e) => {
      e.preventDefault();
      if (args.onButtonClick) {
        args.onButtonClick(e);
      }
    };

    return React.createElement('div', { className: 'input-wrapper' }, [
      React.createElement('label', {
        key: 'label',
        htmlFor: 'inline-input',
        className: 'input-label'
      }, args.label),
      React.createElement('div', {
        key: 'outer-container',
        className: 'input-inline-outer'
      }, [
        React.createElement('input', {
          key: 'submit-button',
          type: 'submit',
          className: 'input-submit-button',
          value: args.buttonText,
          onClick: handleButtonClick
        }),
        React.createElement('div', {
          key: 'input-container',
          className: 'input-text-container'
        }, [
          React.createElement('input', {
            key: 'text-input',
            id: 'inline-input',
            type: 'text',
            className: 'input input--with-submit',
            placeholder: args.placeholder,
            value: inputValue,
            onChange: handleInputChange
          })
        ])
      ])
    ]);
  },
  args: {
    label: 'Email Address',
    placeholder: 'Enter email address...',
    buttonText: 'Invite',
    onChange: fn(),
    onButtonClick: fn(),
  },
  argTypes: {
    description: { control: false, table: { disable: true } },
    as: { control: false, table: { disable: true } },
    rows: { control: false, table: { disable: true } },
    showCharacterCount: { control: false, table: { disable: true } },
    withButton: { control: false, table: { disable: true } },
    buttonType: { control: false, table: { disable: true } },
    inputButtonError: { control: false, table: { disable: true } },
    inputButtonErrorMessage: { control: false, table: { disable: true } },
    withTags: { control: false, table: { disable: true } },
    isChecking: { control: false, table: { disable: true } },
    checkingMessage: { control: false, table: { disable: true } },
    isSuccess: { control: false, table: { disable: true } },
    successMessage: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field with an inline button integrated inside the input area, perfect for actions like "Invite", "Send", or "Submit".',
      },
      source: {
        code: `<div class="input-wrapper">
  <label for="inline-input" class="input-label">Email Address</label>
  <div class="input-inline-outer">
    <input type="submit" class="input-submit-button" value="Invite" />
    <div class="input-text-container">
      <input 
        id="inline-input" 
        type="text" 
        class="input input--with-submit" 
        placeholder="Enter email address..." 
      />
    </div>
  </div>
</div>`
      }
    }
  }
};

export const WithTags = {
  render: function (args) {
    const [tags, setTags] = React.useState(['rocket', 'sale']);

    const handleTagsChange = (newTags) => {
      setTags(newTags);
      if (args.onTagsChange) args.onTagsChange(newTags);
    };

    return React.createElement(InputWithTags, {
      ...args,
      tags,
      onTagsChange: handleTagsChange,
    });
  },
  args: {
    label: 'Add Tags',
    placeholder: 'Enter tags...',
    showDropdown: true,
    onTagsChange: fn(),
  },
  argTypes: {
    description: { control: false, table: { disable: true } },
    value: { control: false, table: { disable: true } },
    type: { control: false, table: { disable: true } },
    as: { control: false, table: { disable: true } },
    rows: { control: false, table: { disable: true } },
    showCharacterCount: { control: false, table: { disable: true } },
    required: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
    error: { control: false, table: { disable: true } },
    errorMessage: { control: false, table: { disable: true } },
    withButton: { control: false, table: { disable: true } },
    buttonText: { control: false, table: { disable: true } },
    buttonType: { control: false, table: { disable: true } },
    inputButtonError: { control: false, table: { disable: true } },
    inputButtonErrorMessage: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Input field with integrated tags functionality using the InputWithTags component. Type and press Enter to add tags, or click the + button to show dropdown. Tags can be removed by clicking the × button in edit mode.',
      },
      source: {
        code: `<div class="input-wrapper">
  <label for="tags-input" class="input-label">Add Tags</label>
  <div class="input-tags-container">
    <!-- Existing tags -->
    <div class="input-tags-wrapper">
      <div class="tags-cp-container edit-mode">
  <span class="tag-cp label">
    <span class="tag-cp-text">rocket</span>
    <span class="tag-cp-remove" title="Remove tag" aria-label="Remove rocket tag">
      <i class="fas fa-times"></i>
    </span>
  </span>
  <span class="tag-cp label">
    <span class="tag-cp-text">sale</span>
    <span class="tag-cp-remove" title="Remove tag" aria-label="Remove sale tag">
      <i class="fas fa-times"></i>
    </span>
  </span>
</div>
    </div>
    
    <!-- Input field with + button -->
    <div class="input-tags-field">
      <input 
        id="tags-input" 
        type="text" 
        class="input-tags-input" 
        placeholder="Enter tags..." 
      />
      <button type="button" class="input-tags-button" aria-label="Show available tags">
        <i class="fas fa-plus-square fa-lg"></i>
      </button>
    </div>
    
    <!-- Dropdown (shows when button clicked) -->
    <div class="input-tags-dropdown">
      <div class="input-tags-dropdown-content">
        <!-- Dropdown content will be added here -->
      </div>
    </div>
  </div>
</div>`
      }
    },
  },
};

export const AvailabilityCheck = {
  render: function (args) {
    const [inputValue, setInputValue] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [checkingMessage, setCheckingMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // List of available space names for comparison
    const availableNames = ['public', 'community', 'workspace', 'meeting', 'lounge', 'office'];

    const handleChange = (e) => {
      const value = e.target.value;
      setInputValue(value);

      // Reset states
      setIsChecking(false);
      setIsSuccess(false);
      setCheckingMessage('');
      setSuccessMessage('');

      // Start checking when user enters at least 1 character
      if (value.length >= 1) {
        setIsChecking(true);
        setCheckingMessage('checking availability...');

        // Simulate API call with timeout
        setTimeout(() => {
          setIsChecking(false);

          // Check if name is available (not in the list)
          const isAvailable = !availableNames.includes(value.toLowerCase());

          if (isAvailable) {
            setIsSuccess(true);
            setSuccessMessage('space name is available');
          } else {
            setSuccessMessage('');
            // Don't show error, just stop showing success
          }
        }, 1000); // 1 second delay to simulate checking
      }

      // Call the original onChange if provided
      if (args.onChange) {
        args.onChange(e);
      }
    };

    return React.createElement(Input, {
      ...args,
      value: inputValue,
      onChange: handleChange,
      isChecking: isChecking,
      checkingMessage: checkingMessage,
      isSuccess: isSuccess,
      successMessage: successMessage,
    });
  },
  args: {
    label: 'Space Name',
    placeholder: 'Enter space name...',
    required: true,
  },
  argTypes: {
    as: { control: false, table: { disable: true } },
    rows: { control: false, table: { disable: true } },
    showCharacterCount: { control: false, table: { disable: true } },
    withButton: { control: false, table: { disable: true } },
    buttonText: { control: false, table: { disable: true } },
    buttonType: { control: false, table: { disable: true } },
    onButtonClick: { control: false, table: { disable: true } },
    inputButtonError: { control: false, table: { disable: true } },
    inputButtonErrorMessage: { control: false, table: { disable: true } },
    withTags: { control: false, table: { disable: true } },
    isChecking: { control: false, table: { disable: true } },
    checkingMessage: { control: false, table: { disable: true } },
    isSuccess: { control: false, table: { disable: true } },
    successMessage: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with real-time availability checking. When typing, it shows "checking availability..." and then displays success message if the space name is available. Try names like "public", "community" (unavailable) vs "myspace", "newspace" (available).',
      },
      source: {
        code: `<div class="input-wrapper">
  <div class="flex-between">
    <label for="space-name-input" class="input-label">
      Space Name
      <span class="input-required"> *</span>
    </label>
    
    <div id="space-name-input-checking" class="input-checking" role="status">
      checking availability...
    </div>
    
    <div id="space-name-input-success" class="input-success" role="status">
      space name is available
    </div>
  </div>
  
  <input 
    id="space-name-input" 
    type="text" 
    class="input" 
    placeholder="Enter space name..." 
    required
    aria-invalid="false"
  />
</div>`
      }
    }
  }
};

export const WithAdornments = {
  render: function (args) {
    const [value, setValue] = React.useState('');
    const handleChange = (e) => {
      setValue(e.target.value);
      args.onChange?.(e);
    };

    return React.createElement(Input, {
      ...args,
      value: value,
      onChange: handleChange
    });
  },
  args: {
    label: 'Search',
    placeholder: 'search...',
    iconClassName: 'fas fa-search ',
    iconSize: 14,
    iconPosition: 'suffix',
    onChange: fn(),
    onPrefixClick: fn(),
    onSuffixClick: fn(),
  },
  argTypes: {
    iconClassName: {
      control: 'text',
      description: 'Font Awesome icon class name (e.g., fas fa-cog)'
    },
    iconSize: {
      control: { type: 'number', min: 12, max: 24, step: 1 },
      description: 'Icon size in pixels'
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['prefix', 'suffix'],
      description: 'Icon position - prefix or suffix'
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color for the input'
    },
    prefix: {
      control: 'text',
      description: 'Additional prefix content (text or symbol)'
    },
    suffix: {
      control: 'text',
      description: 'Additional suffix content (text or symbol)'
    },
    onPrefixClick: { action: 'prefix-clicked' },
    onSuffixClick: { action: 'suffix-clicked' },

    as: { control: false, table: { disable: true } },
    rows: { control: false, table: { disable: true } },
    showCharacterCount: { control: false, table: { disable: true } },
    withButton: { control: false, table: { disable: true } },
    buttonText: { control: false, table: { disable: true } },
    buttonType: { control: false, table: { disable: true } },
    onButtonClick: { control: false, table: { disable: true } },
    inputButtonError: { control: false, table: { disable: true } },
    inputButtonErrorMessage: { control: false, table: { disable: true } },
    withTags: { control: false, table: { disable: true } },
    isChecking: { control: false, table: { disable: true } },
    checkingMessage: { control: false, table: { disable: true } },
    isSuccess: { control: false, table: { disable: true } },
    successMessage: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with prefix and/or suffix adornments. You can add either a prefix, suffix, or both. Perfect for currency symbols, units, domains, or context indicators. Use the controls to customize the prefix and suffix values.',
      },
      source: {
        code: `<div class="input-wrapper">
  <label for="currency-input" class="input-label">Currency Converter</label>
  <div class="input-adornments-wrapper">
    <span class="input-prefix">$</span>
    <input id="currency-input" type="text" class="input input-with-adornments" placeholder="0.00" />
    <span class="input-suffix">USD</span>
  </div>
</div>

<!-- With just prefix -->
<div class="input-wrapper">
  <label for="price-input" class="input-label">Price</label>
  <div class="input-adornments-wrapper">
    <span class="input-prefix">$</span>
    <input id="price-input" type="text" class="input input-with-adornments" placeholder="Enter amount..." />
  </div>
</div>

<!-- With just suffix -->
<div class="input-wrapper">
  <label for="website-input" class="input-label">Website</label>
  <div class="input-adornments-wrapper">
    <input id="website-input" type="text" class="input input-with-adornments" placeholder="Enter website..." />
    <span class="input-suffix">.com</span>
  </div>
</div>

<!-- With icon as suffix -->
<div class="input-wrapper">
  <label for="search-input" class="input-label">Search</label>
  <div class="input-adornments-wrapper">
    <input id="search-input" type="text" class="input input-with-adornments" placeholder="Search..." />
    <span class="input-suffix"><i class="fas fa-search"></i></span>
  </div>
</div>

<!-- With clickable prefix and suffix -->
<div class="input-wrapper">
  <label for="action-input" class="input-label">With Actions</label>
  <div class="input-adornments-wrapper">
    <span class="input-prefix" tabindex="0" role="button" aria-label="Prefix action">@</span>
    <input id="action-input" type="text" class="input input-with-adornments" placeholder="Username" />
    <span class="input-suffix" tabindex="0" role="button" aria-label="Suffix action"><i class="fas fa-times"></i></span>
  </div>
</div>`
      }
    }
  }
};

export const WithFilter = {
  render: function (args) {
    const [filter, setFilter] = React.useState('');
    return React.createElement(
      InputWithFilter,
      {
        ...args,
        filter,
        onFilterChange: setFilter
      }
    );
  },
  args: {
    label: 'Filter Items',
  },
  argTypes: {
    description: { control: false, table: { disable: true } },
    value: { control: false, table: { disable: true } },
    filter: { control: false, table: { disable: true } },
    onFilterChange: { control: false, table: { disable: true } },
    items: {
      control: 'object',
      description: 'List of selectable items for the filter (array of objects with id, name, avatar, checked).'
    },
    required: { control: false, table: { disable: true } },
    error: { control: false, table: { disable: true } },
    errorMessage: { control: false, table: { disable: true } },
    iconClassName: { control: false, table: { disable: true } },
    iconSize: { control: false, table: { disable: true } },
    iconPosition: { control: false, table: { disable: true } },
    prefix: { control: false, table: { disable: true } },
    suffix: { control: false, table: { disable: true } },
    onPrefixClick: { control: false, table: { disable: true } },
    onSuffixClick: { control: false, table: { disable: true } },
    as: { control: false, table: { disable: true } },
    rows: { control: false, table: { disable: true } },
    showCharacterCount: { control: false, table: { disable: true } },
    withButton: { control: false, table: { disable: true } },
    buttonText: { control: false, table: { disable: true } },
    buttonType: { control: false, table: { disable: true } },
    onButtonClick: { control: false, table: { disable: true } },
    inputButtonError: { control: false, table: { disable: true } },
    inputButtonErrorMessage: { control: false, table: { disable: true } },
    withTags: { control: false, table: { disable: true } },
    isChecking: { control: false, table: { disable: true } },
    checkingMessage: { control: false, table: { disable: true } },
    isSuccess: { control: false, table: { disable: true } },
    successMessage: { control: false, table: { disable: true } },
    type: { control: false, table: { disable: true } },
    disabled: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with filter functionality and select all checkbox.'
      },
      source: {
        code: `
<div class="input-with-filter-root">
  <div class="input-with-filter-label">Filter Items</div>
  <div class="input-with-filter-box">
    <div class="input-with-filter-input-row">
      <div class="input-with-filter-checkbox--all">
        <input type="checkbox" class="input-with-filter-checkbox" title="Select all filtered" />
      </div>
      <input class="input-with-filter-input" placeholder="filter" />
    </div>
    <div class="input-with-filter-list">
      <label class="input-with-filter-row input-with-filter-row--checked">
        <input type="checkbox" class="input-with-filter-checkbox" checked />
        <span class="input-with-filter-avatar input-with-filter-avatar--default">
          <i class="fas fa-user"></i>
        </span>
        <span class="input-with-filter-name">Aana Subspace</span>
      </label>
    </div>
  </div>
</div>
`
      }
    }
  },
};
