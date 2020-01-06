const { User } = require('../../model/user');
module.exports = async (req, res) => {
    try {
        await User.findOneAndDelete({_id: req.query.id});
    } catch (err) {
        // 传递的 ID 不存在，会删除失败，那就跳转到用户列表页面
        return next(JSON.stringify({
            path: '/admin/user',
            message: '删除失败'
        }));
    }
    // 删除成功也跳转到用户列表
    res.redirect('/admin/user');
};