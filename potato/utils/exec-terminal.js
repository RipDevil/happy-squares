import { exec } from 'child_process';

export const execTerminal = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error != null) {
                return reject(new Error(error));
            } else if (typeof stderr != 'string') {
                return reject(new Error(stderr));
            } else {
                return resolve(stdout);
            }
        });
    });
};
