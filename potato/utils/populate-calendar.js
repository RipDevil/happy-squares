export const populateCalendar = () => {
    var currDate = new Date();
    var tmp = new Date(currDate.getTime());
    var lowerFirstHalf = new Date(tmp.setMonth(currDate.getMonth() - 12));

    return getDates(lowerFirstHalf, currDate.getTime());
};

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
