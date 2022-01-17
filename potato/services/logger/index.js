import { Logger } from './logger-service.js';

export default (() => new Logger(console.log))();
