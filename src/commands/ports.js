const { exec } = require('child_process');
const { promisify } = require('util');
const logger = require('../utils/logger');
const chalk = require('chalk');
const { getContext } = require('../utils/context');

const execAsync = promisify(exec);

async function listPorts(options = {}) {
    try {
        const platform = process.platform;
        let command;

        if (platform === 'win32') {
            command = 'netstat -ano';
        } else {
            command = 'lsof -iTCP -sTCP:LISTEN -n -P';
        }

        const { stdout } = await execAsync(command);
        const ports = parsePorts(stdout, platform);

        // Get context for common ports
        const context = await getContext();
        const commonPorts = context.commonPorts || [];

        if (options.common) {
            // Show only common dev ports
            const filtered = ports.filter(p => commonPorts.includes(p.port));
            displayPorts(filtered, commonPorts);
        } else {
            displayPorts(ports, commonPorts);
        }

        if (ports.length === 0) {
            logger.info('No ports currently in use');
        }

    } catch (error) {
        logger.error(`Failed to list ports: ${error.message}`);
    }
}

function parsePorts(output, platform) {
    const ports = [];
    const lines = output.split('\n');

    if (platform === 'win32') {
        // Parse Windows netstat output
        for (const line of lines) {
            const match = line.match(/TCP\s+\S+:(\d+)\s+\S+\s+LISTENING\s+(\d+)/);
            if (match) {
                ports.push({
                    port: parseInt(match[1]),
                    pid: match[2],
                    process: 'unknown'
                });
            }
        }
    } else {
        // Parse Unix lsof output
        for (const line of lines) {
            if (line.includes('LISTEN')) {
                const parts = line.split(/\s+/);
                const process = parts[0];
                const pid = parts[1];
                const portMatch = parts[8]?.match(/:(\d+)/);

                if (portMatch) {
                    ports.push({
                        port: parseInt(portMatch[1]),
                        pid,
                        process
                    });
                }
            }
        }
    }

    // Remove duplicates and sort by port
    const unique = Array.from(new Map(ports.map(p => [p.port, p])).values());
    return unique.sort((a, b) => a.port - b.port);
}

function displayPorts(ports, commonPorts = []) {
    if (ports.length === 0) return;

    console.log(chalk.bold.cyan('\nActive Ports:\n'));

    for (const p of ports) {
        const isCommon = commonPorts.includes(p.port);
        const commonTag = isCommon ? chalk.yellow('[COMMON]') : '';
        const portStr = chalk.bold(p.port.toString().padEnd(6));
        const processStr = (p.process || 'unknown').padEnd(20);
        const pidStr = `PID ${p.pid}`.padEnd(12);

        console.log(`  ${portStr} ${processStr} ${pidStr} ${commonTag}`);
    }

    if (commonPorts.length > 0) {
        console.log(chalk.dim('\n[COMMON] = Frequently used in your projects'));
    }

    console.log(chalk.bold.cyan('\nCommands:'));
    console.log(`  devtoolbox kill-port <port>  - Kill a process`);
    console.log(`  devtoolbox ports --common     - Show only common ports`);
    console.log();
}

module.exports = listPorts;
