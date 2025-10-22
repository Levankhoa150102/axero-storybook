import React from 'react';
import { AlertBanner } from './AlertBanner';
import { AlertBox } from './AlertBox/AlertBox.jsx';
import { Notification } from './Notification/Notification.jsx';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI Components/Alert Banner',
  component: AlertBanner,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'padded',
  },
  decorators: [
          (Story) => React.createElement(
              'div',
              {
                  style: {
                      minHeight: '70px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                  }
              },
              React.createElement(Story)
          ),
      ],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    message: {
      control: 'text',
    },
    type: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info'],
    },
    showCloseButton: {
      control: 'boolean',
    },
    autoHide: {
      control: 'boolean',
    },
    autoHideDelay: {
      control: { type: 'number', min: 1000, max: 10000, step: 500 },
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Success = {
  args: {
    message: "Thank you for rating.",
    type: "success",
    showCloseButton: true,
    autoHide: false,
  },
  parameters: {
    docs: {
      source: {
        code: AlertBanner.generateHTML({
          message: "Thank you for rating.",
          type: "success",
          showCloseButton: true,
        }),
        language: 'html',
      },
    },
  },
};

export const Warning = {
  args: {
    message: "Please check your input.",
    type: "warning",
    showCloseButton: true,
    autoHide: false,
  },
  parameters: {
    docs: {
      source: {
        code: AlertBanner.generateHTML({
          message: "Please check your input.",
          type: "warning",
          showCloseButton: true,
        }),
        language: 'html',
      },
    },
  },
};

export const Error = {
  args: {
    message: "Something went wrong. Please try again.",
    type: "error",
    showCloseButton: true,
    autoHide: false,
  },
  parameters: {
    docs: {
      source: {
        code: AlertBanner.generateHTML({
          message: "Something went wrong. Please try again.",
          type: "error",
          showCloseButton: true,
        }),
        language: 'html',
      },
    },
  },
};

export const Info = {
  args: {
    message: "Your changes have been saved.",
    type: "info",
    showCloseButton: true,
    autoHide: false,
  },
  parameters: {
    docs: {
      source: {
        code: AlertBanner.generateHTML({
          message: "Your changes have been saved.",
          type: "info",
          showCloseButton: true,
        }),
        language: 'html',
      },
    },
  },
};

export const AutoHide = {
  args: {
    message: "This message will disappear in 3 seconds.",
    type: "success",
    showCloseButton: true,
    autoHide: true,
    autoHideDelay: 3000,
  },
  parameters: {
    docs: {
      source: {
        code: AlertBanner.generateHTML({
          message: "This message will disappear in 3 seconds.",
          type: "success",
          showCloseButton: true,
        }),
        language: 'html',
      },
    },
  },
};

export const NoCloseButton = {
  args: {
    message: "This AlertBanner has no close button.",
    type: "info",
    showCloseButton: false,
    autoHide: true,
    autoHideDelay: 4000,
  },
  parameters: {
    docs: {
      source: {
        code: AlertBanner.generateHTML({
          message: "This AlertBanner has no close button.",
          type: "info",
          showCloseButton: false,
        }),
        language: 'html',
      },
    },
  },
};

export const WithAlertBox = {
  render: function (args) {
    return (
      React.createElement(AlertBox, {
        errorMessage: "You are required to read and confirm that you read this document.",
        successMessage: "You have confirmed that you read this document.",
      })
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'AlertBox with warning icon, message, and confirm button.'
      },
      source: {
        code: `<div class="alert-box alert-box-danger-container">
  <div class="alert-box-icon">
    <i class="fas fa-exclamation-triangle" aria-hidden="true"></i>
    <span class="alert-box-message alert-box-message-danger">
      {" "} You are required to read and confirm that you read this document.
    </span>
  </div>
   <button class="btn alert-box-danger-btn">Confirm</button>
</div>

<div class="alert-box alert-box-confirm">
  <div class="alert-box-icon">
    <i class="fas fa-check-square" aria-hidden="true"></i>
    <span class="alert-box-message alert-box-message-confirm">
      {" "} You have confirmed that you read this document.
    </span>
  </div>
  <button class="btn alert-box-confirm-btn">Undo</button>
</div>`,
      }
    }
  }
};

export const NotificationInfo = {
  render: (args) =>
    React.createElement(Notification, {
      ...args
    }),
  args: {
    type: "info",
    message: "Your membership for this space is pending approval."
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['info', 'success', 'warning', 'error'],
      },
    },
    message: {
      control: 'text',
    },
    
    autoHide: { control: false, table: { disable: true } },
    autoHideDelay: { control: false, table: { disable: true } },
    showCloseButton: { control: false, table: { disable: true } },
    onClose: { control: false, table: { disable: true } },
    closable: { control: false, table: { disable: true } },
  },
  parameters: {
    docs: {
      description: { story: 'Info notification banner.' },
      source: {
        code: `<div class="notification-banner notification--info">
  <div class="notification-content">
    <div class="notification-message">Your membership for this space is pending approval.</div>
  </div>
</div>`
      }
    }
  }
};

export const NotificationSuccess = {
  render: (args) =>
    React.createElement(Notification, {
      ...args
    }),
  args: {
    type: "success",
    message: "Idea added successfully!"
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['info', 'success', 'warning', 'error'],
      },
    },
    message: {
      control: 'text',
    },

    autoHide: { control: false, table: { disable: true } },
    autoHideDelay: { control: false, table: { disable: true } },
    showCloseButton: { control: false, table: { disable: true } },
    onClose: { control: false, table: { disable: true } },
    closable: { control: false, table: { disable: true } },


  },
  parameters: {
    docs: {
      description: { story: 'Success notification banner.' },
      source: {
        code: `<div class="notification-banner notification--success">
  <div class="notification-content">
    <div class="notification-message">Idea added successfully!</div>
  </div>
</div>`
      }
    }
  }
};

export const NotificationWarning = {
  render: (args) => (
    React.createElement(Notification, {
      ...args
    })
  ),
  args: {
    type: "warning",
    message: "You haven't created any ideas yet.",
    description: "Crowdsource thoughts, opinions, and ideas from everyone. Collect feedback through comments and likes. Then vote them up or down and let the best ideas rise to the top."
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['info', 'success', 'warning', 'error'],
      },
    },
    message: {
      control: 'text',
    },  
    autoHide: { control: false, table: { disable: true } },
    autoHideDelay: { control: false, table: { disable: true } },
    showCloseButton: { control: false, table: { disable: true } },
    onClose: { control: false, table: { disable: true } },
    closable: { control: false, table: { disable: true } },


  },
  parameters: {
    docs: {
      description: { story: 'Warning notification banner.' },
      source: {
        code: `<div class="notification-banner notification--warning">
  <div class="notification-content">
    <div class="notification-message">You haven't created any ideas yet.</div>
    <div class="notification-description">Crowdsource thoughts, opinions, and ideas from everyone. Collect feedback through comments and likes. Then vote them up or down and let the best ideas rise to the top.</div>
  </div>
</div>`
      }
    }
  }
};
