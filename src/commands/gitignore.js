const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const logger = require('../utils/logger');

const GITIGNORE_API = 'https://www.toptal.com/developers/gitignore/api';

async function generateGitignore(templates, options = {}) {
    try {
        if (!templates || templates.length === 0) {
            logger.error('Please specify at least one template (e.g., node, python, macos)');
            logger.info('Example: devkit gitignore node macos');
            return;
        }

        const templateList = templates.join(',');
        const url = `${GITIGNORE_API}/${templateList}`;

        logger.info(`Fetching .gitignore for: ${templates.join(', ')}...`);

        const response = await axios.get(url);
        const content = response.data;

        if (content.includes('ERROR')) {
            logger.error('Invalid template name(s). Check available templates at: https://www.toptal.com/developers/gitignore');
            return;
        }

        // Write to file or stdout
        if (options.stdout) {
            console.log(content);
        } else {
            const outputPath = path.join(process.cwd(), '.gitignore');
            await fs.writeFile(outputPath, content, 'utf-8');
            logger.success(`.gitignore created successfully with templates: ${templates.join(', ')}`);
        }
    } catch (error) {
        logger.error(`Failed to generate .gitignore: ${error.message}`);
    }
}

module.exports = generateGitignore;
