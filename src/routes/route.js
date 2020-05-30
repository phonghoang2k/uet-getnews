var express = require('express');
var router = express.Router();

const testfunc = require('../controllers/test_func');
const main_controller = require('../controllers/main_controller');

/* GET facebook verification. */
router.get('/', testfunc.verify);

/* POST facebook data. */
router.post('/', testfunc.postData);



module.exports = router;
