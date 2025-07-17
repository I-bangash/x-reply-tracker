# Contributing to X Reply Target Tracker

Thank you for your interest in contributing! This document provides guidelines for contributing to the X Reply Target Tracker project.

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## 🚀 Getting Started

### Prerequisites
- Chrome browser (88+)
- Basic knowledge of JavaScript, HTML, and CSS
- Understanding of Chrome Extension development (helpful but not required)

### Setting up the Development Environment

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/x-reply-tracker.git
   cd x-reply-tracker
   ```

2. **Load the extension in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the project folder

3. **Make changes and test**
   - Edit the code
   - Click the refresh button on the extension in `chrome://extensions/`
   - Test your changes on X.com

## 📋 How to Contribute

### Reporting Bugs
Before creating a bug report, please check if the issue already exists. If not, create a new issue with:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Chrome version and OS**
- **Extension version**
- **Screenshots if applicable**

### Suggesting Features
Feature requests are welcome! Please:

- **Check existing issues** first
- **Explain the use case** and why it's valuable
- **Provide detailed description** of the proposed feature
- **Consider privacy implications** (we're privacy-first)

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Ensure privacy principles are maintained

3. **Test thoroughly**
   - Test on X.com with various scenarios
   - Verify the extension doesn't break existing functionality
   - Check that data remains local

4. **Commit with clear messages**
   ```bash
   git commit -m "Add feature: clear description of what was added"
   ```

5. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style Guidelines

### JavaScript
- Use modern ES6+ syntax
- Prefer `const` and `let` over `var`
- Use meaningful variable names
- Add comments for complex logic
- Handle errors gracefully

### HTML/CSS
- Use semantic HTML
- Follow existing styling patterns
- Maintain dark theme consistency
- Ensure accessibility

### Extension-Specific
- Always handle Chrome API errors
- Use appropriate permissions only
- Maintain Manifest V3 compliance
- Never compromise user privacy

## 🔒 Privacy Guidelines

**NEVER compromise user privacy. All contributions must:**

- Keep data local to the user's device
- Not send data to external servers
- Not track user behavior beyond reply counting
- Not access unnecessary permissions
- Not read tweet content or personal information

## 🧪 Testing

### Manual Testing Checklist
- [ ] Extension loads without errors
- [ ] Reply tracking works on X.com
- [ ] Target setting and progress display work
- [ ] Overlay toggle functions properly
- [ ] Data persists between sessions
- [ ] Extension doesn't interfere with X.com functionality

### Edge Cases to Test
- [ ] Very high target numbers
- [ ] Rapid reply posting
- [ ] Page navigation and reloads
- [ ] Extension disable/enable
- [ ] Multiple X.com tabs

## 📁 Project Structure

```
x-reply-tracker/
├── manifest.json     # Extension configuration
├── popup.html       # Main UI
├── popup.js         # UI logic
├── content.js       # X.com interaction
├── background.js    # Service worker
└── icons/          # Extension icons
```

### Key Files
- **manifest.json**: Extension permissions and configuration
- **content.js**: Detects reply button clicks on X.com
- **popup.js**: Handles UI interactions and data display
- **background.js**: Manages extension lifecycle and data cleanup

## 🎯 Areas for Contribution

### High Priority
- Bug fixes and stability improvements
- Better reply button detection
- Performance optimizations
- UI/UX enhancements

### Medium Priority
- New features (weekly/monthly targets)
- Additional customization options
- Better error handling
- Code documentation

### Low Priority
- Firefox support
- Advanced analytics (privacy-compliant)
- Export functionality
- Theme customization

## 🚫 What We Won't Accept

- Features that compromise privacy
- Excessive permissions requests
- External API integrations
- Data collection mechanisms
- Ads or monetization features
- Bloated dependencies

## 📞 Getting Help

- **General questions**: Open a GitHub Discussion
- **Bug reports**: Create an issue with the bug template
- **Feature requests**: Create an issue with the feature template
- **Code questions**: Comment on relevant pull requests

## 🏆 Recognition

Contributors will be recognized in:
- README.md acknowledgments
- Release notes
- GitHub contributor list

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for helping make X Reply Target Tracker better for everyone!**