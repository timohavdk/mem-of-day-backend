import { randomStyles } from './randomStyles.js';

function getRandomStylesWord(word, x, y, step) {
    let result = '';

    Array.from(word).forEach((element, index) => {
        result += `<text x="${(index * step) + x}" y="${y}" style="fill:${randomStyles.color()}; font-family:${randomStyles.font()}; font-size:${randomStyles.size()};">${element}</text>`;
    });

    return result;
}

export function getBufferSentence(sentence) {
    let result = '';

    sentence.forEach((word) => {
        result += `${getRandomStylesWord(word.content, word.x, word.y, word.step)}`;
    });

    const svg = 
        `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            ${result}
        </svg>`;

    return Buffer.from(svg);
}