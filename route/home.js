const express = require('express');

// 得到一个路由对象
const home = express.Router();

// 首页
home.get('/', require('./home/index'));
// 详情页
home.get('/article', require('./home/article'));

module.exports = home;