import { pipeline } from 'stream';

export const promisedPipeline = (rs, ws) =>
        new Promise((resolve, reject) => {
                pipeline(rs, ws, resolve).on('error', reject);
        });
