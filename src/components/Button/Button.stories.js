import React from 'react';
import { fn } from '@storybook/test';
import { Button } from './Button.jsx';
import { ProcessingButton } from './ProcessingButton.jsx';

export default {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'large', 'extra-large'],
      description: 'Button size: small, large, or extra-large',
    },
  },
};

export const Default = {
  args: {
    label: 'Button',
  },
  render: (args) =>
    React.createElement(
      'div',
      { style: { display: 'flex', gap: 8 } },
      React.createElement(Button, { ...args }),
      React.createElement(
        'button',
        { className: 'btn btn-primary-styles', type: 'button' },
        'Primary'
      )
    ),
  parameters: {
    docs: {
      source: {
        code: `<button class="btn">Button</button>
<button class="btn btn-primary-styles">Primary</button>`
      }
    }
  }
};

// Button Variants
export const WithPrefixIcon = {
  args: {
    label: 'Download',
    iconClassName: 'fas fa-download',
    iconSize: 14,
    iconPosition: 'prefix',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon positioned before the text.',
      },
      source: {
        code: `<button class="btn">
  <span class="btn-icon btn-icon--prefix">
    <i class="icon fas fa-download" style="font-size: 14px; width: 14px; height: 14px;"></i>
  </span>
  Download
</button>`
      }
    },
  },
};

export const WithSuffixIcon = {
  args: {
    label: 'Settings',
    iconClassName: 'fas fa-cog',
    iconSize: 14,
    iconPosition: 'suffix',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with an icon positioned after the text.',
      },
      source: {
        code: `<button class="btn">
  Settings
  <span class="btn-icon btn-icon--suffix">
    <i class="icon fas fa-cog" style="font-size: 14px; width: 14px; height: 14px;"></i>
  </span>
</button>`
      }
    },
  },
};

export const IconOnly = {
  args: {
    label: 'Like',
    iconClassName: 'fas fa-heart',
    iconSize: 14,
    iconOnly: true,
    'aria-label': 'Like',
  },
  parameters: {
    docs: {
      description: {
        story: 'Button displaying only an icon without text.',
      },
      source: {
        code: `<button class="btn btn--icon-only" aria-label="Like">
  <span class="btn-icon">
    <i class="icon fas fa-heart" style="font-size: 14px; width: 14px; height: 14px;"></i>
  </span>
</button>`
      }
    },
  },
};

//   args: {
//     size: 'large',
//     label: 'Button',
//   },
//   parameters: {
//     docs: {
//       source: {
//         code: `<button class="btn btn--large">
//   Button
// </button>`
//       }
//     }
//   }
// };

// export const Small = {
//   args: {
//     size: 'small',
//     label: 'Button',
//   },
//   parameters: {
//     docs: {
//       source: {
//         code: `<button class="btn btn--small">
//   Button
// </button>`
//       }
//     }
//   }
// };

// Processing Button Stories
export const ProcessingDefault = {
  render: function(args) {
    return React.createElement(ProcessingButton, args);
  },
  args: {
    label: 'Save and Publish',
    processingLabel: 'Processing...',
    processingDuration: 3000,
    backgroundColor: '#459d3e',
    textColor: '#fff',
  },
  argTypes: {
    onProcessingComplete: {
      control: false,
      table: { disable: true }
    },
    disabled: {
      control: false,
      table: { disable: true }
    },
    style: {
      control: false,
      table: { disable: true }
    },
    size: { 
      control: false,
      table: { disable: true } 
    },
    iconClassName: { 
      control: false,
      table: { disable: true } 
    },
    iconSize: { 
      control: false,
      table: { disable: true } 
    },
    iconPosition: { 
      control: false,
      table: { disable: true } 
    },
    iconOnly: { 
      control: false,
      table: { disable: true } 
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the button to see the processing animation with diagonal stripes. The button uses .btn.processing class.',
      },
      source: {
        code: `<button class="btn processing processing-active">
  Processing...
</button>`
      }
    }
  }
};

// Filter Button Stories
export const FilterButtonGroup = {
  args: {
    filterButtons: [
      { id: 'open', label: 'Open', icon: 'fas fa-circle', count: 0 },
      { id: 'due-today', label: 'Due today', icon: 'fas fa-calendar', count: 0 },
    ],
    defaultSelected: 'due-today',
    iconOnly: false,
    onFilterClick: fn()
  },
  argTypes: {
    filterButtons: {
      control: { type: 'object' },
      description: 'Array of filter button objects with id, label, icon, and count properties',
    },
    defaultSelected: {
      control: { type: 'text' },
      description: 'ID of the button that should be selected by default',
    },
    iconOnly: {
      control: { type: 'boolean' },
      description: 'Show only icons without text labels',
    },
    onFilterClick: {
      action: 'filter-clicked',
      description: 'Callback function when a filter button is clicked',
    },
  },
  render: function(args) {
    const [selectedFilter, setSelectedFilter] = React.useState(args.defaultSelected || 'due-today');
    
    const handleFilterClick = (filterId) => {
      setSelectedFilter(filterId);
      if (args.onFilterClick) {
        args.onFilterClick(filterId);
      }
    };

    return React.createElement(
      'div',
      { style: { display: 'flex', gap: '4px', flexWrap: 'wrap' } },
      ...(args.filterButtons || []).map(button => 
        React.createElement(Button, {
          key: button.id,
          label: args.iconOnly ? undefined : button.label,
          variant: "filter",
          selected: selectedFilter === button.id,
          count: args.iconOnly ? undefined : button.count,
          iconClassName: button.icon,
          iconSize: 12,
          iconPosition: "prefix",
          iconOnly: args.iconOnly,
          onClick: () => handleFilterClick(button.id)
        })
      )
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive filter buttons with customizable list via JSON controls. Click buttons to see selection state and check Actions panel for click events.',
      },
      source: {
        code:`
<div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
  <button className="btn btn--filter">
    <span className="btn-icon btn-icon--prefix">
      <i className="icon fas fa-circle" style={{ fontSize: 12, width: 12, height: 12 }}></i>
    </span>
    <span className="btn-label">
      Open
      <span className="btn-count">(0)</span>
    </span>
  </button>

  <button className="btn btn--filter btn-primary-styles btn--selected">
    <span className="btn-icon btn-icon--prefix">
      <i className="icon fas fa-calendar" style={{ fontSize: 12, width: 12, height: 12 }}></i>
    </span>
    <span className="btn-label">
      Due today
      <span className="btn-count">(0)</span>
    </span>
  </button>
</div>
        `
      }
    }
  }
};
