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

// 新增用户的界面
admin.get('/user-edit', require('./admin/user-edit'));

// 新增用户功能
admin.post('/user-edit', require('./admin/user-edit-fn'));

// 修改用户信息功能
admin.post('/user-modify', require('./admin/user-modify-fn'));

// 删除用户
admin.get('/delete', require('./admin/user-delete-fn'));

module.exports = admin;