export class GitSewer {
    constructor(gitDateGetter) {
        this.exec = gitDateGetter;
    }

    async init() {
        this.globalName = await this._getGlobalUserName();
        this.myCommits = await this._getAllCommits();
    }

    getSq() {
        return this.myCommits;
    }

    async _getGlobalUserName() {
        return await this.exec('git config --global user.name');
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

        return commitsDates.reduce((acc, cd) => {
            if (acc[cd] !== undefined) {
                return {
                    ...acc,
                    [cd]: acc[cd] + 1,
                };
            } else {
                return {
                    ...acc,
                    [cd]: 0,
                };
            }
        }, {});
    }
}
