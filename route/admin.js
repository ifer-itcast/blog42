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

admin.post('/login', (req, res) => {
    const {email, password} = req.body;
    if(email.trim().length === 0 || password.trim().length === 0) {
        res.render('admin/error', {
            msg: '用户名不能为空'
        });
    }
});

module.exports = admin;