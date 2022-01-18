import logger from './services/verboseLogger/index.js';
import opts from './services/opts/index.js';

import { mkdir } from 'fs/promises';
import { join as pathJoin } from 'path';
import { createReadStream, createWriteStream } from 'fs';

import { open } from './utils/open.js';
import { promisedPipeline as pipeline } from './utils/promised-pipeline.js';

const root = process.cwd();

export default async function main() {
    logger.write('The app has been started');
    logger.write('From ' + root);
    logger.write(JSON.stringify(opts, null, 3));

    const pathToDistHtml = pathJoin(root, 'dist', 'happy-squares.html');
    const pathToSrcHtml = pathJoin(root, 'potato/static', 'index.html');
    const pathToDistDir = pathJoin(root, 'dist');

    try {
        logger.write(`Making dir "${pathToDistDir}"`);
        await mkdir(pathToDistDir);
        logger.write(`Make dir success "${pathToDistDir}"`);
    } catch (err) {}

    // collect git data
    // create temp html
    // fill temp html
    // clone temp html to dist
    // open it!

    try {
        logger.write(
            `Processing file "${pathToSrcHtml}" -> "${pathToDistHtml}"`
        );
        await pipeline(
            createReadStream(pathToSrcHtml),
            createWriteStream(pathToDistHtml)
        );
        logger.write(
            `Process file success "${pathToSrcHtml}" -> "${pathToDistHtml}"`
        );
        open(pathToDistHtml);
    } catch (err) {}
}

if (opts.dev) {
    main();
}
