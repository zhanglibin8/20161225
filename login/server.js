var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    app = express();
app.use(express.static(path.resolve('public')));
app.set('view engine','html');
app.set('views',path.resolve('views'));
app.engine('html',require('ejs').__express);
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    resave:true, //每次重新请求的时候都会重新保存session
    saveUninitialized:true, //不管用不用都进行初始化 false表示使用session时才会初始化
    secret:'zfpx' //加密cookie
}));
var user = require('./routes/user');

app.use('/user',user);

app.listen(9090);