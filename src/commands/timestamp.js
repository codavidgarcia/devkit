const chalk = require('chalk');
const logger = require('../utils/logger');

function timestamp(input) {
    try {
        if (!input) {
            // Show current timestamp
            const now = Date.now();
            const date = new Date(now);

            console.log(chalk.bold.cyan('\n⏰ Current Time:'));
            console.log(`  Unix (ms):    ${now}`);
            console.log(`  Unix (s):     ${Math.floor(now / 1000)}`);
            console.log(`  ISO 8601:     ${date.toISOString()}`);
            console.log(`  Local:        ${date.toLocaleString()}`);
        } else {
            // Convert timestamp to readable format
            const timestamp = parseInt(input);

            // Auto-detect if it's seconds or milliseconds
            const isSeconds = timestamp < 10000000000;
            const ms = isSeconds ? timestamp * 1000 : timestamp;
            const date = new Date(ms);

            console.log(chalk.bold.cyan('\n⏰ Timestamp Conversion:'));
            console.log(`  Input:        ${input} ${isSeconds ? '(seconds)' : '(milliseconds)'}`);
            console.log(`  ISO 8601:     ${date.toISOString()}`);
            console.log(`  Local:        ${date.toLocaleString()}`);
            console.log(`  Relative:     ${getRelativeTime(date)}`);
        }

        logger.success('\nTimestamp processed');
    } catch (error) {
        logger.error(`Failed to process timestamp: ${error.message}`);
    }
}

function getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(Math.abs(diffMs) / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    const isPast = diffMs > 0;
    const suffix = isPast ? 'ago' : 'from now';

    if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? 's' : ''} ${suffix}`;
    if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ${suffix}`;
    if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ${suffix}`;
    return `${diffSec} second${diffSec > 1 ? 's' : ''} ${suffix}`;
}

module.exports = timestamp;
