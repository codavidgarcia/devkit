# 🛠️ DevToolbox

> **The Swiss Army Knife for Developers** - 14 essential CLI tools in one lightweight package

[![npm version](https://img.shields.io/npm/v/@codavidgarcia/devtoolbox.svg)](https://www.npmjs.com/package/@codavidgarcia/devtoolbox)
[![npm downloads](https://img.shields.io/npm/dm/@codavidgarcia/devtoolbox.svg)](https://www.npmjs.com/package/@codavidgarcia/devtoolbox)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

**Stop installing 14 different tools.** DevToolbox bundles everything you need into a single, blazing-fast CLI.

## ⚡ Quick Start

```bash
# Install globally
npm install -g @codavidgarcia/devtoolbox

# Or use instantly with npx (no install needed!)
npx @codavidgarcia/devtoolbox <command>
```

## 🎯 Why DevToolbox?

| Your Problem | DevToolbox Solution | Time Saved |
|--------------|---------------------|------------|
| "Port 3000 is already in use" | `devtoolbox kill-port 3000` | 30 seconds |
| Need to inspect a JWT | `devtoolbox jwt <token>` (100% offline!) | 2 minutes |
| Starting a new project | `devtoolbox gitignore node macos` | 5 minutes |
| "Is my internet down?" | `devtoolbox online` | 1 minute |
| Converting config files | `devtoolbox convert config.json` | 2 minutes |
| Need a UUID for testing | `devtoolbox uuid` | 10 seconds |
| Hash a password | `devtoolbox hash "secret"` | 20 seconds |
| Encode/decode base64 | `devtoolbox encode "text"` | 15 seconds |
| Check timestamps | `devtoolbox timestamp 1234567890` | 30 seconds |
| What's my IP? | `devtoolbox ip` | 10 seconds |
| Need placeholder text | `devtoolbox lorem 100` | 20 seconds |
| Preview a color | `devtoolbox color ff5733` | 15 seconds |
| Generate QR code | `devtoolbox qr "https://example.com"` | 30 seconds |
| Environment issues? | `devtoolbox doctor` | 1 minute |

**Total time saved per day:** ~15 minutes  
**Total time saved per year:** ~91 hours

## 📦 All 14 Tools

### 🔥 Process Management
- **`kill-port <port>`** - Kill process on any port (cross-platform)

### � Security & Encoding
- **`jwt <token>`** - Decode JWT tokens (100% offline, privacy-first)
- **`hash <text>`** - Generate cryptographic hashes (md5, sha1, sha256, sha512)
- **`encode <text>`** - Encode to base64
- **`decode <text>`** - Decode from base64

### � File Generation
- **`gitignore <templates...>`** - Generate .gitignore from templates

### 🌐 Network Tools
- **`online`** - Multi-layer connectivity diagnostics
- **`ip`** - Show local and public IP addresses

### 🔄 Data Conversion
- **`convert [file]`** - JSON ↔ YAML converter (auto-detects format)

### 🆔 Generators
- **`uuid`** - Generate UUID v4
- **`lorem [words]`** - Lorem ipsum placeholder text
- **`qr <text>`** - QR code generator (in terminal!)
- **`color <hex>`** - Preview hex colors with RGB/HSL conversion

### ⏰ Time Utilities
- **`timestamp [value]`** - Unix timestamp tools with relative time

### 🏥 Diagnostics
- **`doctor`** - Check development environment health

## 🚀 Detailed Examples

### Kill Port (Save 30 seconds every time)
```bash
devtoolbox kill-port 3000
# ✓ Killed process 12345 on port 3000

# Short alias
devtoolbox kp 8080
```

### JWT Decoder (Privacy-First, 100% Offline)
```bash
devtoolbox jwt eyJhbGc...

# Output:
# 📋 JWT Header:
# {
#   "alg": "HS256",
#   "typ": "JWT"
# }
# 
# 📦 JWT Payload:
# {
#   "sub": "1234567890",
#   "name": "John Doe",
#   "exp": 1735689600
# }
#
# ⏰ Expiration:
#   Status: VALID ✓
#   Time left: 1440 minutes
```

### Environment Doctor (Debug in Seconds)
```bash
devtoolbox doctor

# 🏥 DevToolbox Doctor - Environment Health Check
#
# ✓ Node.js         v20.10.0
# ✓ npm             v10.2.3
# ✓ Git             git version 2.42.0
# ✓ Internet        Connected
# ✓ Disk Space      15% used
#
# 📊 Summary:
# ✓ All systems operational!
```

### Color Preview (See Before You Code)
```bash
devtoolbox color ff5733

# � Color Preview:
# ████████████████████████████████
# ████████████████████████████████
# ████████████████████████████████
#
# HEX:  #FF5733
# RGB:  rgb(255, 87, 51)
# HSL:  hsl(11, 100%, 60%)
```

### QR Code Generator (Share Instantly)
```bash
devtoolbox qr "https://github.com/juandavidgarcia/devtoolbox"

# Generates QR code in your terminal!
# Perfect for sharing URLs with mobile devices
```

### More Examples
```bash
# Generate .gitignore for multiple platforms
devtoolbox gitignore node python macos visualstudiocode

# Check connectivity layers
devtoolbox online

# Convert JSON to YAML (auto-detects)
devtoolbox convert config.json

# Generate UUID
devtoolbox uuid
# 5d51879f-7e41-480d-bf68-7f3036b92614

# Hash with different algorithms
devtoolbox hash "password" -a sha512

# Generate 100 words of lorem ipsum
devtoolbox lorem 100

# Show IP addresses
devtoolbox ip
# Local IP:  192.168.1.100
# Public IP: 203.0.113.42

# Work with timestamps
devtoolbox timestamp 1234567890
# ISO 8601:     2009-02-13T23:31:30.000Z
# Relative:     15 years ago
```

## 🆚 DevToolbox vs Alternatives

| Feature | DevToolbox | Individual Tools | Online Tools |
|---------|-----------|------------------|--------------|
| **Installation** | One command | 14+ installs | N/A |
| **Privacy** | 100% offline | Varies | ❌ Data sent to servers |
| **Speed** | Instant | Varies | Depends on internet |
| **Maintenance** | Single update | 14+ updates | N/A |
| **Offline** | ✅ Works anywhere | Varies | ❌ Requires internet |
| **Cross-platform** | ✅ Mac/Linux/Windows | Varies | ✅ |
| **Package size** | 8.6 kB | 100+ MB total | N/A |

## ✨ Features

- ✅ **Cross-platform** - Works on macOS, Linux, and Windows
- ✅ **Lightweight** - Only 8.6 kB (5 dependencies)
- ✅ **Blazing fast** - Instant execution, zero startup lag
- ✅ **Privacy-first** - JWT decoder and other tools work 100% offline
- ✅ **Pipe-friendly** - Supports stdin/stdout for Unix workflows
- ✅ **Beautiful output** - Colorful, easy-to-read results
- ✅ **Smart aliases** - Short commands for speed (`kp`, `gi`, `ts`)
- ✅ **Auto-detection** - JSON/YAML converter detects format automatically
- ✅ **No telemetry** - Your data stays on your machine

## 🎓 Use Cases

### For Frontend Developers
- Kill dev servers on occupied ports
- Generate .gitignore for React/Vue/Angular projects
- Preview colors from design systems
- Generate UUIDs for component keys
- Create QR codes for testing mobile apps

### For Backend Developers
- Decode JWTs from API responses
- Hash passwords for testing
- Convert between JSON and YAML configs
- Check environment health before deployment
- Generate test data with lorem ipsum

### For DevOps Engineers
- Diagnose connectivity issues
- Check public/private IPs
- Convert Kubernetes/Docker configs
- Verify environment setup with doctor command
- Generate base64 encoded secrets

### For Everyone
- Save time on repetitive tasks
- Reduce context switching
- Work offline without limitations
- Keep your data private

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

- 🐛 **Report bugs** - Open an issue
- 💡 **Suggest features** - We love new ideas!
- 🔧 **Submit PRs** - Check out [good first issues](https://github.com/juandavidgarcia/devtoolbox/labels/good%20first%20issue)
- ⭐ **Star the repo** - Show your support!

## 📄 License

MIT © Juan David Garcia

## ⭐ Star This Repo!

If DevToolbox saves you time, **give it a star on [GitHub](https://github.com/juandavidgarcia/devtoolbox)**!

Every star helps other developers discover this tool. 🚀

---

**Made with ❤️ for developers who value their time**

[Report Bug](https://github.com/juandavidgarcia/devtoolbox/issues) · [Request Feature](https://github.com/juandavidgarcia/devtoolbox/issues) · [Twitter](https://twitter.com/codavidgarcia)
