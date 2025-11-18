# Contributing

Thanks for your interest in contributing to DevToolbox.

## Getting Started

1. Fork the repo
2. Clone it: `git clone https://github.com/YOUR_USERNAME/devtoolbox.git`
3. Create a branch: `git checkout -b my-feature`
4. Make your changes
5. Test: `node bin/devkit.js <command>`
6. Commit: `git commit -m 'Add feature'`
7. Push: `git push origin my-feature`
8. Open a PR

## Adding a Command

Create a file in `src/commands/your-command.js`:

```javascript
const logger = require('../utils/logger');

function yourCommand(arg) {
  // your logic here
  console.log(arg);
  logger.success('Done');
}

module.exports = yourCommand;
```

Add it to `bin/devkit.js`:

```javascript
const yourCommand = require('../src/commands/your-command');

program
  .command('your-command <arg>')
  .description('What it does')
  .action((arg) => {
    yourCommand(arg);
  });
```

Update the README with an example.

## Code Style

- 2 spaces for indentation
- Use `const` and `let`
- Keep functions small
- Add comments where needed

## Testing

Test your command manually before submitting. If you can, test on different platforms (macOS, Linux, Windows).

## Commit Messages

- Use present tense: "Add feature" not "Added feature"
- Keep the first line under 72 characters
- Reference issues if applicable: "Fix #123"

## Questions?

Open an issue or reach out on [Twitter](https://twitter.com/codavidgarcia).
