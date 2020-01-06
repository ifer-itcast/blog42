const { User } = require('../../model/user');

module.exports = async (req, res) => {
    // 添加 user 标识，证明是用户相关的页面
    req.app.locals.currentLink = 'user';

    const { message, id } = req.query;

    // 根据是否有 id 来区分是修改还是添加
    if (id) {
        let user = await User.findOne({_id: id});
        // 修改
        res.render('admin/user-edit', {
            message,
            user,
            link: '/admin/user-modify?id='+id,
            buttonText: '修改',
            username: req.session.username
        });
    } else {
        // 添加
        res.render('admin/user-edit', {
            message,
            link: '/admin/user-edit',
            buttonText: '添加',
            username: req.session.username
        });
    }
};