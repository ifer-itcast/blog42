module.exports = (req, res, next) => {
    // 如果用户访问的不是 /login，并且如果用户的 session 信息不存在
    if (req.url !== '/login' && !req.session.username) {
        // 让重新登录
        res.redirect('/admin/login');
    } else {
        // 再次根据角色进行处理
        if (req.session.role === 'normal') {
            return res.redirect('/home')
        }
        next();
    }
};