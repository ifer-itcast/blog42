const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// 连接数据库
require('./model/connect');
// const { User } = require('./model/user');

// 得到一个服务器对象
const app = express();

app.use(bodyParser.urlencoded({extended: false}));

// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));

// 模板文件相关的配置
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

// /home 开头的前台相关的
app.use('/home', require('./route/home'));
// /admin 开头的后台管理相关的
app.use('/admin', require('./route/admin'));

// 设置端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));