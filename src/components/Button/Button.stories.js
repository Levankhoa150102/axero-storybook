import React from 'react';
import { fn } from '@storybook/test';
import { Button } from './Button.jsx';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'UI Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
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

// export const Large = {
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

// Processing Button Examples
export const Processing = {
  args: {
    label: 'Submit Form',
    enableProcessing: true,
    processingLabel: 'Processing...',
    processingDuration: 3000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Click the button to see the processing animation. Button automatically changes to processing state with animated stripes.',
      },
      source: {
        code: `<button 
  class="btn" 
  onclick="handleProcessing(this)"
  style="
    padding: 12px 28px;
    height: 48px;
    font-size: 15.2px;
    color: #fff;
    background: #459d3e;
    border: 0;
    border-radius: 8px;
    transition: .2s ease-out;
    box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12);
  "
>
  Submit Form
</button>

<script>
function handleProcessing(button) {
  button.classList.add('processing');
  button.disabled = true;
  button.textContent = 'Processing...';
  
  setTimeout(() => {
    button.classList.remove('processing');
    button.disabled = false;
    button.textContent = 'Submit Form';
  }, 3000);
}
</script>`
      }
    }
  }
};
