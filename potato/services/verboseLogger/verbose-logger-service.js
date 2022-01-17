import { Logger } from '../logger/logger-service.js';

export class LoggerVerbose extends Logger {
        constructor(writeLog, isVerbose) {
                super(writeLog);
                this.isVerbose = isVerbose;
        }

        write(text) {
                this.isVerbose && super.write(text);
        }
}
