const express = require('express');

// 得到一个服务器对象
const app = express();

// /home 开头的前台相关的
app.use('/home', require('./route/home'));
// /admin 开头的后台管理相关的
app.use('/admin', require('./route/admin'));

// 设置端口
app.listen(3000, () => console.log('Server running on http://localhost:3000'));