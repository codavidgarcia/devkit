const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const { exec } = require('child_process');
const { promisify } = require('util');
const generateGitignore = require('./gitignore');
const doctor = require('./doctor');
const killPort = require('./kill-port');
const { getContext, updateContext } = require('../utils/context');

const execAsync = promisify(exec);

async function init() {
    console.log(chalk.bold.cyan('\n🚀 DevToolbox Project Setup\n'));

    // Detect project type
    const projectType = await detectProjectType();

    if (projectType) {
        console.log(chalk.dim(`Detected: ${projectType} project\n`));
    }

    const tasks = [];

    // 1. Generate .gitignore if needed
    const hasGitignore = await fileExists('.gitignore');
    if (!hasGitignore && projectType) {
        const templates = await getGitignoreTemplates(projectType);
        console.log(chalk.dim(`Generating .gitignore (${templates.join(', ')})...`));

        try {
            await generateGitignore(templates, { stdout: false });
            tasks.push({ name: 'Generated .gitignore', status: 'ok' });
        } catch (error) {
            tasks.push({ name: 'Generate .gitignore', status: 'error' });
        }
    } else if (hasGitignore) {
        tasks.push({ name: '.gitignore already exists', status: 'skip' });
    }

    // 2. Check environment
    console.log(chalk.dim('Checking environment...'));
    const context = await getContext();

    // Run doctor silently to get status
    const envIssues = await checkEnvironment();
    if (envIssues.length === 0) {
        tasks.push({ name: 'Environment check', status: 'ok' });
    } else {
        tasks.push({ name: 'Environment check', status: 'warning', info: `${envIssues.length} issue(s)` });
    }

    // 3. Free common ports if blocked
    const blockedPorts = await checkBlockedPorts();
    if (blockedPorts.length > 0) {
        console.log(chalk.dim(`Freeing blocked ports...`));
        for (const port of blockedPorts) {
            try {
                await killPort(port);
                tasks.push({ name: `Freed port ${port}`, status: 'ok' });
            } catch (error) {
                tasks.push({ name: `Free port ${port}`, status: 'error' });
            }
        }
    }

    // 4. Verify internet
    try {
        await execAsync('curl -s --max-time 2 https://www.google.com');
        tasks.push({ name: 'Internet connection', status: 'ok' });
    } catch (error) {
        tasks.push({ name: 'Internet connection', status: 'warning' });
    }

    // Display results
    console.log();
    tasks.forEach(task => {
        const icon = task.status === 'ok' ? '✓' : task.status === 'error' ? '✗' : '⊘';
        const color = task.status === 'ok' ? chalk.green : task.status === 'error' ? chalk.red : chalk.dim;
        const info = task.info ? ` (${task.info})` : '';
        console.log(color(`${icon} ${task.name}${info}`));
    });

    // Update context
    await updateContext({ projectType });

    console.log(chalk.bold.green('\n✓ Project setup complete!\n'));

    // Show next steps if there were issues
    if (envIssues.length > 0) {
        console.log(chalk.dim('Run \'devtoolbox doctor\' for detailed environment diagnostics'));
    }
}

async function detectProjectType() {
    const detections = [
        { file: 'package.json', type: 'Node.js' },
        { file: 'requirements.txt', type: 'Python' },
        { file: 'Gemfile', type: 'Ruby' },
        { file: 'go.mod', type: 'Go' },
        { file: 'Cargo.toml', type: 'Rust' },
        { file: 'pom.xml', type: 'Java (Maven)' },
        { file: 'build.gradle', type: 'Java (Gradle)' }
    ];

    for (const { file, type } of detections) {
        if (await fileExists(file)) {
            return type;
        }
    }

    return null;
}

async function getGitignoreTemplates(projectType) {
    const templates = ['macos'];

    if (projectType.includes('Node')) templates.push('node');
    if (projectType.includes('Python')) templates.push('python');
    if (projectType.includes('Ruby')) templates.push('ruby');
    if (projectType.includes('Go')) templates.push('go');
    if (projectType.includes('Rust')) templates.push('rust');
    if (projectType.includes('Java')) templates.push('java');

    // Add common editors
    try {
        await fs.access('.vscode');
        templates.push('visualstudiocode');
    } catch {
        // .vscode doesn't exist
    }

    return templates;
}

async function fileExists(filepath) {
    try {
        await fs.access(filepath);
        return true;
    } catch {
        return false;
    }
}

async function checkEnvironment() {
    const issues = [];

    try {
        await execAsync('node --version');
    } catch {
        issues.push('Node.js not installed');
    }

    try {
        await execAsync('npm --version');
    } catch {
        issues.push('npm not installed');
    }

    return issues;
}

async function checkBlockedPorts() {
    const context = await getContext();
    const commonPorts = context.commonPorts || [3000, 8080];
    const blocked = [];

    for (const port of commonPorts) {
        try {
            const platform = process.platform;
            const command = platform === 'win32'
                ? `netstat -ano | findstr :${port}`
                : `lsof -ti:${port}`;

            const { stdout } = await execAsync(command);
            if (stdout.trim()) {
                blocked.push(port);
            }
        } catch {
            // Port is free
        }
    }

    return blocked;
}

module.exports = init;
