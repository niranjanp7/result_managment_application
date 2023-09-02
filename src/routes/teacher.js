const Express = require("express");
const TeacherController = require("../controller/teacher")

const router = Express.Router();
router.get("", TeacherController.loginPage);
router.post("", TeacherController.login);
router.get("/edit", TeacherController.editPage);
router.post("/edit", TeacherController.edit);
router.delete("/:rollNo", TeacherController.deleteRec);

module.exports = router