const { student } = require("../../models");
const http = require("http");

const controller = {};

/**
 * Compare two date strings wheteher they are equal or not
 * @param {String} date1 Valid date string in format YYYY-MM-DD
 * @param {String} date2 Valid date string in format YYYY-MM-DD
 * @returns {Boolean}
 */
const compareDates = (date1, date2) => {
    date1 = new Date(date1);
    date2 = new Date(date2);
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
};

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
const login = async (req, res) => {
    res.render("student/login", {status: 200});
};

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
const home = async (req, res) => {
    const rollNo = req.body.rollNo;
    const dob = req.body.dob;
    const result = await student.findByPk(rollNo);
    if (result == null) {
        res.status(404);
        res.render("student/login", {
            status: 404,
            message: `No record found. Check your Roll No.: ${rollNo}`
        });
    } else {
        const studentRec = result.dataValues;
        const formatDob = new Date(studentRec.dob).toLocaleDateString("en-GB", {dateStyle: "long"});
        studentRec.dob =formatDob;

        if (compareDates(studentRec.dob, dob)) {
            res.render("student/home", {
                status: 200,
                data: studentRec,
                loggedin: true
            });
        } else {
            res.status(401);
            res.render("student/login", {
                status: 401,
                message: "Roll No. and Date of birth does not match."
            });
        }
    }
}

controller.login = login;
controller.home = home;

module.exports = controller;