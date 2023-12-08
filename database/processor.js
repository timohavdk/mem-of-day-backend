import fs from 'node:fs';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const data = fs.readFileSync(__dirname + '/words.txt', {encoding: 'utf-8'}).split('\n'); 

const cleanData = [];

data.forEach((chunk) => {
    cleanData.push(chunk.replace('\r', ''));
});

const outputFilePath = __dirname + 'words.json';

const cleanDataJsonString = JSON.stringify(cleanData);

fs.writeFileSync(outputFilePath, cleanDataJsonString);