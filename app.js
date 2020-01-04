const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

// 连接数据库
require('./model/connect');
// const { User } = require('./model/user');

// 得到一个服务器对象
const app = express();

// 解析 POST 数据
app.use(bodyParser.urlencoded({extended: false}));
// 登陆配置
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false, // 清除未初始化的 SessionID
    cookie: {
        maxAge: 24 * 60 * 60 * 1000 // 一天后 cookie 过期
    }
}));

// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));

// 模板文件相关的配置
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

app.use('/admin', (req, res, next) => {
    // 如果用户访问的不是 /login，并且如果用户的 session 信息不存在
    if (req.url !== '/login' && !req.session.username) {
        // 让重新登录
        res.redirect('/admin/login');
    } else {
        next();
    }
});

// /home 开头的前台相关的
app.use('/home', require('./route/home'));
// /admin 开头的后台管理相关的
app.use('/admin', require('./route/admin'));

// 设置端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));