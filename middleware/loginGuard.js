module.exports = (req, res, next) => {
    // 如果用户访问的不是 /login，并且如果用户的 session 信息不存在
    if (req.url !== '/login' && !req.session.username) {
        // 让重新登录
        res.redirect('/admin/login');
    } else {
        // 再次根据角色进行处理
        // 只有这些路由地址需要调整到首页，其他的都不需要管，例如 /login、/logout
        let notEntry = ['/user', '/user-edit', '/article', '/article-edit'];
        if (req.session.role === 'normal' && notEntry.includes(req.url)) {
            return res.redirect('/home')
        }
        next();
    }
};