import { exec } from 'child_process';

export const execTerminal = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error || stderr === 'string') {
                return reject(new Error(error || stderr));
            }

            return resolve(stdout);
        });
    });
};
