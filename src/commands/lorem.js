const logger = require('../utils/logger');

function generateLorem(count = 50) {
    const words = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
        'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
        'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
        'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
        'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
    ];

    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(words[Math.floor(Math.random() * words.length)]);
    }

    // Capitalize first letter
    result[0] = result[0].charAt(0).toUpperCase() + result[0].slice(1);

    const text = result.join(' ') + '.';
    console.log(text);
    logger.success(`\nGenerated ${count} words of lorem ipsum`);
}

module.exports = generateLorem;
