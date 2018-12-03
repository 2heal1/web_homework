var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.user){
        res.render('wuliu', { a: '<a id="person" name="person"></a>' });
    }else{
        res.render('wuliu', { title: 'Express' });
    }

});
module.exports = router;
