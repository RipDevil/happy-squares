import opts from "./services/opts.js";
import logger from "./services/logger.js";

export default async function main() {
        logger.write("App has started");
}

if (opts.dev) {
        main();
}
