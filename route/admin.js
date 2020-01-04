const express = require('express');


// 得到一个路由对象
const admin = express.Router();

// 登录页面
admin.get('/login', require('./admin/loginPage'));

// 用户页面
admin.get('/user', require('./admin/userPage'));

// 登录功能
admin.post('/login', require('./admin/login-fn'));

// 退出功能
admin.get('/logout', require('./admin/logout-fn'));

module.exports = admin;