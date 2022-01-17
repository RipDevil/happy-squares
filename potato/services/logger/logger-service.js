export class Logger {
        constructor(writeLog) {
                this.writeLog = writeLog;
        }

        write(text) {
                this.writeLog(text);
        }
}
