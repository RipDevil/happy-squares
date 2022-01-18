import { readFile } from 'fs/promises';

export const readFileSimple = (path, base, encoding) =>
    readFile(new URL(path, base), {
        encoding: encoding || 'utf-8',
    });
