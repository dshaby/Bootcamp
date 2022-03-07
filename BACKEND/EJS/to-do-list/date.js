const today = new Date();

// Today's full date
exports.getDate = function () {
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    return fullDate = today.toLocaleDateString("en-US", options);
}
// Weekday or Weekend?
exports.getTypeofDay = function () {
    let currentDay = today.getDay();

    if (currentDay === 6 || currentDay === 0) {
        return "Weekend!"
    } else {
        return "Weekday";
    }
}