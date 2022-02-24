// Today's full date
exports.getDate = function () {
    const today = new Date();
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
    const today = new Date();
    let currentDay = today.getDay();
    let dayCategory = "";

    if (currentDay === 6 || currentDay === 0) {
        dayCategory = "Weekend!";
    } else {
        dayCategory = "Weekday";
    }
    return dayCategory;
}