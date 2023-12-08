import sharp from "sharp";
import fs from 'node:fs';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const pathToImagesDir = __dirname + '/originalimages/';

const files = fs.readdirSync(pathToImagesDir);

let minWidth = 1000;
let minHeight = 1000;

files.forEach(async (file, index) => {
    const imageBuffer = fs.readFileSync(pathToImagesDir + file);
    const image = sharp(imageBuffer);
    const metaData = await image.metadata();
    console.log(`${index}: ${file}`);
    console.log(`Meta data: [width - ${metaData.width}] [height - ${metaData.height}] [format - ${metaData.format}]\n`);

    if (minWidth > metaData.width) {
        minWidth = metaData.width;
    }
    if (minHeight > metaData.height) {
        minHeight = metaData.height;
    }

    console.log(`minWidth: ${minWidth}, minHeight: ${minHeight}`)

    try {
        const imageName = `image-${index}.jpg`;
        await image.resize(600, 400, {fit: 'fill'}).toFile(__dirname + `/${imageName}`);

        fs.copyFileSync(__dirname + `${imageName}`, __dirname + '/testImages/' + `${imageName}`);
        fs.unlinkSync(__dirname + `/${imageName}`);
    }
    catch(error) {
        console.log(`ERROR: ${error}`);
    }
});

