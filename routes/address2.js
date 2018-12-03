var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('address2', { a: '<a id="person" name="person"></a>' });
    } else {
        res.render('address2', {title: 'Express'});
    }
});
module.exports = router;
