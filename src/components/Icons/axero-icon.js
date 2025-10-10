// ========================================
// AXERO ICON WEB COMPONENT
// ========================================
// AlpineJS Web Component for Axero Icons
// Usage: <axero-icon name="home" size="small" mode="light"></axero-icon>
//
// CONFIGURATION FOR FUTURE COMPONENTS:
// 1. Follow this pattern for creating web components
// 2. Use class-based custom elements extending HTMLElement
// 3. Implement observedAttributes for reactive properties
// 4. Use Shadow DOM for style encapsulation
// 5. Register with customElements.define() with 'axero-' prefix
// 6. Export the class as default for potential direct usage

import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { 
  faHome, faUser, faCog, faSearch, faHeart, faStar, faEnvelope, faPhone,
  faCalendar, faDownload, faUpload, faEdit, faTrash, faCheck, faTimes,
  faPlus, faMinus, faEye, faEyeSlash, faLock, faUnlock
} from '@fortawesome/free-solid-svg-icons';

// Add icons to FontAwesome library
library.add(
  faHome, faUser, faCog, faSearch, faHeart, faStar, faEnvelope, faPhone,
  faCalendar, faDownload, faUpload, faEdit, faTrash, faCheck, faTimes,
  faPlus, faMinus, faEye, faEyeSlash, faLock, faUnlock
);

// Icon name mapping for FontAwesome classes
const iconClassMap = {
  home: 'fa-home',
  user: 'fa-user',
  settings: 'fa-cog',
  search: 'fa-search',
  heart: 'fa-heart',
  star: 'fa-star',
  mail: 'fa-envelope',
  phone: 'fa-phone',
  calendar: 'fa-calendar',
  download: 'fa-download',
  upload: 'fa-upload',
  edit: 'fa-edit',
  trash: 'fa-trash',
  check: 'fa-check',
  x: 'fa-times',
  plus: 'fa-plus',
  minus: 'fa-minus',
  eye: 'fa-eye',
  'eye-off': 'fa-eye-slash',
  lock: 'fa-lock',
  unlock: 'fa-unlock'
};

// Define the custom element
class AxeroIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['name', 'size', 'mode'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const name = this.getAttribute('name') || 'home';
    const size = this.getAttribute('size') || 'medium';
    const mode = this.getAttribute('mode') || 'light';

    const iconClass = iconClassMap[name] || iconClassMap.home;
    const sizeClass = `icon--${size}`;
    const modeClass = `icon--${mode}`;

    // Create the icon element
    const iconElement = document.createElement('i');
    iconElement.className = `fas ${iconClass} icon ${sizeClass} ${modeClass}`;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        transition: color 0.2s ease;
      }

      .icon--small {
        width: 14.4px;
        height: 14.4px;
        font-size: 14.4px;
      }

      .icon--medium {
        width: 24px;
        height: 24px;
        font-size: 24px;
      }

      .icon--large {
        width: 32px;
        height: 32px;
        font-size: 32px;
      }

      .icon--light {
        color: #1A1A1A;
      }

      .icon--dark {
        color: #ffffff;
      }
    `;

    // Clear shadow root and add new content
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(iconElement);

    // Replace FontAwesome icons
    dom.i2svg({ node: this.shadowRoot });
  }
}

// Register the custom element
if (!customElements.get('axero-icon')) {
  customElements.define('axero-icon', AxeroIcon);
}

export default AxeroIcon;
