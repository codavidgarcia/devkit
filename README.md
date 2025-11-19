# DevToolbox

Local development toolkit - 11 CLI tools you actually need, working together.

[![npm version](https://img.shields.io/npm/v/@codavidgarcia/devtoolbox.svg)](https://www.npmjs.com/package/@codavidgarcia/devtoolbox)
[![npm downloads](https://img.shields.io/npm/dm/@codavidgarcia/devtoolbox.svg)](https://www.npmjs.com/package/@codavidgarcia/devtoolbox)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Installation

```bash
npm install -g @codavidgarcia/devtoolbox
```

## What's included

**Project Setup**
- `init` - Auto-setup projects (detects type, generates .gitignore, checks env, frees ports)

**Environment & Ports**
- `doctor` - Check Node, npm, Git, internet, and detect blocked ports
- `ports` - List all active ports
- `kill-port <port>` - Kill process on any port

**Network**
- `online` - Check internet connectivity (gateway, DNS, HTTP)
- `ip` - Show local and public IP addresses

**Security & Encoding**
- `jwt <token>` - Decode JWT tokens (works offline)
- `hash <text>` - Generate hashes (md5, sha1, sha256, sha512)
- `encode/decode <text>` - Base64 encoding

**Project Files**
- `gitignore <templates>` - Generate .gitignore from templates

## What makes this different

The commands talk to each other and learn from your usage:

```bash
# doctor detects issues and suggests fixes
$ devtoolbox doctor
✗ Port 3000 in use (node)
→ Run 'devtoolbox kill-port 3000' to fix

# kill-port learns from frequent usage
$ devtoolbox kill-port 3000
✓ Killed node (PID 1234) on port 3000
Tip: Port 3000 is frequently blocked
  → Run 'devtoolbox ports' to see all active ports

# ports shows which ones you use often
$ devtoolbox ports
Active Ports:
  3000  node     PID 1234  [COMMON]
  8080  nginx    PID 5678

[COMMON] = Frequently used in your projects
```

They share context (~/.devtoolbox/context.json) to remember patterns and suggest next steps.

## Examples

Setup a new project:
```bash
devtoolbox init
# Detects project type, generates .gitignore, checks env, frees ports
```

Check your environment:
```bash
devtoolbox doctor
```

See all active ports:
```bash
devtoolbox ports
devtoolbox ports --common  # only common dev ports
```

Kill a process:
```bash
devtoolbox kill-port 3000
```

Decode a JWT:
```bash
devtoolbox jwt eyJhbGc...
```

Generate .gitignore:
```bash
devtoolbox gitignore node macos
```

Check connectivity:
```bash
devtoolbox online
```

## Why?

I kept installing separate tools for these tasks. This bundles them and makes them work together through shared context (~/.devtoolbox/context.json).

## Contributing

Pull requests welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
