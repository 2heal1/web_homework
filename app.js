var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session=require('express-session');
var router = express.Router();

var index = require('./routes/index');
var users = require('./routes/users');
var price=require('./routes/price');
var logout = require('./routes/logout');
var sheep=require('./routes/sheep');
var personal=require('./routes/personal');
var shopcar=require('./routes/shopcar');
var products=require('./routes/products');
var wuliu=require('./routes/wuliu');
var form=require('./routes/form');
var address=require('./routes/address');
var address2=require('./routes/address2');
var address3=require('./routes/address3');
var address4=require('./routes/address4');
var sharp=require('./routes/sharp');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('dawfxadawd'));
// app.use('/', indexRouter);
app.use(cookieParser());
app.use(session({
    name: "uzh",
    secret:'12345',
    cookie:{
        maxAge:60000
    },
    resave:false,
    saveUninitialized:true
}));


app.use('/users', users);
app.use('/price', price);
app.use('/sheep', sheep);
app.use('/personal', personal);
app.use('/shopcar', shopcar);
app.use('/products',products);
app.use('/wuliu',wuliu);
app.use('/form',form);
app.use('/address',address);
app.use('/address2',address2);
app.use('/address3',address3);
app.use('/address4',address4);


app.all('*', function(req, res, next) {
    if (req.method=='GET') {
        if (req.url == '/' || req.url == '/index') {
            index(req, res);
        }
        else if (req.url == '/getUsers') {
            users.mock(req, res);
        }
        else {
            res.send('no ideaaa!');
        }

    }
    if (req.method=='POST'){
        if(req.url=='/reg'){
            sharp.reg(req,res);
        }else if(req.url=='/login'){
            sharp.login(req,res);
        }
        else if(req.url=='/search'){
            sharp.search(req,res);
        }else if(req.url=='/searchprice'){
            sharp.searchprice(req,res);
        }else if(req.url=='/insertshop'){
            sharp.insertshop(req,res);
        }
        else if(req.url=='/searchshopcar'){
            sharp.searchshopcar(req,res);
        }else if(req.url=='/insertform'){
            sharp.insertform(req,res);
        }else if(req.url=='/searchform'){
            sharp.searchform(req,res);
        }else if(req.url=='/searchfaddress'){
            sharp.searchfaddress(req,res);
        }else if(req.url=='/insertadd'){
            sharp.insertadd(req,res);
        }else if(req.url=='/insertemail'){
            sharp.insertemail(req,res);
        }else if(req.url=='/deleteadd'){
            sharp.deleteadd(req,res);
        }else if(req.url=='/updateadd'){
            sharp.updateadd(req,res);
        }else if(req.url=='/deleteshopcar'){
            sharp.deleteshopcar(req,res);
        } else if(req.url=='/logout'){
            logout.logout(req,res);
        }
        else{
            res.send('no idea!');
        }
    }

});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
