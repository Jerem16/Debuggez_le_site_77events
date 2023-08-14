/**
 * @param {Date} date
 * @returns {string}
 */

export const MONTHS = {
    1: "janvier",
    2: "février",
    3: "mars",
    4: "avril",
    5: "mai",
    6: "juin",
    7: "juillet",
    8: "août",
    9: "septembre",
    10: "octobre",
    11: "novembre",
    12: "décembre",
};

export const getMonth = (date) => MONTHS[date.getMonth() + 1];
const currentDate = new Date();
const frenchMonth = getMonth(currentDate);

console.log(`The current month in French is: ${frenchMonth}`);
