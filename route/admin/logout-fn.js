module.exports = (req, res) => {
    // 删除后端 session
    req.session.destroy(function() {
        // 删除前端的 cookie
        res.clearCookie('connect.sid');
        // 跳转到登录页面
        res.redirect('/admin/login');
    });
};