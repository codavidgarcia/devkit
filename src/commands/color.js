const chalk = require('chalk');
const logger = require('../utils/logger');

function showColor(hex) {
    try {
        // Remove # if present
        hex = hex.replace('#', '');

        // Validate hex
        if (!/^[0-9A-Fa-f]{6}$/.test(hex)) {
            logger.error('Invalid hex color. Use format: RRGGBB or #RRGGBB');
            return;
        }

        // Convert hex to RGB
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        // Display color
        console.log(chalk.bold.cyan('\n🎨 Color Preview:\n'));
        console.log(chalk.hex(`#${hex}`)('████████████████████████████████'));
        console.log(chalk.hex(`#${hex}`)('████████████████████████████████'));
        console.log(chalk.hex(`#${hex}`)('████████████████████████████████'));

        console.log(chalk.bold('\nColor Information:'));
        console.log(`  HEX:  #${hex.toUpperCase()}`);
        console.log(`  RGB:  rgb(${r}, ${g}, ${b})`);
        console.log(`  HSL:  ${rgbToHsl(r, g, b)}`);

        logger.success('\nColor displayed');
    } catch (error) {
        logger.error(`Failed to display color: ${error.message}`);
    }
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;
}

module.exports = showColor;
