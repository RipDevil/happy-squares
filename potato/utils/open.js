import { platform } from 'os';
import { exec } from 'child_process';
import { access } from 'fs/promises';

import opts from '../services/opts/index.js';
import vlogger from '../services/verboseLogger/index.js';

const osPlatform = platform();

// TODO: maybe there is a better solution for this feature
export const open = async (path) => {
    vlogger.write(`Platform is "${osPlatform}"`);

    try {
        await access(path);

        let command = `google-chrome --no-sandbox ${path}`;
        if (osPlatform === 'win32') {
            command = `start microsoft-edge:${path}`;
        } else if (osPlatform === 'darwin') {
            command = `open -a "Google Chrome" ${path}`;
        }

        vlogger.write(`Open command is "${command}"`);
        !opts.dev && exec(command);
    } catch (err) {}
};
