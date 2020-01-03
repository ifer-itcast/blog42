const express = require('express');

// 得到一个路由对象
const admin = express.Router();

// http://localhost:3000/admin/login
admin.get('/login', (req, res) => {
    res.render('admin/login', {});
});

module.exports = admin;