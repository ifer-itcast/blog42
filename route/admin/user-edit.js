const { User } = require('../../model/user');

module.exports = async (req, res) => {
    const { message, id } = req.query;

    // 根据是否有 id 来区分是修改还是添加
    if (id) {
        let user = await User.findOne({_id: id});
        // 修改
        res.render('admin/user-edit', {
            message,
            user,
            link: '/admin/user-modify',
            buttonText: '修改'
        });
    } else {
        // 添加
        res.render('admin/user-edit', {
            message,
            link: '/admin/user-edit',
            buttonText: '添加'
        });
    }
};