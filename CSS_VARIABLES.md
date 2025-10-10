# CSS Variables Documentation

## Overview

The Axero Design System includes a comprehensive set of CSS custom properties (variables) that provide consistent theming and styling across all components. These variables are automatically included when you import the design system.

## Usage

### In React Components
When using the design system as a React library, the CSS variables are automatically available:

```jsx
import { Button, Icon } from '@axero/design-system';
// CSS variables are automatically loaded
```

### In Standalone Projects
When using the built distribution files:

```html
<!-- Include the CSS file -->
<link rel="stylesheet" href="path/to/dist/assets/style.css">

<!-- Or import in your CSS -->
@import 'path/to/dist/assets/style.css';
```

### Custom CSS
You can use any of the variables in your custom CSS:

```css
.my-component {
  background-color: var(--background-primary);
  color: var(--body-text-primary);
  border: 1px solid var(--border-color-primary);
  font-family: var(--font-family);
  box-shadow: var(--box-shadow-common);
}
```

## Available Variables

### Colors

#### Background Colors
- `--background-primary`: #fff (Main background)
- `--background-primary-darker`: #f8f8f8
- `--background-secondary`: #f4f4f4
- `--background-tertiary`: #f0f0f0
- `--background-quaternary`: #e0e0e0

#### Text Colors
- `--body-text-primary`: #161616 (Main text color)
- `--body-text-secondary`: #393939 (Secondary text)
- `--button-text-color`: #1a1a1a
- `--hyperlink-color`: #2975B0
- `--caret-color`: #161616

#### Border Colors
- `--border-color-primary`: #e0e0e0
- `--border-color-primary-alt`: #e0e0e0
- `--border-color-secondary`: #ebebeb
- `--border-color-secondary-alt`: #ebebeb

### Typography
- `--font-family`: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
- `--font-icon-family`: 'Font Awesome 5 Pro'

### Layout & Spacing
- `--header-offset`: 90px
- `--widget-margin-bottom`: 30px
- `--widget-border-radius`: 4px
- `--widget-background-color`: var(--background-primary)
- `--widget-box-shadow`: var(--box-shadow-common)
- `--widget-header-padding`: 15px 20px 0
- `--widget-content-padded-padding`: 15px 20px 20px
- `--widget-footer-padding`: 0px 20px 15px

### Effects
- `--box-shadow-common`: 0 0 0 1px rgba(63, 63, 68, 0.05), 0 1px 3px 0 rgba(63, 63, 68, 0.15)

### Form Elements
- `--input-background-color`: #f4f4f4
- `--input-background-color-disabled`: #f0f0f0
- `--input-border-color`: #e0e0e0
- `--input-text-color`: #161616
- `--input-dropdown-background-color`: #fff
- `--tab-active-border-color`: #000

### Alert Colors
- `--alert-background-color`: #fff3cd
- `--alert-border-color`: #ffeeba
- `--alert-text-color`: #856404
- `--alert-info-background`: #cce5ff
- `--alert-info-color`: #004085
- `--alert-info-border-color`: #b8daff
- `--alert-warning-background-color`: #fff3cd
- `--alert-warning-border-color`: #fff3cd
- `--alert-warning-text-color`: #856404
- `--alert-success-background-color`: #dff0d8
- `--alert-success-border-color`: #dff0d8
- `--alert-success-text-color`: #468847
- `--alert-error-background-color`: #f8d7da
- `--alert-error-border-color`: #f5c6cb
- `--alert-error-text-color`: #b94a48

### Application-Specific Colors
- `--alert-app-red`: firebrick
- `--alert-app-green`: #459d3e
- `--alert-app-orange`: #f89406
- `--alert-app-yellow`: #ffd35c
- `--alert-banner-yellow`: #FFCC00
- `--alert-banner-red`: #B22222

### Calendar Colors
- `--calendar-default`: #f0f0f0
- `--calendar-blue`: #0043ce
- `--calendar-lightblue`: #4589ff
- `--calendar-cyan`: #0072c3
- `--calendar-teal`: #007d79
- `--calendar-green`: #198038
- `--calendar-yellow`: #ffdf5d
- `--calendar-orange`: #fb8532
- `--calendar-pink`: #d12771
- `--calendar-red`: #da1e28
- `--calendar-purple`: #8a3ffc
- `--calendar-lightpurple`: #be95ff

### Case Status Colors
- `--case-new`: #ffbd0c
- `--case-closed`: #333333
- `--case-feedbackrequired`: #5a38a3
- `--case-inprogress`: #459d3e
- `--case-fixed`: #0076c0
- `--case-reopened`: #d90b01

### File Type Colors
- `--file-word`: #0731DA
- `--file-excel`: #207245
- `--file-powerpoint`: #ff6600
- `--file-pdf`: #BB0000

### Loading Spinner
- `--loading-spinner-background`: #fff
- `--loading-spinner-border-color`: #ff6600
- `--loading-spiner-box-shadow-color`: #afafaf

### Miscellaneous
- `--drop-indicator-background`: #a7f0ba
- `--icon-highlighted-color`: #ff6600
- `--org-header-top`: 60px
- `--org-body-top`: 174px
- `--org-chart-user-panel-width`: 350px
- `--news-ticker-duration`: 60s

## Customization

To customize the design system for your brand, you can override any of these variables:

```css
:root {
  /* Override primary colors */
  --background-primary: #f9f9f9;
  --body-text-primary: #2d3748;
  --hyperlink-color: #3182ce;
  
  /* Override font family */
  --font-family: 'Your Custom Font', sans-serif;
}
```

## Build Output

When you build the design system, all CSS variables are included in the output CSS file located at `dist/assets/style.css`. This ensures that any consuming application will have access to all the design tokens.
