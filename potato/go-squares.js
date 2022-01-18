import logger from './services/verboseLogger/index.js';
import opts from './services/opts/index.js';

import { mkdir } from 'fs/promises';
import { pipeline } from 'stream';
import { join as pathJoin } from 'path';
import { createReadStream, createWriteStream } from 'fs';

const root = process.cwd();

export default async function main() {
        logger.write('The app has been started');
        logger.write('From ' + root);
        logger.write(JSON.stringify(opts, null, 3));

        const pathToDistHtml = pathJoin(root, 'dist', 'happy-squares.html');
        const pathToSrcHtml = pathJoin(root, 'potato/static', 'index.html');
        const pathToDistDir = pathJoin(root, 'dist');

        try {
                await mkdir(pathToDistDir);
        } catch (err) {
                logger.write(`Error: ${err?.message || ''}`);
        }

        pipeline(
                createReadStream(pathToSrcHtml),
                createWriteStream(pathToDistHtml),
                () => {
                        logger.write(
                                'Error: an error has occuered during pipeline'
                        );
                }
        );
}

if (opts.dev) {
        main();
}
