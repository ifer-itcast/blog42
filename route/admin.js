const express = require('express');
const { User } = require('../model/user');

// 得到一个路由对象
const admin = express.Router();

// http://localhost:3000/admin/login
admin.get('/login', (req, res) => {
    res.render('admin/login', {});
});

admin.get('/user', (req, res) => {
    res.render('admin/user', {});
});

admin.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if(email.trim().length === 0 || password.trim().length === 0) {
        return res.status(400).render('admin/error', {
            msg: '邮箱或密码不能为空'
        });
    }

    // 通过校验
    // 先查询这个邮箱是否注册过
    let user = await User.findOne({email});
    if (user) {
        // 至少邮箱存在
        // 如果查询出来的密码和传递过来的密码一致，才允许登录
        if (user.password === password) {
            res.send('登录成功');
        } else {
            // 密码错误
            return res.status(400).render('admin/error', {
                msg: '密码错误'
            });
        }
    } else {
        // 邮箱根本就不存在
        return res.status(400).render('admin/error', {
            msg: '邮箱不存在'
        });
    }
});

module.exports = admin;