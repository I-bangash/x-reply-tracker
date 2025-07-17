# X Reply Target Tracker

A privacy-focused Chrome extension that helps you track and achieve your daily reply targets on X.com (formerly Twitter). Set goals, monitor progress, and stay motivated - all while keeping your data completely private.

## 🎯 Features

- **Daily Target Setting**: Set your desired number of replies per day
- **Real-time Progress Tracking**: Automatically detects when you post replies
- **Visual Progress Bar**: Clean, minimal interface showing your progress
- **Persistent Overlay**: Optional always-visible tracker on X.com
- **Privacy First**: No data collected or sent to any 3rd party. Nothing leaves your device
- **Clean UI**: Dark theme matching X's design aesthetic

## 🔒 Privacy Guarantee

This extension is built with privacy as the top priority:

- ✅ **100% Local**: All data stored locally on your device
- ✅ **No External Servers**: Never communicates with outside services
- ✅ **No Data Collection**: Doesn't read tweet content or personal info
- ✅ **Open Source**: Full transparency - inspect the code yourself
- ✅ **No Analytics**: No tracking, no metrics, no data harvesting
- ✅ **Chrome Sync Only**: Uses Chrome's built-in sync (like bookmarks)

## 🚀 Installation

### Option 1: Manual Installation (Recommended)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the extension folder => "X-reply-tracker"
5. The extension will appear in your Chrome toolbar

### Option 2: Chrome Web Store

_Coming soon - pending review_

## 📁 File Structure

```
x-reply-tracker/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── content.js            # X.com page interaction
├── background.js         # Background service worker
├── icon16.png            # 16x16 icon
├── icon48.png            # 48x48 icon
├── icon128.png           # 128x128 icon
├── README.md             # This file
├── LICENSE               # MIT License
└── CONTRIBUTING.md       # Contribution guidelines
```

## 🎮 Usage

1. **Set a Target**: Click the extension icon and enter your daily reply goal
2. **Browse X.com**: Use X.com normally - the extension automatically tracks replies
3. **Monitor Progress**: Check your progress anytime via the extension popup
4. **Stay Motivated**: Optional overlay keeps your progress visible while browsing
5. **Toggle Overlay**: Use the "Keep popup active" toggle for persistent tracking

## 🛠️ Technical Details

### Technologies Used

- **Manifest V3**: Latest Chrome extension standard
- **Vanilla JavaScript**: No external dependencies
- **Chrome Storage API**: Local data storage
- **Content Script**: Page interaction ui

### Browser Compatibility

- Chrome 88+
- Chromium-based browsers (Edge, Brave, etc.)

### Permissions Required

- `activeTab`: To interact with X.com pages
- `storage`: To save your targets and progress locally
- `scripting`: To show the overlay interface

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Setup

```bash
# Clone the repo
git clone https://github.com/i-bangash/x-reply-tracker.git

# No build process needed - it's vanilla JavaScript!
# Just load the extension in Chrome developer mode
```

## 📋 Roadmap

Based on feedback we can add :

- [ ] Weekly/Monthly target options
- [ ] Export progress data
- [ ] Customizable themes
- [ ] Reply streak tracking
- [ ] Goal achievement notifications
- [ ] Firefox support

## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/i-bangash/x-reply-tracker/issues) with:

- Chrome version
- Extension version
- Steps to reproduce
- Expected vs actual behavior

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for the X.com community
- Inspired by productivity and goal-tracking tools

## 📞 Support

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and community support
- **Privacy Questions**: All answered in this README

## 👨‍💻 Author

**i-bangash** - [GitHub](https://github.com/i-bangash)

---

**Made with ❤️ for the X.com community**

_This extension is not affiliated with X Corp or Twitter, Inc._
