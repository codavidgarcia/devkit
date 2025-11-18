const { exec } = require('child_process');
const { promisify } = require('util');
const logger = require('../utils/logger');
const chalk = require('chalk');

const execAsync = promisify(exec);

async function showIP() {
    console.log(chalk.bold.cyan('\n🌐 IP Address Information\n'));

    // Get local IP
    try {
        const platform = process.platform;
        let command;

        if (platform === 'darwin' || platform === 'linux') {
            command = "ifconfig | grep 'inet ' | grep -v 127.0.0.1 | awk '{print $2}' | head -1";
        } else {
            command = "ipconfig | findstr IPv4";
        }

        const { stdout } = await execAsync(command);
        const localIP = stdout.trim().split('\n')[0];

        console.log(chalk.bold('Local IP:'));
        console.log(`  ${localIP || 'Not found'}`);
    } catch (error) {
        console.log(chalk.bold('Local IP:'));
        console.log('  Unable to determine');
    }

    // Get public IP
    try {
        const { stdout } = await execAsync('curl -s https://api.ipify.org');
        console.log(chalk.bold('\nPublic IP:'));
        console.log(`  ${stdout.trim()}`);
        logger.success('\nIP information retrieved');
    } catch (error) {
        console.log(chalk.bold('\nPublic IP:'));
        console.log('  Unable to determine (check internet connection)');
    }
}

module.exports = showIP;
