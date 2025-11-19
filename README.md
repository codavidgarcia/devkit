# DevToolbox

Local development toolkit with cohesive CLI tools that work together.

[![npm version](https://img.shields.io/npm/v/@codavidgarcia/devtoolbox.svg)](https://www.npmjs.com/package/@codavidgarcia/devtoolbox)
[![npm downloads](https://img.shields.io/npm/dm/@codavidgarcia/devtoolbox.svg)](https://www.npmjs.com/package/@codavidgarcia/devtoolbox)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What makes this different?

The commands talk to each other. When `doctor` finds a blocked port, it suggests `kill-port`. When you kill a port frequently, it tracks it and shows suggestions. This isn't just a collection of tools - it's an integrated system.

## Installation

```bash
npm install -g @codavidgarcia/devtoolbox
```

## Commands

### Environment & Ports
- `doctor` - Check your dev environment and detect blocked ports
- `ports` - List all active ports (tracks frequently used ones)
- `kill-port <port>` - Kill process on port (learns from usage)

### Network
- `online` - Check internet connectivity  
- `ip` - Show local and public IP

### Security & Encoding
- `jwt <token>` - Decode JWT tokens (offline)
- `hash <text>` - Generate hashes
- `encode/decode <text>` - Base64 encoding

### Project Setup
- `gitignore <templates>` - Generate .gitignore files

## How they work together

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

## Examples

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
