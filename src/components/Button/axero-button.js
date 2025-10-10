// ========================================
// AXERO BUTTON WEB COMPONENT
// ========================================
// AlpineJS Web Component for Axero Button
// Usage: <axero-button appearance="primary" size="medium" label="Click me" icon='<axero-icon name="download"></axero-icon>' icon-position="prefix"></axero-button>

class AxeroButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['appearance', 'size', 'disabled', 'label', 'icon', 'icon-position', 'icon-only'];
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  attributeChangedCallback() {
    this.render();
  }

  addEventListeners() {
    const button = this.shadowRoot.querySelector('button');
    if (button) {
      button.addEventListener('click', (e) => {
        this.dispatchEvent(new CustomEvent('click', { 
          bubbles: true, 
          detail: e 
        }));
      });
    }
  }

  render() {
    const appearance = this.getAttribute('appearance') || 'primary';
    const size = this.getAttribute('size') || 'medium';
    const disabled = this.hasAttribute('disabled');
    const label = this.getAttribute('label') || this.textContent.trim();
    const icon = this.getAttribute('icon');
    const iconPosition = this.getAttribute('icon-position') || 'prefix';
    const iconOnly = this.hasAttribute('icon-only');
    const ariaLabel = this.getAttribute('aria-label');

    // Build CSS classes
    const classes = [
      'btn',
      `btn--${size}`,
      `btn--${appearance}`,
      iconOnly ? 'btn--icon-only' : ''
    ].filter(Boolean).join(' ');

    // Build button content
    let content = '';
    
    if (iconOnly && icon) {
      content = icon;
    } else if (icon && iconPosition === 'prefix') {
      content = `<span class="btn-icon btn-icon--prefix">${icon}</span>${label}`;
    } else if (icon && iconPosition === 'suffix') {
      content = `${label}<span class="btn-icon btn-icon--suffix">${icon}</span>`;
    } else {
      content = label;
    }

    // Create the button HTML with CSS styles
    this.shadowRoot.innerHTML = `
      <style>
        .btn {
          font-family: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          font-size: 13.68px;
          font-weight: 500;
          letter-spacing: 0.076px;
          line-height: 20px;
          text-decoration: none;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          display: inline-block;
          border: 1px solid #E0E0E0;
          border-radius: 4px;
          padding: 4px 12px;
          height: 30px;
          box-sizing: border-box;
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
          transition: none;
          outline: none;
        }
        .btn--primary {
          color: white;
          background-color: #007bff;
        }
        .btn--primary:hover {
          background-color: #0056b3;
        }
        .btn--secondary {
          color: #1A1A1A;
          background-color: #fff;
          border: 1px solid #E0E0E0;
        }
        .btn--secondary:hover,
        .btn--secondary:focus {
          text-decoration: none;
          background: #E8E8E8;
          transition: none;
        }
        .btn--small {
          font-size: 12px;
          padding: 3px 10px;
          height: 26px;
        }
        .btn--medium {
          font-size: 13.68px;
          padding: 4px 12px;
          height: 30px;
        }
        .btn--large {
          font-size: 15px;
          padding: 6px 16px;
          height: 36px;
        }
        .btn-icon {
          display: inline-flex;
          align-items: center;
        }
        .btn-icon--prefix {
          margin-right: 6px;
        }
        .btn-icon--suffix {
          margin-left: 6px;
        }
        .btn--icon-only {
          padding: 4px;
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .btn--icon-only.btn--small {
          width: 26px;
          height: 26px;
          padding: 3px;
        }
        .btn--icon-only.btn--large {
          width: 36px;
          height: 36px;
          padding: 6px;
        }
        .btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      </style>
      <button 
        type="button" 
        class="${classes}"
        ${disabled ? 'disabled' : ''}
        ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
      >
        ${content}
      </button>
    `;

    this.addEventListeners();
  }
}

// Register the custom element
if (!customElements.get('axero-button')) {
  customElements.define('axero-button', AxeroButton);
}

export default AxeroButton;
