const { teacher, student } = require("../../models");
const http = require("http");

const controller = {};;

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
const loginPage = async (req, res) => {
    res.render("teacher/login", {status: 200});
};

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
const login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = await teacher.findByPk(username);
    if (result == null) {
        res.status(404);
        res.render("teacher/login", {
            status: 404,
            message: `Username: ${username} does not exist.`
        });
    } else {
        const teacherRec = result.dataValues;

        if (password === teacherRec.password) {
            home(req, res, teacherRec);
        } else {
            res.status(401);
            res.render("teacher/login", {
                status: 401,
                message: "Username and Password does not match."
            });
        }
    }
};

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 * @param {teacher.dataValues} teacherRec
 */
const home = async (req, res, teacherRec) => {
        const studentList = await student.findAll();
        let studentData = [];
        for (let i of studentList) {
            const dob = new Date(i.dataValues.dob);
            i.dataValues.dob = String(dob.getDate()).padStart(2, "0") + "-" + String(dob.getMonth()).padStart(2, "0") + "-" + dob.getFullYear();
            studentData.push(i.dataValues);
        }

        res.render("teacher/home", {
            status: 200,
            data: teacherRec,
            students: studentData,
            loggedin: true
        });
}

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
const editPage = async (req, res) => {
    const rollNo = req.query.rollNo;
    let studentRec = {
        rollNo: "",
        name: "",
        dob: "",
        score: 0
    }
    if (rollNo !== undefined) {
        studentRec = (await student.findByPk(rollNo)).dataValues;
    }
    res.render("teacher/edit", {status: 200, loggedin: true, student: studentRec});
};

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
const edit = async (req, res) => {
    const studentRec = req.body;
    const result = await student.upsert(studentRec, {where: {rollNo: studentRec.rollNo}});
    home(req, res);
};

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
const deleteRec = async (req, res) => {
    const result = await student.destroy({where: {rollNo: req.params.rollNo}});
    res.json({deleted: result});
};

controller.loginPage = loginPage;
controller.login = login;
controller.editPage = editPage;
controller.edit = edit;
controller.deleteRec = deleteRec;

module.exports = controller;