import React from 'react';
import { SpaceNavbarWithSearch } from './SpaceNavbarWithSearch';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI Components/Dropdown',
  component: SpaceNavbarWithSearch,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => React.createElement(
      'div',
      { 
        style: { 
          minHeight: '400px',
          paddingTop: '20px',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }
      },
      React.createElement(Story)
    ),
  ],
  argTypes: {
    buttonText: {
      control: 'text',
      description: 'Text to display on the dropdown button',
    },
    viewAllUrl: {
      control: 'text',
      description: 'URL for "View All" link',
    },
    onSpaceClick: { action: 'space clicked' },
  },
};

// Sample spaces data
const sampleSpaces = [
  {
    id: 3,
    name: 'Media Assets',
    url: '/spaces/3/media-assets',
    image: 'https://anh.axero-demo.com/assets/Themes/default/images/space-default.png',
  },
  {
    id: 4,
    name: 'Warehouse',
    url: '/spaces/4/warehouse',
    image: 'https://anh.axero-demo.com/assets/Themes/default/images/space-default.png',
  },
  {
    id: 5,
    name: 'Marketing Team',
    url: '/spaces/5/marketing-team',
    image: 'https://anh.axero-demo.com/assets/Themes/default/images/space-default.png',
  },
  {
    id: 6,
    name: 'Engineering',
    url: '/spaces/6/engineering',
    image: 'https://anh.axero-demo.com/assets/Themes/default/images/space-default.png',
  },
  {
    id: 7,
    name: 'Human Resources',
    url: '/spaces/7/human-resources',
    image: 'https://anh.axero-demo.com/assets/Themes/default/images/space-default.png',
  },
];

// Space Navbar with Search
export const SpaceNavbar = {
  args: {
    buttonText: 'Spaces',
    spaces: sampleSpaces,
    viewAllUrl: '/spaces',
  },
  parameters: {
    docs: {
      description: {
        story: 'Space navigation dropdown with search functionality. Allows users to search and navigate to different spaces with thumbnail images.',
      },
      source: {
        code: `<div class="navbar">
  <div class="dropdown ax-spaces-dropdown open-left open">
    <a href="#" class="dropdown-toggle btn visible-desktop" aria-expanded="true">
      Spaces <span class="caret"></span>
    </a>
    <div class="dropdown-menu ax-diamond-hover-box">
      <div class="axero-ajax-content-wrapper ax-nav-widget">
        <div class="ax-diamond-hover-box ax-diamond-hover-box-spaces">
          <ul class="ax-diamond-hover-box-header">
            <li class="nav-header">
              My Spaces
              <span class="pull-right">
                <a title="Spaces" href="/spaces">View All</a>
              </span>
            </li>
            <li class="divider"></li>
          </ul>
          
          <ul class="ax-diamond-hover-box-dropdown ax-diamond-hover-box-dropdown-spaces">
            <li>
              <a href="/spaces/3/media-assets" class="space-home-link">
                <img alt="Media Assets" src="https://anh.axero-demo.com/assets/Themes/default/images/space-default.png">
                <span class="anchor-text">Media Assets</span>
              </a>
            </li>
            <li>
              <a href="/spaces/4/warehouse" class="space-home-link">
                <img alt="Warehouse" src="https://anh.axero-demo.com/assets/Themes/default/images/space-default.png">
                <span class="anchor-text">Warehouse</span>
              </a>
            </li>
          </ul>
          
          <div class="small-loader" style="display: none;">
            <div class="_4-u2 mbm _2iwp">
              <div class="_2iwo">
                <div class="_2iwq">
                  <div class="_2iwr"></div>
                  <div class="_2iws"></div>
                  <div class="_2iwt"></div>
                  <div class="_2iwu"></div>
                </div>
              </div>
            </div>
            <!-- Repeat 3 more times for loading skeleton -->
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
      }
    },
  },
};
