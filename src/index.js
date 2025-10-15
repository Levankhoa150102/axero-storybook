// ========================================
// REACT COMPONENTS EXPORT
// ========================================
// Import and export all React components for React/Storybook usage
export { Button } from './components/Button/Button.jsx';
export { ProcessingButton } from './components/Button/ProcessingButton.jsx';
export { Icon } from './components/Icons/Icons.jsx';
export { Rating } from './components/Rating/Rating.jsx';
export { AlertBanner } from './components/AlertBanner/AlertBanner.jsx';
export { Tooltip } from './components/Tooltip/Tooltip.jsx';
export { Dropdown } from './components/Dropdown/Dropdown.jsx';
export { Input } from './components/Input/Input.jsx';
export { Toggle } from './components/Toggle/Toggle.jsx';
export { Checkbox } from './components/Checkbox/Checkbox.jsx';
export { Tags } from './components/Tags/Tags.jsx';
export { Tab } from './components/Tab/Tab.jsx';
export { Table } from './components/Table/Table.jsx';
// export { IconGallery } from './components/Icons/Icons.jsx';

// ========================================
// CSS STYLES IMPORT
// ========================================
// Import CSS variables first to ensure they're available globally
import './shared/variables.css';

// Import all CSS styles to ensure they're bundled
import './components/Button/Button.css';
import './components/Icons/Icons.css';
import './components/Rating/Rating.css';
import './components/AlertBanner/AlertBanner.css';
import './components/Tooltip/Tooltip.css';
import './components/Dropdown/Dropdown.css';
import './components/Input/Input.css';
import './components/Toggle/Toggle.css';
import './components/Checkbox/Checkbox.css';
import './components/Tags/Tags.css';
import './components/Tab/Tab.css';
// ========================================
// WEB COMPONENTS FOR ALPINEJS SUPPORT
// ========================================
// Import web components that register custom elements
// Each web component should be imported here to ensure they're available
// when the toolkit is loaded in AlpineJS projects

// Icon component as <axero-icon>
import './components/Icons/axero-icon.js';

// Button component as <axero-button>
import './components/Button/axero-button.js';

// ========================================
// TOOLKIT NAMESPACE OBJECT
// ========================================
// Import components for the default export
import { Button } from './components/Button/Button.jsx';
import { Icon } from './components/Icons/Icons.jsx';
import { Rating } from './components/Rating/Rating.jsx';
import { AlertBanner } from './components/AlertBanner/AlertBanner.jsx';
import { Tooltip } from './components/Tooltip/Tooltip.jsx';
import { Dropdown } from './components/Dropdown/Dropdown.jsx';
import { Input } from './components/Input/Input.jsx';
import { Toggle } from './components/Toggle/Toggle.jsx';
import { Checkbox } from './components/Checkbox/Checkbox.jsx';
import { Tags } from './components/Tags/Tags.jsx';
import { Tab } from './components/Tab/Tab.jsx';

// Create a namespace object for easier access in React applications
const SystemDesignToolkit = {
  Button,
  Icon,
  Input,
  Rating,
  AlertBanner,
  Tooltip,
  Dropdown,
  Toggle,
  Checkbox,
  Tags,
  Tab,
  // IconGallery,
  // TODO: Add future components here when created
  // Example: CustomButton, Modal, etc.
};

// ========================================
// GLOBAL AVAILABILITY
// ========================================
// Make it available globally when used via script tag
// This allows access via window.SystemDesignToolkit in browser environments
if (typeof window !== 'undefined') {
  window.SystemDesignToolkit = SystemDesignToolkit;
}

export default SystemDesignToolkit
