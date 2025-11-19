#!/usr/bin/env node

const { Command } = require('commander');
const killPort = require('../src/commands/kill-port');
const listPorts = require('../src/commands/ports');
const decodeJWT = require('../src/commands/jwt');
const generateGitignore = require('../src/commands/gitignore');
const checkConnectivity = require('../src/commands/online');
const hash = require('../src/commands/hash');
const base64Command = require('../src/commands/base64');
const showIP = require('../src/commands/ip');
const doctor = require('../src/commands/doctor');
const init = require('../src/commands/init');
const chalk = require('chalk');

const program = new Command();

program
    .name('devtoolbox')
    .description('Local development toolkit')
    .version('2.1.0', '-v, --version', 'Output the current version')
    .option('--json', 'Output in JSON format')
    .option('--quiet', 'Suppress output (exit codes only)')
    .option('--verbose', 'Show detailed output');

// Init command (NEW)
program
    .command('init')
    .description('Setup project (gitignore, check env, free ports)')
    .action(() => {
        init();
    });

// Kill port command
program
    .command('kill-port <port>')
    .alias('kp')
    .description('Kill the process running on a specific port')
    .action((port) => {
        killPort(port);
    });

// List ports command
program
    .command('ports')
    .description('List all active ports')
    .option('--common', 'Show only common development ports')
    .action((options) => {
        listPorts(options);
    });

// Doctor command
program
    .command('doctor')
    .description('Check development environment health')
    .action(() => {
        doctor();
    });

// JWT decoder command
program
    .command('jwt <token>')
    .description('Decode a JWT token (works offline)')
    .action((token) => {
        decodeJWT(token);
    });

// Gitignore generator command
program
    .command('gitignore <templates...>')
    .alias('gi')
    .description('Generate .gitignore file from templates')
    .option('-s, --stdout', 'Output to stdout instead of file')
    .action((templates, options) => {
        generateGitignore(templates, options);
    });

// Connectivity check command
program
    .command('online')
    .description('Check internet connectivity')
    .action(() => {
        checkConnectivity();
    });

// IP address command
program
    .command('ip')
    .description('Show local and public IP addresses')
    .action(() => {
        showIP();
    });

// Hash generator command
program
    .command('hash <text>')
    .description('Generate hash of text')
    .option('-a, --algorithm <type>', 'Hash algorithm (md5, sha1, sha256, sha512)', 'sha256')
    .action((text, options) => {
        hash(text, options.algorithm);
    });

// Base64 encode/decode command
program
    .command('encode <text>')
    .description('Encode text to base64')
    .action((text) => {
        base64Command(text, 'encode');
    });

program
    .command('decode <text>')
    .description('Decode base64 to text')
    .action((text) => {
        base64Command(text, 'decode');
    });

// Show help if no command provided
if (!process.argv.slice(2).length) {
    console.log(chalk.bold.cyan('\n🛠️  DevToolbox - Local Development Toolkit\n'));
    program.outputHelp();
}

program.parse(process.argv);
