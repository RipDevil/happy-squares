import logger from "./services/verboseLogger/index.js";
import opts from "./services/opts/index.js";

export default async function main() {
        logger.write("App has started");
}

if (opts.dev) {
        main();
}
