import React from 'react';
import { Icon } from './Icons.jsx';
// import { IconGallery } from './Icons.jsx';

const meta = {
  title: 'UI Components/Icons',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: 'text',
      description: "FontAwesome 5 class (e.g., 'fas fa-home')",
    },
    size: {
      control: 'number',
      description: 'Size of the icon in pixels',
    },
  },
};

export default meta;

export const Default = {
  args: {
    className: 'fas fa-home',
    size: 24,
  },
  parameters: {
    docs: {
      source: {
        code: `<!-- Basic usage -->
<i class="icon fas fa-home"></i>

<!-- Different icon and size -->
<i class="icon fas fa-star"></i>`
      }
    }
  }
};

// export const Gallery = {
//   render: () => React.createElement(IconGallery),
//   parameters: {
//     layout: 'fullscreen',
//   },
// };