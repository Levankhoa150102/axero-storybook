import { Tooltip } from './Tooltip';

export default {
  title: 'UI Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Text content to display in the tooltip',
    },
    position: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the trigger element',
    },
    trigger: {
      control: { type: 'select' },
      options: ['hover', 'click'],
      description: 'How the tooltip is triggered',
    },
    visible: {
      control: 'boolean',
      description: 'Whether the tooltip is visible by default',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    buttonText: {
      control: 'text',
      description: 'Text for the default button when no children provided',
    },
    buttonVariant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'],
      description: 'Variant of the default button',
    },
    buttonSize: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the default button',
    },
  },
};

// Default tooltip with hover trigger
export const Default = {
  args: {
    text: 'Comments',
    position: 'top',
    trigger: 'hover',
    visible: false,
    className: '',
    buttonText: 'Hover me',
    buttonVariant: 'primary',
    buttonSize: 'medium',
  },
  parameters: {
      docs: {
        source: {
          code: Tooltip.generateHTML({
            text: 'Comments',
            position: 'top',
            trigger: 'hover',
            visible: false,
            className: '',
            buttonText: 'Hover me',
            buttonVariant: 'primary',
            buttonSize: 'medium',
          }),
          language: 'html',
        },
      },
    },
};