import logger from "./services/verboseLogger/index.js";
import opts from "./services/opts/index.js";

import fs from "fs";
import path from "path";

export default function main() {
        logger.write("The app has been started");
        logger.write("From " + process.cwd());
        logger.write(JSON.stringify(opts, null, 3));

        const readStaticHtmlStream = fs.createReadStream(
                path.join("./potato/static/index.html")
        );
        const writeResultHtmlStream = fs.createWriteStream(path.join("happy-square.html"));

        readStaticHtmlStream.pipe(writeResultHtmlStream);

        writeResultHtmlStream.on("error", (err) => {
                logger.write('Write '+err.message);
        });

        readStaticHtmlStream.on("error", (err) => {
                logger.write('Read '+err.message);
        });
}

if (opts.dev) {
        main();
}
