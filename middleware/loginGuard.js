module.exports = (req, res, next) => {
    // 如果用户访问的不是 /login，并且如果用户的 session 信息不存在
    if (req.url !== '/login' && !req.session.username) {
        // 让重新登录
        res.redirect('/admin/login');
    } else {
        next();
    }
};