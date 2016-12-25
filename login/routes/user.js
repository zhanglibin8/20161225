var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    router = express.Router(),
    error = {};
router.get('/signup',function (req, res) {
    res.render('signup',{err:req.session.zhuceerror})
});
router.post('/signup',function (req, res) {
    getUsers(function (data) {
        var user = data.find(function (item) {
            return item.username == req.body.username;
        });
        if(user){
            req.session.zhuceerror='用户名已存在';
            req.session.user = user;
            res.redirect('/user/signup')
        }else {
            data.push(req.body);
            setUsers(data,function () {
                res.redirect('/user/signin')
            })
        }
    })
});
router.get('/signin',function (req, res) {
    req.session.zhuceerror = '';
    res.render('signin',{err:req.session.loginerror})
});
router.post('/signin',function (req, res) {
    getUsers(function (data) {
        var user = data.find(function (item) {
            return item.username == req.body.username && item.password == req.body.password;
        });
        if(user){
            res.redirect('/user/welcome')
        }else {
            req.session.loginerror='用户名或密码错误';
            res.redirect('/user/signin',{user:req.session.user});
        }
    })
});
router.get('/welcome',function (req, res) {
    res.render('welcome')
});
function getUsers(callback) {
    fs.readFile('./json/user.json','utf-8',function (err, data) {
        err ? callback([]) : callback(JSON.parse(data));
    })
}
function setUsers(data,callback) {
    fs.writeFile('./json/user.json',JSON.stringify(data),callback);
}
module.exports = router;