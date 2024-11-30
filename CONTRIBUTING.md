# Contributing to Zodiax TCG Card Creator

First off, thank you for considering contributing to the Zodiax TCG Card Creator! It's people like you that make this tool amazing for the TCG community.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Development Process](#development-process)
- [Setting Up Development Environment](#setting-up-development-environment)
- [Making Changes](#making-changes)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)
- [Community](#community)

## 🤝 Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 🔄 Development Process

We follow a streamlined development process:

1. **Fork & Clone**
   - Fork the repository
   - Clone your fork locally
   - Add the original repository as a remote named 'upstream'

2. **Branch**
   - Create a branch for your feature/fix
   - Use descriptive branch names (e.g., `feature/add-effect-system`, `fix/layer-rendering`)

3. **Develop**
   - Write code following our style guidelines
   - Add tests for new features
   - Update documentation as needed

4. **Test**
   - Run existing tests
   - Add new tests for your changes
   - Ensure all tests pass

5. **Submit**
   - Push your changes
   - Create a Pull Request
   - Respond to review feedback

## 🛠️ Setting Up Development Environment

### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git
- A code editor (we recommend VS Code)

### Setup Steps
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/cardcreator.git

# Navigate to project
cd cardcreator

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/cardcreator.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### VS Code Extensions
We recommend these extensions:
- ESLint
- Prettier
- React Developer Tools
- Redux DevTools

## 📝 Making Changes

### Coding Standards
- Use ES6+ features
- Follow React best practices
- Maintain component modularity
- Write meaningful comments
- Use TypeScript types/PropTypes

### Commit Messages
Follow conventional commits:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

### Testing
- Write unit tests for new features
- Update existing tests as needed
- Ensure all tests pass before submitting

## 🚀 Submitting Changes

1. **Update Your Fork**
```bash
git fetch upstream
git rebase upstream/master
```

2. **Push Changes**
```bash
git push origin your-feature-branch
```

3. **Create Pull Request**
- Use a clear, descriptive title
- Reference any related issues
- Provide detailed description
- Include screenshots if relevant

## 📐 Style Guidelines

### JavaScript/React
- Use functional components
- Implement proper prop validation
- Follow React Hooks best practices
- Maintain clean component structure

### CSS
- Use CSS modules or styled-components
- Follow BEM naming convention
- Maintain responsive design
- Use CSS variables for theming

### Component Structure
```jsx
// ComponentName.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './ComponentName.css';

const ComponentName = ({ prop1, prop2 }) => {
  // Component logic
  return (
    <div className="component-name">
      {/* Component content */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default ComponentName;
```

## 👥 Community

### Getting Help
- Check existing issues
- Join our Discord server
- Read the documentation
- Ask in community forums

### Communication Channels
- GitHub Issues: Bug reports & feature requests
- Discord: Real-time discussion
- Wiki: Documentation & guides
- Email: Private inquiries

## 🎮 Testing Cards

When testing card creation:
1. Test all card types
2. Verify template rendering
3. Check effect system
4. Validate export functionality
5. Test responsive design

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `question`: Further information needed

## 📦 Release Process

1. Version bump
2. Update CHANGELOG
3. Create release notes
4. Tag release
5. Deploy to production

Thank you for contributing to Zodiax TCG Card Creator! 🎉
