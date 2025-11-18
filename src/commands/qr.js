const qrcode = require('qrcode-terminal');
const logger = require('../utils/logger');

function generateQR(text) {
    try {
        console.log('\n');
        qrcode.generate(text, { small: true });
        logger.success(`\nQR code generated for: ${text}`);
    } catch (error) {
        logger.error(`Failed to generate QR code: ${error.message}`);
    }
}

module.exports = generateQR;
