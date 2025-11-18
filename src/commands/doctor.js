const chalk = require('chalk');
const { exec } = require('child_process');
const { promisify } = require('util');
const logger = require('../utils/logger');

const execAsync = promisify(exec);

async function doctor() {
    console.log(chalk.bold.cyan('\n🏥 DevToolbox Doctor - Environment Health Check\n'));

    const checks = [];

    // Check Node.js
    try {
        const { stdout } = await execAsync('node --version');
        const version = stdout.trim();
        checks.push({ name: 'Node.js', status: 'ok', info: version });
    } catch (error) {
        checks.push({ name: 'Node.js', status: 'error', info: 'Not found' });
    }

    // Check npm
    try {
        const { stdout } = await execAsync('npm --version');
        const version = stdout.trim();
        checks.push({ name: 'npm', status: 'ok', info: `v${version}` });
    } catch (error) {
        checks.push({ name: 'npm', status: 'error', info: 'Not found' });
    }

    // Check git
    try {
        const { stdout } = await execAsync('git --version');
        const version = stdout.trim();
        checks.push({ name: 'Git', status: 'ok', info: version });
    } catch (error) {
        checks.push({ name: 'Git', status: 'warning', info: 'Not found' });
    }

    // Check internet
    try {
        await execAsync('curl -s --max-time 2 https://www.google.com');
        checks.push({ name: 'Internet', status: 'ok', info: 'Connected' });
    } catch (error) {
        checks.push({ name: 'Internet', status: 'warning', info: 'Not connected' });
    }

    // Check disk space
    try {
        const platform = process.platform;
        let command = platform === 'darwin' || platform === 'linux'
            ? "df -h / | tail -1 | awk '{print $5}'"
            : "wmic logicaldisk get size,freespace,caption";

        const { stdout } = await execAsync(command);
        const usage = stdout.trim();
        checks.push({ name: 'Disk Space', status: 'ok', info: platform === 'win32' ? 'Available' : `${usage} used` });
    } catch (error) {
        checks.push({ name: 'Disk Space', status: 'warning', info: 'Unable to check' });
    }

    // Display results
    checks.forEach(check => {
        const icon = check.status === 'ok' ? '✓' : check.status === 'error' ? '✗' : '⚠';
        const color = check.status === 'ok' ? chalk.green : check.status === 'error' ? chalk.red : chalk.yellow;
        console.log(color(`${icon} ${check.name.padEnd(15)} ${check.info}`));
    });

    const errors = checks.filter(c => c.status === 'error').length;
    const warnings = checks.filter(c => c.status === 'warning').length;

    console.log(chalk.bold.cyan('\n📊 Summary:'));
    if (errors === 0 && warnings === 0) {
        console.log(chalk.green('✓ All systems operational!'));
    } else {
        if (errors > 0) console.log(chalk.red(`✗ ${errors} error(s) found`));
        if (warnings > 0) console.log(chalk.yellow(`⚠ ${warnings} warning(s) found`));
    }

    console.log();
}

module.exports = doctor;
