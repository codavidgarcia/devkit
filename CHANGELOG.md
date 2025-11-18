# Changelog

All notable changes to DevToolbox will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-18

### Added
- 🆕 `ip` command - Show local and public IP addresses
- 🆕 `lorem [words]` command - Generate lorem ipsum placeholder text
- 🆕 `color <hex>` command - Preview hex colors with RGB/HSL conversion
- 🆕 `qr <text>` command - Generate QR codes in terminal
- 🆕 `doctor` command - Check development environment health
- ✨ Added qrcode-terminal dependency for QR code generation

### Changed
- 📝 Updated README with all 14 commands
- 📝 Added comparison tables and use cases
- 📝 Added time savings calculations

## [1.0.0] - 2025-11-18

### Added
- 🎉 Initial release
- ⚡ `kill-port <port>` command - Kill process on port
- 🔐 `jwt <token>` command - Decode JWT tokens offline
- 📄 `gitignore <templates...>` command - Generate .gitignore files
- 🌐 `online` command - Check internet connectivity
- 🔄 `convert [file]` command - Convert JSON ↔ YAML
- 🆔 `uuid` command - Generate UUID v4
- #️⃣ `hash <text>` command - Generate cryptographic hashes
- 🔤 `encode/decode <text>` commands - Base64 encoding/decoding
- ⏰ `timestamp [value]` command - Unix timestamp utilities
- 🎨 Colorful terminal output with chalk
- ⚙️ Cross-platform support (macOS, Linux, Windows)
- 📦 Published to npm as @codavidgarcia/devtoolbox

[1.1.0]: https://github.com/juandavidgarcia/devtoolbox/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/juandavidgarcia/devtoolbox/releases/tag/v1.0.0
