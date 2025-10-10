# 🚀 Automated Deployment Guide

This repository is configured for automatic CI/CD deployment to Netlify. Every time you push code, your Storybook documentation will be automatically built and deployed.

## 🔧 Setup Requirements

### 1. Netlify Configuration
1. Go to [netlify.com](https://netlify.com) and create an account
2. Connect your Git repository
3. Get your site credentials:
   - **Site ID**: Found in Site settings → General → Site details
   - **Auth Token**: User settings → Applications → Personal access tokens

### 2. GitHub Secrets (Required for GitHub Actions)
Add these secrets to your GitHub repository:
- Go to **Settings** → **Secrets and variables** → **Actions**
- Add the following secrets:
  - `NETLIFY_SITE_ID`: Your Netlify site ID
  - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token

## 🔄 Automatic Deployment Process

### What Happens When You Push Code:

1. **Trigger**: Push to `main` or `master` branch
2. **Build**: GitHub Actions runs `npm run build-storybook`
3. **Deploy**: Built files are automatically deployed to Netlify
4. **Notification**: Deployment status appears in your commits

### Build Process:
```bash
npm ci                    # Clean install dependencies
npm run build-storybook   # Build Storybook documentation
# Deploy to Netlify automatically
```

## 📁 File Structure

```
├── .github/workflows/
│   ├── netlify-deploy.yml    # Primary deployment workflow
│   └── netlify-build.yml     # Alternative build workflow
├── storybook-static/         # Generated build output (ignored by git)
├── netlify.toml             # Netlify configuration
└── .gitignore               # Excludes build outputs
```

## 🛠️ Configuration Files

### `netlify.toml`
- **Build command**: `npm run build-storybook`
- **Publish directory**: `storybook-static`
- **Node.js version**: 18
- **Security headers** and caching optimization

### `.github/workflows/netlify-deploy.yml`
- Triggers on push to main/master
- Builds and deploys automatically
- Supports pull request previews

## 🔍 Monitoring Deployments

### GitHub Actions
- Go to **Actions** tab in your repository
- View build logs and deployment status
- See any errors or warnings

### Netlify Dashboard
- View deployment history
- Monitor build times
- Access deployment logs

## 🚨 Troubleshooting

### Build Failures
1. Check GitHub Actions logs
2. Verify `package.json` scripts work locally
3. Ensure all dependencies are in `package.json`

### Deployment Issues
1. Verify Netlify secrets are set correctly
2. Check Netlify site settings
3. Review netlify.toml configuration

### Local Testing
```bash
# Test the build locally
npm run build-storybook

# Verify output directory
ls -la storybook-static/
```

## 📝 Manual Deployment (Fallback)

If automatic deployment fails, you can deploy manually:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
npm run build-storybook
netlify deploy --prod --dir=storybook-static
```

## 🔄 Workflow Options

### Option 1: Direct Netlify Integration
- Connect repository directly in Netlify dashboard
- Uses `netlify.toml` configuration
- Simpler setup, fewer moving parts

### Option 2: GitHub Actions + Netlify
- Uses GitHub Actions workflows
- More control over build process
- Better for complex build requirements

## 🎯 Next Steps

1. **Push your code** to trigger the first deployment
2. **Monitor the build** in GitHub Actions
3. **Visit your deployed site** at the Netlify URL
4. **Set up custom domain** (optional) in Netlify settings

Your Storybook documentation will be automatically updated every time you push changes to your design system components!
