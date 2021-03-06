const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');
const template = require('art-template');
const morgan = require('morgan');
const favicon = require('serve-favicon')

template.defaults.imports.dateFormat = dateFormat;

// 连接数据库
require('./model/connect');
// const { User } = require('./model/user');

// 得到一个服务器对象
const app = express();

// 解析 POST 数据
app.use(bodyParser.urlencoded({extended: false}));
// Session 相关配置
app.use(require('./middleware/session')());
// 配置 favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// 区分不同的环境做不同的事情
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    console.log('生产环境');
}

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
    console.log(err, 23333)
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