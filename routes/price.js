var express = require('express');
var router = express.Router();

/* POST user info */
router.post('/', function(req, res, next) {
    var json_res = {"userData":"user","computedString":"￥"+parseInt(req.body.userName2)}
    var string_res = JSON.stringify(json_res);
    res.send(string_res);
});

module.exports = router;
