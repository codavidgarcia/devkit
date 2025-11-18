const crypto = require('crypto');
const logger = require('../utils/logger');
const chalk = require('chalk');

function generateUUID() {
    const uuid = crypto.randomUUID();
    console.log(uuid);
    logger.success('UUID v4 generated');
}

module.exports = generateUUID;
