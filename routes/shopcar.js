var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('shopcar', { a: '<a id="person" name="person"></a>' });
    } else {
        res.render('shopcar', {title: 'Express'});
    }
});
module.exports = router;
