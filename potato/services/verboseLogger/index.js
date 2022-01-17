import { LoggerVerbose } from './verbose-logger-service.js';
import { writeConsoleLog } from '../../utils/write-console-log.js';
import opts from '../opts/index.js';

export default (() => new LoggerVerbose(writeConsoleLog, opts.verbose))();
