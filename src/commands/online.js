const { exec } = require('child_process');
const { promisify } = require('util');
const axios = require('axios');
const logger = require('../utils/logger');
const chalk = require('chalk');

const execAsync = promisify(exec);

async function checkConnectivity() {
    console.log(chalk.bold.cyan('\n🌐 Connectivity Diagnostics\n'));

    const results = {
        gateway: false,
        dns: false,
        internet: false,
    };

    // 1. Check default gateway
    try {
        const platform = process.platform;
        let gatewayCommand;

        if (platform === 'win32') {
            gatewayCommand = 'ping -n 1 -w 1000 192.168.1.1';
        } else if (platform === 'darwin') {
            gatewayCommand = 'ping -c 1 -W 1000 $(route -n get default | grep gateway | awk \'{print $2}\')';
        } else {
            gatewayCommand = 'ping -c 1 -W 1 $(ip route | grep default | awk \'{print $3}\')';
        }

        await execAsync(gatewayCommand);
        results.gateway = true;
        logger.success('Gateway reachable');
    } catch (error) {
        logger.error('Gateway unreachable');
    }

    // 2. Check DNS (Google DNS)
    try {
        const pingCommand = process.platform === 'win32'
            ? 'ping -n 1 -w 1000 8.8.8.8'
            : 'ping -c 1 -W 1 8.8.8.8';

        await execAsync(pingCommand);
        results.dns = true;
        logger.success('DNS (8.8.8.8) reachable');
    } catch (error) {
        logger.error('DNS (8.8.8.8) unreachable');
    }

    // 3. Check HTTP connectivity
    try {
        await axios.get('https://www.google.com', { timeout: 3000 });
        results.internet = true;
        logger.success('Internet (HTTP) working');
    } catch (error) {
        logger.error('Internet (HTTP) not working');
    }

    // Summary
    console.log(chalk.bold.cyan('\n📊 Summary:'));

    if (results.internet) {
        console.log(chalk.green('✓ You are online! All systems operational.'));
    } else if (results.dns) {
        console.log(chalk.yellow('⚠ Network reachable but HTTP blocked (firewall/proxy?)'));
    } else if (results.gateway) {
        console.log(chalk.yellow('⚠ Local network OK but no internet access'));
    } else {
        console.log(chalk.red('✗ No network connectivity detected'));
    }
}

module.exports = checkConnectivity;
