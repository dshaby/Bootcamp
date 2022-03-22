const today = new Date();

// TODAYS DATE
exports.todaysDate = function () {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return today.toLocaleDateString("en-US", options);
}

// WEEKDAY or WEEKEND?
exports.weekend = function () {
    const dayOfWeek = today.getDay(); //0-6
    // const weekend = () => {
    const isWeekend = (dayOfWeek === 6) || (dayOfWeek === 0);
    if (isWeekend === true) {
        return "It's the Weekend!!!!"
    } else {
        return "It's the Weekday"
    }
    // };
}

// module.exports.weekend = weekend();
// module.exports.todaysDate = todaysDate;