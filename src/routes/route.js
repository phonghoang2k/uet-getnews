var express = require("express");
var router = express.Router();

const testfunc = require("../controllers/test_func");
const main_controller = require("../controllers/main_controller");

/* GET facebook verification. */
router.get("/", main_controller.verify);

/* POST facebook data. */
router.post("/", main_controller.postData);

module.exports = router;
