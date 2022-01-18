import { ARGVS } from '../../consts/argv-map.js';

export default (function getOpts() {
    let opts = process.argv.reduce(
        (acc, arg) => ({
            ...acc,
            ...(ARGVS[arg] ? { [ARGVS[arg]]: true } : {}),
        }),
        {}
    );

    return opts;
})();
