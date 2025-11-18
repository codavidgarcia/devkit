const logger = require('../utils/logger');

function base64Command(text, action = 'encode') {
    try {
        if (action === 'encode') {
            const encoded = Buffer.from(text, 'utf-8').toString('base64');
            console.log(encoded);
            logger.success('Text encoded to base64');
        } else if (action === 'decode') {
            const decoded = Buffer.from(text, 'base64').toString('utf-8');
            console.log(decoded);
            logger.success('Base64 decoded to text');
        } else {
            logger.error('Invalid action. Use "encode" or "decode"');
        }
    } catch (error) {
        logger.error(`Failed to ${action}: ${error.message}`);
    }
}

module.exports = base64Command;
