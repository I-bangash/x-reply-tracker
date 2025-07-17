# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release preparation

## [1.0.0] - 2025-01-XX

### Added
- Daily reply target setting
- Real-time reply tracking on X.com
- Progress visualization with progress bar
- Persistent overlay option for always-visible tracking
- Privacy-first design with local data storage only
- Automatic data cleanup (7-day retention)
- Clean, dark theme UI matching X.com design
- Chrome Manifest V3 compatibility

### Security
- All data stored locally on user's device
- No external API calls or data transmission
- No tracking or analytics
- Minimal permissions requested

### Technical
- Vanilla JavaScript implementation
- Chrome Storage API for local data persistence
- Content script injection for X.com interaction
- Service worker for background tasks