const express = require('express');

// 得到一个路由对象
const home = express.Router();

home.get('/', (req, res) => {
    res.send('前台首页');
});

module.exports = home;