

//登出处理


module.exports = {
    logout:function (req,res,next) {
        delete req.session.user;
        res.render('index', {title: 'Express'});
    }
}