const logger = require('../utils/logger');
const chalk = require('chalk');

function decodeJWT(token) {
    try {
        const parts = token.split('.');

        if (parts.length !== 3) {
            logger.error('Invalid JWT format. Expected format: header.payload.signature');
            return;
        }

        const [headerB64, payloadB64, signature] = parts;

        // Decode header and payload (handle URL-safe base64)
        const decodeBase64 = (str) => {
            // Convert URL-safe base64 to standard base64
            let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
            // Add padding if needed
            while (base64.length % 4) {
                base64 += '=';
            }
            return Buffer.from(base64, 'base64').toString('utf-8');
        };

        const header = JSON.parse(decodeBase64(headerB64));
        const payload = JSON.parse(decodeBase64(payloadB64));

        // Display results
        console.log(chalk.bold.cyan('\n📋 JWT Header:'));
        console.log(JSON.stringify(header, null, 2));

        console.log(chalk.bold.cyan('\n📦 JWT Payload:'));
        console.log(JSON.stringify(payload, null, 2));

        // Show expiration if present
        if (payload.exp) {
            const expirationDate = new Date(payload.exp * 1000);
            const now = new Date();
            const isExpired = expirationDate < now;

            console.log(chalk.bold.cyan('\n⏰ Expiration:'));
            console.log(`  Date: ${expirationDate.toISOString()}`);
            console.log(`  Status: ${isExpired ? chalk.red('EXPIRED') : chalk.green('VALID')}`);

            if (!isExpired) {
                const timeLeft = Math.floor((expirationDate - now) / 1000 / 60);
                console.log(`  Time left: ${timeLeft} minutes`);
            }
        }

        console.log(chalk.bold.cyan('\n🔐 Signature:'));
        console.log(`  ${signature.substring(0, 20)}...`);

        logger.info('\n✓ JWT decoded successfully (100% offline)');
    } catch (error) {
        logger.error(`Failed to decode JWT: ${error.message}`);
    }
}

module.exports = decodeJWT;
