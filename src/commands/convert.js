const fs = require('fs').promises;
const yaml = require('js-yaml');
const logger = require('../utils/logger');

async function convert(inputFile) {
    try {
        // Read input
        let content;
        if (inputFile) {
            // Check if file exists
            try {
                await fs.access(inputFile);
                content = await fs.readFile(inputFile, 'utf-8');
            } catch (error) {
                logger.error(`File not found: ${inputFile}`);
                return;
            }
        } else {
            // Read from stdin
            content = await readStdin();
        }

        // Detect format and convert
        let output;
        let detectedFormat;

        try {
            // Try parsing as JSON first
            const jsonData = JSON.parse(content);
            detectedFormat = 'JSON';
            output = yaml.dump(jsonData, { indent: 2 });
            logger.info('Converted JSON → YAML');
        } catch (jsonError) {
            // If JSON fails, try YAML
            try {
                const yamlData = yaml.load(content);
                detectedFormat = 'YAML';
                output = JSON.stringify(yamlData, null, 2);
                logger.info('Converted YAML → JSON');
            } catch (yamlError) {
                logger.error('Input is neither valid JSON nor YAML');
                return;
            }
        }

        // Output result
        console.log(output);
    } catch (error) {
        logger.error(`Conversion failed: ${error.message}`);
    }
}

function readStdin() {
    return new Promise((resolve, reject) => {
        const chunks = [];
        process.stdin.on('data', (chunk) => chunks.push(chunk));
        process.stdin.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
        process.stdin.on('error', reject);
    });
}

module.exports = convert;
