import { getCaseForm } from "./getCaseForm.js";
import { getBufferSentence } from "./sentence.js";
import { getRandomIntFromInterval } from "./random.js";
import fs from 'node:fs';
import * as url from 'url';
import sharp from "sharp";

const __root_dirname = url.fileURLToPath(new URL('../', import.meta.url));

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

        const caseWord = await getCaseForm(randomWord, 'Р');

        const sentence = [
            {
                content: 'С днём',
                x: 60,
                y: 240,
                step: 40
            },
            {
                content: caseWord,
                x: 100,
                y: 300,
                step: 40
            }
        ];

        const imageSharp = sharp(__root_dirname + '/testImageProcessor/testImages' + `/${randomImage}`);

        const bufferSentence = getBufferSentence(sentence);

        return imageSharp.composite([{input: bufferSentence}]).toBuffer();
    }
    else {
        console.log('Words: ', words.length);
        console.log('Images: ', images.length);
    }
}