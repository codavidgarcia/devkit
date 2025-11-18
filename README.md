# 🛠️ DevToolbox

> **All-in-one developer utility suite** - 9 essential CLI tools to boost your productivity

[![npm version](https://img.shields.io/npm/v/@codavidgarcia/devtoolbox.svg)](https://www.npmjs.com/package/@codavidgarcia/devtoolbox)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

Stop installing separate tools for common tasks. DevToolbox bundles 9 essential developer utilities into a single, lightweight CLI.

## ⚡ Quick Start

```bash
# Install globally
npm install -g @codavidgarcia/devtoolbox

# Or use with npx (no install needed)
npx @codavidgarcia/devtoolbox <command>
```

## 📦 What's Inside

| Command | Description | Example |
|---------|-------------|---------|
| `kill-port` | Kill process on port | `devtoolbox kill-port 3000` |
| `jwt` | Decode JWT (offline) | `devtoolbox jwt <token>` |
| `gitignore` | Generate .gitignore | `devtoolbox gitignore node macos` |
| `online` | Check connectivity | `devtoolbox online` |
| `convert` | JSON ↔ YAML | `devtoolbox convert config.json` |
| `uuid` | Generate UUID v4 | `devtoolbox uuid` |
| `hash` | Hash text | `devtoolbox hash "text" -a sha256` |
| `encode/decode` | Base64 encode/decode | `devtoolbox encode "hello"` |
| `timestamp` | Unix timestamp utils | `devtoolbox timestamp 1234567890` |

## 📖 Detailed Usage

### 🔪 Kill Port

Kill the process running on a specific port. Works cross-platform (macOS, Linux, Windows).

```bash
devtoolbox kill-port 3000
# ✓ Killed process 12345 on port 3000

# Alias
devtoolbox kp 8080
```

**Why?** No more "Error: listen EADDRINUSE" frustration.

---

### 🔐 JWT Decoder

Decode JWT tokens **completely offline** - no data leaves your machine.

```bash
devtoolbox jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

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
#   Date: 2025-12-31T12:00:00.000Z
#   Status: VALID
#   Time left: 1440 minutes
```

**Features:**
- 100% offline (privacy-first)
- Handles URL-safe base64
- Shows expiration status
- Calculates time remaining

---

### 📄 Gitignore Generator

Generate .gitignore files from templates instantly.

```bash
# Single template
devtoolbox gitignore node

# Multiple templates
devtoolbox gitignore node macos visualstudiocode python

# Output to stdout
devtoolbox gitignore python --stdout

# Alias
devtoolbox gi node
```

**Why?** Never forget platform-specific ignores again.

---

### 🌐 Connectivity Check

Diagnose network issues with multi-layer diagnostics.

```bash
devtoolbox online

# Output:
# 🌐 Connectivity Diagnostics
#
# ✓ Gateway reachable
# ✓ DNS (8.8.8.8) reachable
# ✓ Internet (HTTP) working
#
# 📊 Summary:
# ✓ You are online! All systems operational.
```

**Checks:**
- Default gateway
- DNS (8.8.8.8)
- HTTP connectivity

---

### 🔄 JSON/YAML Converter

Convert between JSON and YAML with automatic format detection.

```bash
# Convert file
devtoolbox convert config.json

# From stdin (pipe-friendly)
cat config.json | devtoolbox convert

# Works both ways (auto-detects)
devtoolbox convert config.yaml
```

**Why?** Essential for DevOps and config management.

---

### 🆔 UUID Generator

Generate random UUIDs (v4) instantly.

```bash
devtoolbox uuid
# 5d51879f-7e41-480d-bf68-7f3036b92614
```

**Use cases:** Test data, unique IDs, database seeds

---

### #️⃣ Hash Generator

Generate cryptographic hashes with multiple algorithms.

```bash
# Default (SHA-256)
devtoolbox hash "hello world"

# Specify algorithm
devtoolbox hash "secret" -a md5
devtoolbox hash "password" -a sha512

# Supported: md5, sha1, sha256, sha512
```

**Use cases:** Checksums, password verification, data integrity

---

### 🔤 Base64 Encode/Decode

Encode and decode base64 strings.

```bash
# Encode
devtoolbox encode "hello world"
# aGVsbG8gd29ybGQ=

# Decode
devtoolbox decode "aGVsbG8gd29ybGQ="
# hello world
```

**Use cases:** API tokens, data encoding, debugging

---

### ⏰ Timestamp Utilities

Work with Unix timestamps effortlessly.

```bash
# Get current timestamp
devtoolbox timestamp
# ⏰ Current Time:
#   Unix (ms):    1763507733657
#   Unix (s):     1763507733
#   ISO 8601:     2025-11-18T23:15:33.657Z
#   Local:        11/18/2025, 6:15:33 PM

# Convert timestamp to readable format
devtoolbox timestamp 1234567890
# ⏰ Timestamp Conversion:
#   Input:        1234567890 (seconds)
#   ISO 8601:     2009-02-13T23:31:30.000Z
#   Local:        2/13/2009, 6:31:30 PM
#   Relative:     15 years ago

# Alias
devtoolbox ts
```

**Features:**
- Auto-detects seconds vs milliseconds
- Shows relative time ("5 minutes ago")
- Multiple output formats

---

## 🎯 Why DevToolbox?

| Problem | DevToolbox Solution |
|---------|---------------------|
| Port already in use | `devtoolbox kill-port 3000` |
| Need to inspect JWT | `devtoolbox jwt <token>` (offline!) |
| Starting new project | `devtoolbox gitignore node macos` |
| "Is my internet down?" | `devtoolbox online` |
| Converting config files | `devtoolbox convert config.json` |
| Need a UUID | `devtoolbox uuid` |
| Hash a string | `devtoolbox hash "text"` |
| Encode/decode base64 | `devtoolbox encode "text"` |
| Work with timestamps | `devtoolbox timestamp` |

**One tool. Nine solutions. Zero context switching.**

## 🚀 Features

- ✅ **Cross-platform** - Works on macOS, Linux, and Windows
- ✅ **Lightweight** - Only 4 dependencies
- ✅ **Fast** - Instant execution, no startup lag
- ✅ **Privacy-first** - JWT decoder works 100% offline
- ✅ **Pipe-friendly** - Supports stdin/stdout for Unix workflows
- ✅ **Colorful output** - Easy-to-read results
- ✅ **Aliases** - Short commands for speed (`kp`, `gi`, `ts`)

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest new utilities
- 🔧 Submit pull requests

## 📄 License

MIT © Juan David Garcia

## ⭐ Star this repo!

If DevToolbox saves you time, give it a star on [GitHub](https://github.com/juandavidgarcia/devtoolbox)!

---

**Made with ❤️ for developers who value their time**
