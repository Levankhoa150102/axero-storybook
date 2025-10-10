import { AlertBanner } from './AlertBanner';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI Components/Alert Banner',
  component: AlertBanner,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
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
