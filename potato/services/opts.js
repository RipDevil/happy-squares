export default (function getOpts() {
        const args = process.argv;
        return Object.keys(args).length > 0
                ? {
                          // TODO: improve!
                          verbose: !!args.find((arg) => arg === "--v"),
                          dev: !!args.find((arg) => arg === "--d"),
                  }
                : {};
})();
