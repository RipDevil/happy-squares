import { populateCalendar } from '../../utils/populate-calendar.js';

export class GitSewer {
    constructor(gitDateGetter, isLocal) {
        this.exec = gitDateGetter;
        this.isLocal = isLocal;
    }

    async init() {
        this.globalName = await this._getGlobalUserName();
        this.myCommits = await this._getAllCommits();
    }

    getSq() {
        return this.myCommits;
    }

    async _getGlobalUserName() {
        return (
            await this.exec(
                `git config --${this.isLocal ? 'local' : 'global'} user.name`
            )
        ).trim();
    }

    async _getAllCommits() {
        const commitsDates = (
            await this.exec(
                `git log --author="${this.globalName}" --pretty="%cd"`
            )
        )
            .split('\n')
            .map((date) => new Date(date).toDateString());

        commitsDates.pop(); // delete last empty date

        const calendar = populateCalendar();

        commitsDates.forEach((cd) => {
            calendar[cd] += 1;
        });

        return calendar;
    }
}
