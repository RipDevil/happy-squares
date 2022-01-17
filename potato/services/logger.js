import opts from "./opts.js";
import { writeConsoleLog } from "../utils/write-console-log.js";

class Logger {
        constructor(writeLog, isVerbose) {
                this.writeLog = writeLog;
                this.isVerbose = isVerbose;
        }

        write(text) {
                this.isVerbose && this.writeLog(text);
        }
}

export default (() => new Logger(writeConsoleLog, opts.verbose))();
