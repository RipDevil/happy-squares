import { pipeline } from 'stream';

export const promisedPipeline = (rs, tr, ws) =>
    new Promise((resolve, reject) => {
        if (ws) {
            pipeline(rs, tr, ws, resolve).on('error', reject);
        } else {
            pipeline(rs, tr, resolve).on('error', reject);
        }
    });
