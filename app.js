const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const dateFormat = require('dateformat');
const template = require('art-template');

template.defaults.imports.dateFormat = dateFormat;

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

// 登录拦截代码
app.use('/admin', require('./middleware/loginGuard'));

// /home 开头的前台相关的
app.use('/home', require('./route/home'));
// /admin 开头的后台管理相关的
app.use('/admin', require('./route/admin'));

// 错误统一处理
app.use((err, req, res, next) => {
    let obj = JSON.parse(err); // {id: xxx, path: 'admin', message: xxx}
    let arr = [];
    for (let attr in obj) {
        if (attr != 'path') {
            arr.push(`${attr}=${obj[attr]}`);
        }
    }
    // arr => ["id=666", "message=错误"]
    res.redirect(`${obj.path}?${arr.join('&')}`);
});

// 设置端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));