const chalk = require('chalk');
const { exec } = require('child_process');
const { promisify } = require('util');
const logger = require('../utils/logger');
const { updateContext, getContext } = require('../utils/context');

const execAsync = promisify(exec);

async function doctor() {
    console.log(chalk.bold.cyan('\n🏥 Environment Health Check\n'));

    const checks = [];
    const issues = [];

    // Check Node.js
    try {
        const { stdout } = await execAsync('node --version');
        const version = stdout.trim();
        checks.push({ name: 'Node.js', status: 'ok', info: version });
    } catch (error) {
        checks.push({ name: 'Node.js', status: 'error', info: 'Not found' });
        issues.push('Node.js is not installed');
    }

    // Check npm
    try {
        const { stdout } = await execAsync('npm --version');
        const version = stdout.trim();
        checks.push({ name: 'npm', status: 'ok', info: `v${version}` });
    } catch (error) {
        checks.push({ name: 'npm', status: 'error', info: 'Not found' });
        issues.push('npm is not installed');
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

    // Check common ports (NEW - cohesion feature)
    const context = await getContext();
    const commonPorts = context.commonPorts || [3000, 8080, 5432];
    const blockedPorts = [];

    for (const port of commonPorts) {
        try {
            const platform = process.platform;
            const command = platform === 'win32'
                ? `netstat -ano | findstr :${port}`
                : `lsof -ti:${port}`;

            const { stdout } = await execAsync(command);
            if (stdout.trim()) {
                // Port is in use
                let processName = 'unknown';
                if (platform !== 'win32') {
                    try {
                        const pid = stdout.trim().split('\n')[0];
                        const { stdout: psOut } = await execAsync(`ps -p ${pid} -o comm=`);
                        processName = psOut.trim();
                    } catch (e) { }
                }
                blockedPorts.push({ port, process: processName });
            }
        } catch (error) {
            // Port is free, which is good
        }
    }

    // Display results
    checks.forEach(check => {
        const icon = check.status === 'ok' ? '✓' : check.status === 'error' ? '✗' : '⚠';
        const color = check.status === 'ok' ? chalk.green : check.status === 'error' ? chalk.red : chalk.yellow;
        console.log(color(`${icon} ${check.name.padEnd(15)} ${check.info}`));
    });

    // Show blocked ports
    if (blockedPorts.length > 0) {
        console.log();
        blockedPorts.forEach(({ port, process }) => {
            console.log(chalk.red(`✗ Port ${port}`.padEnd(17) + `in use (${process})`));
        });
    }

    const errors = checks.filter(c => c.status === 'error').length;
    const warnings = checks.filter(c => c.status === 'warning').length;

    console.log(chalk.bold.cyan('\n📊 Summary:'));
    if (errors === 0 && warnings === 0 && blockedPorts.length === 0) {
        console.log(chalk.green('✓ All systems operational!'));
    } else {
        if (errors > 0) console.log(chalk.red(`✗ ${errors} error(s) found`));
        if (warnings > 0) console.log(chalk.yellow(`⚠ ${warnings} warning(s) found`));
        if (blockedPorts.length > 0) {
            console.log(chalk.yellow(`⚠ ${blockedPorts.length} port(s) blocked`));
        }
    }

    // Suggestions (NEW - cohesion feature)
    if (blockedPorts.length > 0 || issues.length > 0) {
        console.log(chalk.bold.cyan('\n💡 Suggestions:'));

        if (blockedPorts.length > 0) {
            console.log(chalk.dim(`  → Run 'devtoolbox ports' to see all active ports`));
            if (blockedPorts.length === 1) {
                console.log(chalk.dim(`  → Run 'devtoolbox kill-port ${blockedPorts[0].port}' to free port ${blockedPorts[0].port}`));
            }
        }

        if (issues.length > 0) {
            issues.forEach(issue => {
                console.log(chalk.dim(`  → ${issue}`));
            });
        }
    }

    // Update context
    await updateContext({ lastDoctorRun: new Date().toISOString() });

    console.log();
}

module.exports = doctor;
