const Express = require("express");
const StudnetController = require("../controller/student")

const router = Express.Router();
router.get("", StudnetController.login);

router.post("", StudnetController.home);

module.exports = router