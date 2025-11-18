const chalk = require('chalk');

const logger = {
  success: (message) => console.log(chalk.green('✓'), message),
  error: (message) => console.log(chalk.red('✗'), message),
  info: (message) => console.log(chalk.blue('ℹ'), message),
  warning: (message) => console.log(chalk.yellow('⚠'), message),
  log: (message) => console.log(message),
};

module.exports = logger;
