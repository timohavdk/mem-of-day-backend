import { log } from 'node:console';
import {randomStyles} from './randomStyles.js';
import fs from 'node:fs';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const svg =
`<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
    <text x="20" y="20" style="fill:${randomStyles.color()}; font-family:${randomStyles.font()}; font-size:${randomStyles.size()};">С днём</text>
    <text x="60" y="40" style="fill:${randomStyles.color()}; font-family:${randomStyles.font()}; font-size:${randomStyles.size()};">помидора</text>
</svg>`

const svgBuffer = Buffer.from(svg);

fs.writeFileSync(__dirname + '/output.svg', svgBuffer);