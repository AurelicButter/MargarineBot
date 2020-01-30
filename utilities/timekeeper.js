/**
 * Combines a specific label with a count
 * @param { Number } time - Required. Any number. 
 * @param { String} label - Required. Any label.
 * @returns { String } Returns a time + label format. Example: "60 minutes"
 */
function properLabel(time, label) {
    if (time === 0) { return null; }
    if (time === 1) { return ` ${time} ${label}`; }

    return ` ${time} ${label}s`;
}

module.exports = {
    /**
     * Creates a human readable string from a process.uptime.
     * @param { Number } time - A process.uptime count.
     * @returns { String } Returns a human readable time count. For example, "1 hour, 23 minutes, and 12 seconds"
     */
    elapsedTime: (time) => {
        var second = Math.floor(time / 1000);
        var minute = Math.floor(second / 60);
        var hour = Math.floor(minute / 60);
        var day = Math.floor(hour / 24);

        //Time and display correction.
        var lblTime = [properLabel(second % 60, "second"), properLabel(minute % 60, "minute"), properLabel(hour % 24, "hour"), properLabel(day, "day")];
        lblTime = lblTime.filter(function(t) { return t; });
        if (lblTime.length > 1) { lblTime[0] = ` and ${lblTime[0]}`; } //Adds an "and" to sound better in the display
        lblTime.reverse();

        if (lblTime.length === 2) { return lblTime.join(""); } //Commas for two items is bad English.
        return lblTime.join();
    },

    /**
     * Creates a human readable date from a date object
     * @param { Date } date - Required
     * @returns { String } Returns a human readable date. For example, "May 26, 2017"
     */
    dateMaker: (date) => {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var d = date.toLocaleString().split(" ")[0].split("/");

        return `${months[d[0]]} ${d[1]}, ${d[2].slice(0, -1)}`;
    }
};