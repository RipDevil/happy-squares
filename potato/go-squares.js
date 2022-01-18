import logger from './services/verboseLogger/index.js';
import opts from './services/opts/index.js';

import { mkdir, readFile } from 'fs/promises';
import { join as pathJoin } from 'path';
import { createWriteStream } from 'fs';

import { open } from './utils/open.js';
import { promisedPipeline as pipeline } from './utils/promised-pipeline.js';
import gitGetter from './services/git-sewer/index.js';

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
            new URL('./static/index.html', import.meta.url),
            {
                encoding: 'utf-8',
            }
        );

        const { header, footer } =
            /(?<header>[\s\S]+)\[\[SQUARES\]\](?<footer>[\s\S]+)/m.exec(
                indexPage
            ).groups;

        const ws = createWriteStream(pathToDistHtml);
        ws.write(header.replace(/\[\[USER\]\]/g, gitGetter.globalName));

        await pipeline(
            function* () {
                for (const commit in commitsDateCounts) {
                    yield `
                        <div data-date="${commit}" data-count="${commitsDateCounts[commit]}"></div>
                    `;
                }
            },
            async function* (stream) {
                for await (const chunk of stream) yield chunk;
                yield footer.replace(/\[\[COLOR\]\]/g, 9);
            },
            ws
        );

        open(pathToDistHtml);
    } catch (err) {
        console.log('err :>> ', err);
    }
}

if (opts.dev) {
    main();
}
