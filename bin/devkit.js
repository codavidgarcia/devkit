#!/usr/bin/env node

const { Command } = require('commander');
const killPort = require('../src/commands/kill-port');
const decodeJWT = require('../src/commands/jwt');
const generateGitignore = require('../src/commands/gitignore');
const checkConnectivity = require('../src/commands/online');
const convert = require('../src/commands/convert');
const generateUUID = require('../src/commands/uuid');
const hash = require('../src/commands/hash');
const base64Command = require('../src/commands/base64');
const timestamp = require('../src/commands/timestamp');
const showIP = require('../src/commands/ip');
const generateLorem = require('../src/commands/lorem');
const showColor = require('../src/commands/color');
const generateQR = require('../src/commands/qr');
const doctor = require('../src/commands/doctor');
const chalk = require('chalk');

const program = new Command();

program
    .name('devtoolbox')
    .description('🛠️  All-in-one developer utility suite')
    .version('1.1.1', '-v, --version', 'Output the current version');

// Kill port command
program
    .command('kill-port <port>')
    .alias('kp')
    .description('Kill the process running on a specific port')
    .action((port) => {
        killPort(port);
    });

// JWT decoder command
program
    .command('jwt <token>')
    .description('Decode a JWT token (100% offline)')
    .action((token) => {
        decodeJWT(token);
    });

// Gitignore generator command
program
    .command('gitignore <templates...>')
    .alias('gi')
    .description('Generate .gitignore file from templates (e.g., node, python, macos)')
    .option('-s, --stdout', 'Output to stdout instead of file')
    .action((templates, options) => {
        generateGitignore(templates, options);
    });

// Connectivity check command
program
    .command('online')
    .description('Check internet connectivity (gateway, DNS, HTTP)')
    .action(() => {
        checkConnectivity();
    });

// JSON/YAML converter command
program
    .command('convert [file]')
    .description('Convert between JSON and YAML (auto-detects format)')
    .action((file) => {
        convert(file);
    });

// UUID generator command
program
    .command('uuid')
    .description('Generate a random UUID v4')
    .action(() => {
        generateUUID();
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

// Timestamp command
program
    .command('timestamp [value]')
    .alias('ts')
    .description('Get current timestamp or convert Unix timestamp to readable format')
    .action((value) => {
        timestamp(value);
    });

// IP address command
program
    .command('ip')
    .description('Show local and public IP addresses')
    .action(() => {
        showIP();
    });

// Lorem ipsum generator
program
    .command('lorem [words]')
    .description('Generate lorem ipsum placeholder text')
    .action((words) => {
        generateLorem(parseInt(words) || 50);
    });

// Color preview command
program
    .command('color <hex>')
    .description('Preview a hex color in the terminal')
    .action((hex) => {
        showColor(hex);
    });

// QR code generator
program
    .command('qr <text>')
    .description('Generate a QR code in the terminal')
    .action((text) => {
        generateQR(text);
    });

// Doctor command
program
    .command('doctor')
    .description('Check development environment health')
    .action(() => {
        doctor();
    });

// Show help if no command provided
if (!process.argv.slice(2).length) {
    console.log(chalk.bold.cyan('\n🛠️  DevToolbox - All-in-One Developer Utility Suite\n'));
    program.outputHelp();
}

program.parse(process.argv);
