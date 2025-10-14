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
};

export const Default = {
  args: {
    label: 'Button',
  },
  parameters: {
    docs: {
      source: {
        code: `<button class="btn">
  Button
</button>`
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
</button>`,}

    }
  }
};
