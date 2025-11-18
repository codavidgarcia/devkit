const crypto = require('crypto');
const logger = require('../utils/logger');
const chalk = require('chalk');

function hash(text, algorithm = 'sha256') {
    try {
        const algorithms = ['md5', 'sha1', 'sha256', 'sha512'];

        if (!algorithms.includes(algorithm)) {
            logger.error(`Unsupported algorithm. Use one of: ${algorithms.join(', ')}`);
            return;
        }

        const hash = crypto.createHash(algorithm).update(text).digest('hex');

        console.log(chalk.bold.cyan(`\n${algorithm.toUpperCase()} Hash:`));
        console.log(hash);

        logger.success(`\nHash generated using ${algorithm}`);
    } catch (error) {
        logger.error(`Failed to generate hash: ${error.message}`);
    }
}

module.exports = hash;
