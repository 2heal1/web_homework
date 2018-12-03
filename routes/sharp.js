var mysql = require('mysql');
var session = require('session');
module.exports = {
    reg: function (req, res) {
        var postArgs = req.body;
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        dbConnection.query('INSERT INTO users SET ?', {
            id: postArgs.id,
            password: postArgs.password,
            email:postArgs.email,
        }, function (err, result) {
            if (err) {
                console.log(err);
                dbConnection.end();
                //throw err;
            } else {
                    res.send('<script> window.location.href="http://localhost:3019/Login/login.html";alert("注册成功")</script>').end();
            }
            dbConnection.end();
        });
        // }, function (err, rows) {
        //     if (err) {
        //         console.log(err);
        //         dbConnection.end();
        //         //throw err;
        //     }else {
        //         // if(rows.length==0){
        //         //     res.send('1').end();
        //         //     // res.send('<script> window.location.href="https://localhost:3009/login/login.html/";alert("注册成功")</script>').end();
        //         // }
        //         // else{
        //             res.send('2').end();
        //             // res.send('<script>alert("用户已存在");window.location.href="https://localhost:3009/Register/register.html/"</script>').end();
        //         // }
        //     }

            // dbConnection.end();
        // });

    },
    login: function (req, res) {
        var username = req.body.email;
        var password = req.body.password;
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        dbConnection.query('SELECT * FROM users WHERE email=?',username, function (err, rows) {
            if (err) {
                console.log(err);
                dbConnection.end();
                // throw err;
            } else {
                if (rows.length == 0) {
                    res.send('<script>window.location.href="http://localhost:3019/Login/login.html";alert("此用户不存在")</script>');
                } else {
                    if (rows[0].password == password) {
                        //登陆成功
                        //给予session
                        req.session.user=username;
                            res.render('index', { a: '<a id="person" name="person"></a>'});
                        dbConnection.end();
                    } else {
                        //密码错误
                        res.status(400).send('alert("密码错误")').end();
                    }
                }
            }

        });
    },
    search:function (req,res) {
    //创建数据库连接
    var dbConnection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'zh19980630',
        database: 'sharp'
    });
    //查询表内容
    //example: http://localhost:3000/getWorkers?workerId=1
        dbConnection.query('SELECT * FROM products Where pname regexp ?', [req.body.pname], function(err, rows, fields) {
            if (err) throw err;
            //如果查询无结果
            if (rows.length==0)
                res.send("<h1>not found</h1>");
            else {
                var json_res = {"count":rows.length,"pname2":rows};
                var string_res = JSON.stringify(json_res);
                res.send(string_res);
                // var string_res = JSON.stringify(rows);
                // res.send(string_res);
            }
        dbConnection.end();
    });
},
    searchprice:function (req,res) {
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        //查询表内容
        //example: http://localhost:3000/getWorkers?workerId=1
        dbConnection.query('SELECT * FROM products Where price>?', [req.body.price], function(err, rows, fields) {
            if (err) throw err;
            //如果查询无结果
            if (rows.length==0)
                res.send("<h1>not found</h1>");
            else {
                var json_res = {"count":rows.length,"price2":rows};
                var string_res = JSON.stringify(json_res);
                res.send(string_res);
                // var string_res = JSON.stringify(rows);
                // res.send(string_res);
            }
            dbConnection.end();
        });
    },
    insertshop: function (req, res) {
        var postArgs = req.body;
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        dbConnection.query('INSERT INTO shopcar SET ?', {
            sname: postArgs.sname,
            snum:postArgs.snum,
            email:req.session.user,
        }, function (err, result) {
            if (err) {
                console.log(err);
                dbConnection.end();
                //throw err;
            } else {

            }
            dbConnection.end();
        });

    },
    searchshopcar:function (req,res) {
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        //查询表内容
        //example: http://localhost:3000/getWorkers?workerId=1
        dbConnection.query('SELECT * FROM products,shopcar Where pname=sname and shopcar.email= '+" '"+req.session.user+" '",  function(err, rows, fields) {
            if (err) throw err;
            //如果查询无结果
            if (rows.length==0)
                res.send("<h1>not found</h1>");
            else {
                var json_res = {"count":rows.length,"shopcar":rows};
                var string_res = JSON.stringify(json_res);
                res.send(string_res);
                // var string_res = JSON.stringify(rows);
                // res.send(string_res);
            }
            dbConnection.end();
        });
    },
    insertform: function (req, res) {
        var postArgs = req.body;
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        dbConnection.query('INSERT INTO form SET ?', {
            fname: postArgs.fname,
            fnum:postArgs.fnum,
            fprice: postArgs.fprice,
            email:req.session.user,
        }, function (err, result) {
            if (err) {
                console.log(err);
                dbConnection.end();
                //throw err;
            } else {

            }
            dbConnection.end();
        });

    },
    searchform:function (req,res) {
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        //查询表内容
        //example: http://localhost:3000/getWorkers?workerId=1
        dbConnection.query('SELECT * FROM form where email='+" '"+req.session.user+" '" , function(err, rows, fields) {
            if (err) throw err;
            //如果查询无结果
            if (rows.length==0)
                res.send("<h1>not found</h1>");
            else {
                var json_res = {"count":rows.length,"form":rows};
                var string_res = JSON.stringify(json_res);
                res.send(string_res);
                // var string_res = JSON.stringify(rows);
                // res.send(string_res);
            }
            dbConnection.end();
        });
    },
    searchfaddress:function (req,res) {
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        //查询表内容
        //example: http://localhost:3000/getWorkers?workerId=1
        dbConnection.query('SELECT * FROM address where email= '+" '"+req.session.user+" '",  function(err, rows, fields) {
            if (err) throw err;
            //如果查询无结果
            if (rows.length==0)
                res.send("<h1>not found</h1>");
            else {
                var json_res = {"count":rows.length,"address":rows};
                var string_res = JSON.stringify(json_res);
                res.send(string_res);
                // var string_res = JSON.stringify(rows);
                // res.send(string_res);
            }
            dbConnection.end();
        });
    },
    insertadd: function (req, res) {
        var postArgs = req.body;
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        dbConnection.query('INSERT INTO address SET ?', {
            province: postArgs.province,
            city: postArgs.city,
            town: postArgs.town,
            street: postArgs.street,
            email:req.session.user,
        }, function (err, result) {
            if (err) {
                console.log(err);
                dbConnection.end();
                //throw err;
            } else {
                res.send('<script> window.location.href="http://localhost:3019/address";alert("修改成功")</script>').end();
            }
            dbConnection.end();
        });

    },
    insertemail: function (req, res) {
        var postArgs = req.body;
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        dbConnection.query('INSERT INTO email SET ?', {
            email: postArgs.email,
        }, function (err, result) {
            if (err) {
                console.log(err);
                dbConnection.end();
                //throw err;
            } else {
                res.send('<script> window.location.href="http://localhost:3019/";alert("订阅成功")</script>').end();
            }
            dbConnection.end();
        });

    },
    insertfav: function (req, res) {
        var postArgs = req.body;
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        dbConnection.query('INSERT INTO favourite SET ?', {
            fname: postArgs.fname,
            fnum: postArgs.fnum,
            fprice: postArgs.fprice,
        }, function (err, result) {
            if (err) {
                console.log(err);
                dbConnection.end();
                //throw err;
            } else {

            }
            dbConnection.end();
        });

    },
    deleteadd: function (req, res) {
        var postArgs = req.body;
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        dbConnection.query('delete from address where no=?', [req.body.no] ,function (err, result) {
            if (err) {
                console.log(err);
                dbConnection.end();
                //throw err;
            } else {
                res.send('<script> window.location.href="http://localhost:3019/address";alert("删除成功")</script>').end();
            }
            dbConnection.end();
        });

    },
    deleteshopcar: function (req, res) {
        var postArgs = req.body;
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        dbConnection.query('delete from address where email=?', [req.body.email] ,function (err, result) {
            if (err) {
                console.log(err);
                dbConnection.end();
                //throw err;
            } else {
                res.send('<script> window.location.href="http://localhost:3019/form";alert("结算成功！")</script>').end();
            }
            dbConnection.end();
        });

    },
    updateadd: function (req, res) {
        var postArgs = req.body;
        //创建数据库连接
        var dbConnection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: 'zh19980630',
            database: 'sharp'
        });
        dbConnection.query('update address set province=?,city=?,town=?,street=? where no=?',[req.body.province,req.body.city,req.body.town,req.body.street,req.body.no] ,function (err, result) {
            if (err) {
                console.log(err);
                dbConnection.end();
                //throw err;
            } else {
                res.send('<script> window.location.href="http://localhost:3019/address";alert("修改成功")</script>').end();
            }
            dbConnection.end();
        });

    },
}