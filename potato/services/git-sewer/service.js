import { populateCalendar } from '../../utils/populate-calendar.js';

export class GitSewer {
    constructor(gitDateGetter, isLocal) {
        this.exec = gitDateGetter;
        this.isLocal = isLocal;
        this.gitExist = false;
    }

    async init() {
        const version = await this.exec('git --version');
        this.gitExist = version?.includes('git version');
        if (this.gitExist) {
            this.globalName = await this._getGlobalUserName();
            this.myCommits = await this._getAllCommits();
            return;
        }

        throw new Error('There is no GIT in system');
    }

    getSq() {
        return this.myCommits;
    }

    async _getGlobalUserName() {
        let name = '';
        try {
            name = await this.exec('git config --local user.name');
        } catch (err) {
            if (!this.isLocal) {
                name = await this.exec('git config --global user.name');
            }
        }

        if (name === '') {
            throw new Error('Git user.name is empty');
        }

        return name.trim();
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
