# 🎨 Axero Design System Toolkit

A modern design system built with React and Web Components, deployable for use in both React and AlpineJS projects.

## 🚀 Quick Start

### For AlpineJS Projects (Recommended)
```html
<script type="module">
  import 'https://axeroproduct.gitlab.io/design-system/toolkit.es.js';
</script>

<!-- Use web components directly -->
<axero-button label="Hello World" appearance="primary"></axero-button>
<axero-icon name="heart" size="large"></axero-icon>
```

### For React Projects
```jsx
import { Button, Icon } from 'axero-design-system';

<Button primary label="Hello World" />
<Icon name="heart" size="large" />
```

## 📦 Available Components

- **`<axero-button>`** - Flexible button with multiple variants and icon support
- **`<axero-icon>`** - FontAwesome icons with size and theme options
- More components coming soon...

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
# Clone the repository
git clone https://gitlab.com/axeroproduct/design-system.git
cd design-system

# Install dependencies
npm install

# Start Storybook for development
npm run storybook
```

### Building
```bash
# Build toolkit for distribution
npm run build:clean

# Build Storybook documentation
npm run build-storybook

# Serve built files locally for testing
npm run serve:toolkit
```

## 🚀 Deployment Options

This project supports deployment to multiple platforms including GitLab Pages and Netlify.

### Netlify Deployment (Recommended for External Hosting)

1. **Connect your repository to Netlify**:
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "New site from Git"
   - Connect your Git provider and select this repository
   - Netlify will automatically detect the `netlify.toml` configuration

2. **Build settings** (auto-configured via netlify.toml):
   - Build command: `npm run build-storybook`
   - Publish directory: `storybook-static`
   - Node.js version: 18

3. **Deploy**:
   - Click "Deploy site"
   - Your site will be available at a generated URL like `https://amazing-name-123456.netlify.app`
   - You can customize the subdomain in site settings

### GitLab Pages Deployment

1. **Enable GitLab Pages** (if not already enabled):
   - Go to your GitLab project
   - Navigate to **Settings** → **Pages**
   - Ensure Pages is enabled for your project

2. **Push to main/master branch**:
   ```bash
   git add .
   git commit -m "Add GitLab CI/CD pipeline"
   git push origin main
   ```

3. **Monitor deployment**:
   - Go to **CI/CD** → **Pipelines** in your GitLab project
   - Watch the build and deploy stages complete
   - Once successful, your toolkit will be available at:
     ```
     https://axeroproduct.gitlab.io/design-system/
     ```

### What Gets Deployed

- **Toolkit Files**: `toolkit.es.js`, `toolkit.umd.js`, `style.css`
- **Storybook Documentation**: Available at `/storybook/`
- **Landing Page**: Overview and usage instructions

### Using Your Deployed Toolkit

Once deployed, you can use your toolkit in any project:

```html
<!DOCTYPE html>
<html>
<head>
  <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
  <script type="module">
    import 'https://axeroproduct.gitlab.io/design-system/toolkit.es.js';
  </script>
</head>
<body>
  <div x-data="{ message: 'Hello from Axero!' }">
    <axero-button :label="message" appearance="primary"></axero-button>
    <axero-icon name="star" size="medium"></axero-icon>
  </div>
</body>
</html>
```

## 🔧 Configuration

### GitLab CI/CD Variables (Optional)
You can set these in **Settings** → **CI/CD** → **Variables**:

- `NODE_VERSION`: Node.js version to use (default: 18)
- `DEPLOY_BRANCH`: Branch to deploy from (default: main/master)

### Custom Domain (Optional)
To use a custom domain with GitLab Pages:

1. Go to **Settings** → **Pages**
2. Add your custom domain
3. Configure DNS records as instructed
4. Enable HTTPS (recommended)

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.jsx          # React component
│   │   │   ├── axero-button.js     # Web component
│   │   │   ├── Button.css          # Styles
│   │   │   └── Button.stories.js   # Storybook stories
│   │   └── Icons/
│   │       ├── Icons.jsx
│   │       ├── axero-icon.js
│   │       └── Icons.stories.js
│   └── index.js                    # Main export file
├── .gitlab-ci.yml                  # CI/CD pipeline
├── vite.config.js                  # Build configuration
└── package.json
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/new-component`
2. Add your component following the existing pattern:
   - React component in `src/components/ComponentName/ComponentName.jsx`
   - Web component in `src/components/ComponentName/axero-componentname.js`
   - Styles in `src/components/ComponentName/ComponentName.css`
   - Stories in `src/components/ComponentName/ComponentName.stories.js`
3. Export in `src/index.js`
4. Update documentation
5. Create a merge request

## 📖 Documentation

- **Storybook**: Available at your deployed URL + `/storybook/`
- **AlpineJS Integration**: See `ALPINEJS_INTEGRATION.md`
- **Component API**: Check individual component stories in Storybook

## 🆓 Free Hosting Options

This toolkit can be deployed to various free hosting services:

- **GitLab Pages** (recommended) - Included with GitLab
- **GitHub Pages** - Free for public repositories
- **Netlify** - Free tier with 100GB bandwidth
- **Vercel** - Free for personal projects
- **Surge.sh** - Simple static hosting

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- **Live Demo**: https://axeroproduct.gitlab.io/design-system/
- **Storybook**: https://axeroproduct.gitlab.io/design-system/storybook/
- **Repository**: https://gitlab.com/axeroproduct/design-system
