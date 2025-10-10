// Import CSS variables to ensure they're available in Storybook
import '../src/shared/variables.css';

// Add FontAwesome CSS link - using CDN for development, replace with your path in production
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.charset = 'utf-8';
// Use CDN for development - replace with '/Assets/FontAwesome5/css/all.css?v=10.72.23.20250924' in production
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
document.head.appendChild(link);

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
