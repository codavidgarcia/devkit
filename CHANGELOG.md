# Changelog

## [2.1.0] - 2025-11-18

### Added
- `init` command for automated project setup
  - Auto-detects project type (Node.js, Python, Ruby, Go, Rust, Java)
  - Generates appropriate .gitignore
  - Checks environment health
  - Frees commonly blocked ports
- Global flags for all commands:
  - `--json` for JSON output (scriptable)
  - `--quiet` for silent mode (exit codes only)
  - `--verbose` for detailed output

### Changed
- Improved command consistency across toolkit

## [2.0.0] - 2025-11-18

### Breaking Changes
- Removed 6 commands: `uuid`, `lorem`, `color`, `qr`, `timestamp`, `convert`
- Focus shifted to cohesive local development tools

### Added
- `ports` command to list all active ports
- Context system (~/.devtoolbox/context.json) for shared state
- Cross-command integration:
  - `doctor` now detects blocked ports and suggests fixes
  - `kill-port` tracks frequently blocked ports
  - `ports` shows which ports you use often

### Changed
- `doctor` now checks common dev ports (3000, 8080, 5432)
- `kill-port` shows process names and gives suggestions
- All commands now share context and learn from usage

## [1.1.1] - 2025-11-18

### Changed
- Humanized all documentation
- Removed AI-generated language patterns

## [1.1.0] - 2025-11-18

### Added
- `ip`, `lorem`, `color`, `qr`, `doctor` commands

## [1.0.0] - 2025-11-18

Initial release with 9 commands.
