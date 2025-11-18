# Contributing to DevToolbox

First off, thank you for considering contributing to DevToolbox! 🎉

It's people like you that make DevToolbox such a great tool for the developer community.

## 🚀 Quick Start

1. Fork the repo
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/devtoolbox.git`
3. Create a branch: `git checkout -b feature/amazing-feature`
4. Make your changes
5. Test locally: `node bin/devkit.js <your-command>`
6. Commit: `git commit -m 'Add amazing feature'`
7. Push: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 💡 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** - Describe the problem
- **Steps to reproduce** - How can we see the bug?
- **Expected behavior** - What should happen?
- **Actual behavior** - What actually happens?
- **Environment** - OS, Node version, DevToolbox version

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing suggestions** first
- **Explain the use case** - Why is this useful?
- **Describe the solution** - How should it work?
- **Consider alternatives** - Are there other ways to solve this?

### Good First Issues

New to the project? Look for issues labeled [`good first issue`](https://github.com/juandavidgarcia/devtoolbox/labels/good%20first%20issue).

## 🛠️ Development Setup

```bash
# Clone the repo
git clone https://github.com/juandavidgarcia/devtoolbox.git
cd devtoolbox

# Install dependencies
npm install

# Test a command
node bin/devkit.js <command>

# Link globally for testing
npm link
devtoolbox <command>
```

## 📝 Adding a New Command

1. Create a new file in `src/commands/your-command.js`
2. Implement your command function
3. Add it to `bin/devkit.js`:
   ```javascript
   const yourCommand = require('../src/commands/your-command');
   
   program
     .command('your-command <arg>')
     .description('What it does')
     .action((arg) => {
       yourCommand(arg);
     });
   ```
4. Update README.md with examples
5. Test thoroughly

## ✅ Code Style

- Use 2 spaces for indentation
- Use `const` and `let`, not `var`
- Add comments for complex logic
- Keep functions small and focused
- Use descriptive variable names

## 🧪 Testing

Before submitting a PR:

- Test your command manually
- Test on different platforms if possible (macOS, Linux, Windows)
- Ensure no breaking changes to existing commands

## 📄 Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues: `Fix #123`

## 🎯 Pull Request Process

1. Update README.md with details of changes
2. Update package.json version if needed
3. The PR will be merged once reviewed and approved

## 💬 Questions?

Feel free to open an issue with your question or reach out on [Twitter](https://twitter.com/codavidgarcia).

## 📜 Code of Conduct

Be respectful, inclusive, and professional. We're all here to build something great together.

---

**Thank you for contributing!** 🙏
