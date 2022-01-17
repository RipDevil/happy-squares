import opts from "./opts.js";
import { writeConsoleLog } from "../utils/write-console-log.js";

class Logger {
        constructor(writeLog) {
                this.writeLog = writeLog;
        }

        write(text) {
                this.writeLog(text);
        }
}

class LoggerVerbose extends Logger {
        constructor(writeLog, isVerbose) {
                super(writeLog);
                this.isVerbose = isVerbose;
        }

        write(text) {
                this.isVerbose && super.write(text);
        }
}

export default (() => new LoggerVerbose(writeConsoleLog, opts.verbose))();
