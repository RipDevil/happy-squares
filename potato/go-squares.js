import logger from './services/verboseLogger/index.js';
import opts from './services/opts/index.js';
import gitGetter from './services/git-sewer/index.js';

import { mkdir } from 'fs/promises';
import { join as pathJoin } from 'path';
import { createWriteStream } from 'fs';

import { open } from './utils/open.js';
import { promisedPipeline as pipeline } from './utils/promised-pipeline.js';
import { readFileSimple as readFile } from './utils/read-file-simple.js';
import { writeSquares } from './utils/write-squares.js';

const root = process.cwd();

export default async function main() {
    logger.write('\r\n\r\n==== The app has been started ====');
    logger.write('From ' + root);
    logger.write('argv: ' + JSON.stringify(opts, null, 3));

    const pathToDistHtml = pathJoin(root, 'dist', 'happy-squares.html');
    const pathToDistDir = pathJoin(root, 'dist');

    await gitGetter.init();

    try {
        logger.write(`Making dir "${pathToDistDir}"`);
        await mkdir(pathToDistDir);
        logger.write(`Make dir success "${pathToDistDir}"`);
    } catch (err) {}

    const commitsDateCounts = gitGetter.getSq();
    logger.write(
        `Successfully collected commits and dates: ${JSON.stringify(
            commitsDateCounts,
            null,
            3
        )}`
    );

    try {
        const indexPage = await readFile(
            './static/index.html',
            import.meta.url
        );

        const { header, footer } =
            /(?<header>[\s\S]+)\[\[SQUARES\]\](?<footer>[\s\S]+)/m.exec(
                indexPage
            ).groups;

        const distWriteStream = createWriteStream(pathToDistHtml);
        distWriteStream.write(
            header.replace(/\[\[USER\]\]/g, gitGetter.globalName)
        );

        await pipeline(
            writeSquares(commitsDateCounts),
            async function* (stream) {
                for await (const chunk of stream) yield chunk;
                yield footer.replace(/\[\[COLOR\]\]/g, 9);
            },
            distWriteStream
        );

        open(pathToDistHtml);
    } catch (err) {
        console.log('err :>> ', err);
    }
}

if (opts.dev) {
    main();
}
