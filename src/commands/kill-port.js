const { exec } = require('child_process');
const { promisify } = require('util');
const logger = require('../utils/logger');
const chalk = require('chalk');
const { trackPortKill, addToHistory } = require('../utils/context');

const execAsync = promisify(exec);

async function killPort(port) {
    try {
        // Validate port number
        const portNum = parseInt(port);
        if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
            logger.error('Invalid port number. Must be between 1 and 65535');
            return;
        }

        const platform = process.platform;
        let command;

        if (platform === 'win32') {
            // Windows
            command = `netstat -ano | findstr :${port}`;
        } else {
            // Unix-like (macOS, Linux)
            command = `lsof -ti:${port}`;
        }

        const { stdout } = await execAsync(command);

        if (!stdout.trim()) {
            logger.warning(`No process found running on port ${port}`);
            return;
        }

        let pid;
        let processName = 'unknown';

        if (platform === 'win32') {
            // Extract PID from Windows netstat output
            const lines = stdout.trim().split('\n');
            const lastLine = lines[lines.length - 1];
            pid = lastLine.trim().split(/\s+/).pop();
        } else {
            // Unix-like systems return PID directly
            pid = stdout.trim().split('\n')[0];

            // Try to get process name
            try {
                const { stdout: psOut } = await execAsync(`ps -p ${pid} -o comm=`);
                processName = psOut.trim();
            } catch (e) {
                // Ignore if we can't get process name
            }
        }

        // Kill the process
        const killCommand = platform === 'win32'
            ? `taskkill /PID ${pid} /F`
            : `kill -9 ${pid}`;

        await execAsync(killCommand);
        logger.success(`Killed ${processName} (PID ${pid}) on port ${port}`);

        // Track in context
        await addToHistory(`kill-port ${port}`);
        const isNowCommon = await trackPortKill(portNum);

        // Show suggestions
        if (isNowCommon) {
            console.log(chalk.yellow(`\nTip: Port ${port} is frequently blocked.`));
            console.log(chalk.dim(`  → Consider running 'devtoolbox ports' to see all active ports`));
        }

    } catch (error) {
        if (error.code === 1 || error.stdout === '') {
            logger.warning(`No process found running on port ${port}`);
        } else {
            logger.error(`Failed to kill process on port ${port}: ${error.message}`);
        }
    }
}

module.exports = killPort;
