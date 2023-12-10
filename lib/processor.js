import fs from 'node:fs';
import { randomStyles } from './randomStyles.js';
import * as url from 'url';
import { getRandomIntFromInterval } from './random.js';
import sharp from 'sharp';

const __root_dirname = url.fileURLToPath(new URL('../', import.meta.url));

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

export async function compositeWordInImage() {
    let words  = [];
    let images = [];

    try {
        const wordsString = fs.readFileSync(__root_dirname + '/database/words.json');
        words       = JSON.parse(wordsString);
    }
    catch (error) {
        console.log('ERROR', error)
    }

    try {
        images = fs.readdirSync(__root_dirname + '/testImageProcessor/testImages');
    }
    catch (error) {
        console.log('ERROR', error)
    }

    console.log('COMPLETE');
    if (0 !== words.length && 0 !== images.length) {
        const randomWord  = words[getRandomIntFromInterval(0, (words.length - 1))];
        const randomImage = images[getRandomIntFromInterval(0, (images.length - 1))];

        console.log('randomWord: ', randomWord);
        console.log('randomImage: ', randomImage);

        const sentence = [
            {
                content: 'С днём',
                x: 60,
                y: 240,
                step: 40
            },
            {
                content: randomWord,
                x: 100,
                y: 300,
                step: 40
            }
        ];

        const imageSharp = sharp(__root_dirname + '/testImageProcessor/testImages' + `/${randomImage}`);

        const bufferSentence = getBufferSentence(sentence);

        const result = await imageSharp.composite([{input: bufferSentence}]).toBuffer();

        fs.writeFileSync(__root_dirname + '/controllers/result.jpg', result);
    }
    else {
        console.log('Words: ', words.length);
        console.log('Images: ', images.length);
    }
}

compositeWordInImage();