# AlpineJS Integration Guide

This document explains how to use the Axero Design System components in AlpineJS projects.

## Installation

### Option 1: Local Development
1. Build the toolkit:
```bash
npm run build:toolkit
```

2. Include the built files in your AlpineJS project:
```html
<!-- Include the toolkit bundle (UMD) -->
<script src="path/to/dist/toolkit.umd.js"></script>

<!-- Or use ES modules (recommended) -->
<script type="module">
  import 'path/to/dist/toolkit.es.js';
</script>
```

### Option 2: CDN/Remote Hosting (Public Open Source)
Use the publicly deployed Axero Design System:
```html
<!-- From GitLab Pages (Free & Open Source) -->
<script type="module">
  import 'https://axeroproduct.gitlab.io/design-system/toolkit.es.js';
</script>
```

## Available Web Components

### Axero Button (`<axero-button>`)

A flexible button component with multiple variants and icon support:

```html
<!-- Basic buttons -->
<axero-button label="Click me" appearance="primary"></axero-button>
<axero-button label="Cancel" appearance="secondary"></axero-button>

<!-- Different sizes -->
<axero-button label="Small" size="small" appearance="primary"></axero-button>
<axero-button label="Medium" size="medium" appearance="primary"></axero-button>
<axero-button label="Large" size="large" appearance="primary"></axero-button>

<!-- With icons -->
<axero-button 
  label="Download" 
  appearance="secondary" 
  icon='<axero-icon name="download" size="small"></axero-icon>' 
  icon-position="prefix">
</axero-button>

<axero-button 
  label="Settings" 
  appearance="secondary" 
  icon='<axero-icon name="settings" size="small"></axero-icon>' 
  icon-position="suffix">
</axero-button>

<!-- Icon only button -->
<axero-button 
  appearance="secondary" 
  icon='<axero-icon name="heart" size="small"></axero-icon>' 
  icon-only 
  aria-label="Like">
</axero-button>

<!-- In AlpineJS context -->
<div x-data="{ 
  buttonText: 'Click me', 
  isLoading: false,
  appearance: 'primary' 
}">
  <axero-button 
    :label="isLoading ? 'Loading...' : buttonText"
    :appearance="appearance"
    :disabled="isLoading"
    @click="isLoading = !isLoading">
  </axero-button>
  
  <select x-model="appearance">
    <option value="primary">Primary</option>
    <option value="secondary">Secondary</option>
  </select>
</div>
```

#### Available Properties:
- `label`: Button text content
- `appearance`: Button style (primary, secondary) - default: primary
- `size`: Button size (small, medium, large) - default: medium
- `icon`: HTML string for icon content (use with axero-icon)
- `icon-position`: Icon placement (prefix, suffix) - default: prefix
- `icon-only`: Boolean attribute for icon-only buttons
- `disabled`: Boolean attribute to disable the button
- `aria-label`: Accessibility label (required for icon-only buttons)

### Axero Icon (`<axero-icon>`)

Use FontAwesome icons with a simple custom element:

```html
<!-- Basic usage -->
<axero-icon name="home"></axero-icon>

<!-- With size and mode -->
<axero-icon name="user" size="large" mode="dark"></axero-icon>

<!-- In AlpineJS context -->
<div x-data="{ iconName: 'heart', iconSize: 'medium' }">
  <axero-icon :name="iconName" :size="iconSize" mode="light"></axero-icon>
  <button @click="iconName = iconName === 'heart' ? 'star' : 'heart'">
    Toggle Icon
  </button>
</div>
```

#### Available Properties:
- `name`: Icon name (home, user, settings, search, heart, star, mail, phone, calendar, download, upload, edit, trash, check, x, plus, minus, eye, eye-off, lock, unlock)
- `size`: Icon size (small, medium, large) - default: medium
- `mode`: Icon theme (light, dark) - default: light

## Deployment Guide

### Building for Production

1. **Clean build:**
```bash
npm run build:clean
```

2. **Serve locally for testing:**
```bash
npm run serve:toolkit
# Visit http://localhost:8080 to test your built files
```

### Deployment Options

#### Option 1: Static File Hosting
Upload the `dist/` folder to any static file hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Your own web server

#### Option 2: CDN Distribution
For better performance, upload to a CDN:
- jsDelivr (via GitHub releases)
- unpkg (via npm publishing)
- Custom CDN

#### Option 3: NPM Package
1. Update `package.json` with proper metadata
2. Publish to npm: `npm publish`
3. Use in projects: `npm install your-design-system`

### Integration Example

Complete AlpineJS project example:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AlpineJS + Axero Design System</title>
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script type="module">
    import 'https://axeroproduct.gitlab.io/design-system/toolkit.es.js';
  </script>
</head>
<body>
  <div x-data="{ 
    currentView: 'home',
    isLoading: false,
    user: { name: 'John Doe', avatar: 'user' }
  }">
    <!-- Navigation -->
    <nav>
      <axero-button 
        label="Home" 
        :appearance="currentView === 'home' ? 'primary' : 'secondary'"
        @click="currentView = 'home'">
      </axero-button>
      
      <axero-button 
        label="Profile" 
        :appearance="currentView === 'profile' ? 'primary' : 'secondary'"
        icon='<axero-icon name="user" size="small"></axero-icon>'
        icon-position="prefix"
        @click="currentView = 'profile'">
      </axero-button>
    </nav>

    <!-- Content -->
    <main x-show="currentView === 'home'">
      <h1>Welcome Home</h1>
      <axero-icon name="home" size="large"></axero-icon>
      
      <axero-button 
        :label="isLoading ? 'Loading...' : 'Load Data'"
        appearance="primary"
        :disabled="isLoading"
        @click="isLoading = !isLoading; setTimeout(() => isLoading = false, 2000)">
      </axero-button>
    </main>

    <main x-show="currentView === 'profile'">
      <h1 x-text="user.name"></h1>
      <axero-icon :name="user.avatar" size="large"></axero-icon>
    </main>
  </div>
</body>
</html>
```

## Development Guidelines

When adding new web components:

1. Create the React component in `src/components/ComponentName/ComponentName.jsx`
2. Create the web component wrapper in `src/components/ComponentName/axero-componentname.js`
3. Import the web component in `src/index.js`
4. Add the React component to the SystemDesignToolkit object
5. Follow the naming convention: `axero-componentname`
6. Update this documentation with usage examples

## Browser Support

The toolkit requires browsers that support:
- Custom Elements (Web Components)
- ES2015+ features
- Shadow DOM

Supported browsers:
- Chrome 54+
- Firefox 63+
- Safari 10.1+
- Edge 79+
