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

        var currDate = new Date();
        var tmp = new Date(currDate.getTime());
        var lowerFirstHalf = new Date(tmp.setMonth(currDate.getMonth() - 6));
        tmp = new Date(currDate.getTime());
        var lowerSecondHalf = new Date(tmp.setMonth(currDate.getMonth() + 6));

        const calendar = getDates(lowerFirstHalf, lowerSecondHalf);

        commitsDates.forEach((cd) => {
            calendar[cd] += 1;
        });

        return calendar;
    }
}

function getDates(startDate, endDate) {
    const dates = {};
    let currentDate = startDate;
    const addDays = function (days) {
        const date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
    while (currentDate <= endDate) {
        dates[currentDate.toDateString()] = 0;
        currentDate = addDays.call(currentDate, 1);
    }
    return dates;
}
