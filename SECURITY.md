# Security Policy

## Privacy-First Design

This Chrome extension is built with privacy as the fundamental principle. We are committed to protecting user privacy and maintaining transparent security practices.

## Data Collection and Storage

### What We DON'T Collect

- ❌ Tweet content or text
- ❌ Personal information (usernames, emails, etc.)
- ❌ Browsing history outside of X.com
- ❌ Social connections or follower data
- ❌ Location data
- ❌ Device information beyond basic Chrome extension APIs

### What We DO Store (Locally Only)

- ✅ Reply count for the current day
- ✅ Your daily target setting
- ✅ Extension preferences (overlay toggle state)
- ✅ Historical reply counts (last 7 days only)

### Data Storage Location

- **Local Device Only**: All data is stored using Chrome's `storage.sync` API
- **Chrome Sync**: Data syncs across your Chrome browsers (same as bookmarks)
- **No External Servers**: No data is ever sent to external servers
- **Automatic Cleanup**: Data older than 7 days is automatically deleted

## Security Measures

### Extension Permissions

- `activeTab`: Only to interact with X.com when you're actively using it
- `storage`: Only to save your targets and progress locally
- `scripting`: Only to inject the overlay interface on X.com

### Code Security

- **Manifest V3**: Uses the latest, most secure Chrome extension standard
- **Content Security Policy**: Strict CSP prevents code injection
- **No External Dependencies**: No third-party libraries or CDNs
- **Open Source**: Full code transparency for security review

## Reporting Security Issues

If you discover a security vulnerability or privacy concern:

1. **DO NOT** create a public GitHub issue
2. **Email**: [Insert your email or create a security contact]
3. **Include**: Detailed description of the issue
4. **Response**: We'll respond within 48 hours

## Supported Versions

| Version | Supported |
| ------- | --------- |
| 1.0.x   | ✅ Yes    |

## Security Best Practices for Users

### Installation

- Only install from trusted sources (GitHub releases or Chrome Web Store)
- Review permissions before installing
- Keep the extension updated

### Usage

- The extension only works on X.com/Twitter.com
- No additional setup or accounts required
- Data remains on your device

### Verification

- Check Chrome's extension page for active permissions
- Review the open-source code on GitHub
- Monitor Chrome's developer console for any unexpected network activity

## Privacy Compliance

This extension is designed to comply with:

- **GDPR**: No personal data collection
- **CCPA**: No data selling or sharing
- **Chrome Web Store Policies**: Minimal permissions, clear privacy practices

## Audit History

- **2025-01-XX**: Initial security review completed
- **Future**: Regular security audits planned

## Contact

For security concerns or questions about privacy:

- **GitHub Issues**: For non-sensitive questions
- **Email**: [Insert security contact email]

---

**This extension will never compromise your privacy. If you have any concerns, please reach out immediately.**
