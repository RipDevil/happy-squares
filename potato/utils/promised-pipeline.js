import { pipeline } from 'stream';

export const promisedPipeline = (rs, ws) =>
        new Promise((res, rej) => {
                pipeline(rs, ws, res).on('error', rej);
        });
