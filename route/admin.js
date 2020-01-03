const express = require('express');

// 得到一个路由对象
const admin = express.Router();

// http://localhost:3000/admin/login
admin.get('/login', (req, res) => {
    res.render('admin/login', {});
});

admin.get('/user', (req, res) => {
    res.render('admin/user', {});
});

module.exports = admin;