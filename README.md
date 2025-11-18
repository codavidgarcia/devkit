# DevToolbox

A collection of 14 command-line utilities for developers. One install, multiple tools.

[![npm version](https://img.shields.io/npm/v/@codavidgarcia/devtoolbox.svg)](https://www.npmjs.com/package/@codavidgarcia/devtoolbox)
[![npm downloads](https://img.shields.io/npm/dm/@codavidgarcia/devtoolbox.svg)](https://www.npmjs.com/package/@codavidgarcia/devtoolbox)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install -g @codavidgarcia/devtoolbox

# or use with npx
npx @codavidgarcia/devtoolbox <command>
```

## Commands

### Process Management
- `kill-port <port>` - Kill process running on a port
- `doctor` - Check your development environment

### Security & Encoding  
- `jwt <token>` - Decode JWT tokens (works offline)
- `hash <text>` - Generate hashes (md5, sha1, sha256, sha512)
- `encode <text>` / `decode <text>` - Base64 encoding

### Network
- `online` - Check internet connectivity
- `ip` - Show your local and public IP

### File & Data
- `gitignore <templates...>` - Generate .gitignore files
- `convert [file]` - Convert between JSON and YAML

### Generators
- `uuid` - Generate a UUID
- `lorem [words]` - Generate lorem ipsum text
- `qr <text>` - Generate QR codes in your terminal
- `color <hex>` - Preview hex colors

### Time
- `timestamp [value]` - Work with Unix timestamps

## Examples

Kill a process on port 3000:
```bash
devtoolbox kill-port 3000
```

Decode a JWT (completely offline):
```bash
devtoolbox jwt eyJhbGc...
```

Generate a .gitignore for Node and macOS:
```bash
devtoolbox gitignore node macos
```

Check if you're online:
```bash
devtoolbox online
```

Convert JSON to YAML:
```bash
devtoolbox convert config.json
```

Generate a UUID:
```bash
devtoolbox uuid
```

Hash a string:
```bash
devtoolbox hash "my-password" -a sha256
```

Preview a color:
```bash
devtoolbox color ff5733
```

Generate a QR code:
```bash
devtoolbox qr "https://example.com"
```

Check your environment:
```bash
devtoolbox doctor
```

## Why?

I got tired of installing separate tools for common tasks. This bundles the ones I use most into a single package.

Some commands (like the JWT decoder) work completely offline, which is nice for privacy. The whole thing is about 14kB.

## Contributing

Pull requests welcome. If you want to add a command, check out the [contributing guide](CONTRIBUTING.md).

## License

MIT

---

Made by [@codavidgarcia](https://twitter.com/codavidgarcia)
