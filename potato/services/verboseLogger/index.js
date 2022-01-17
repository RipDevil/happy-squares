import { LoggerVerbose } from './verbose-logger-service.js';
import opts from '../opts/index.js';

export default (() => new LoggerVerbose(console.log, opts.verbose))();
