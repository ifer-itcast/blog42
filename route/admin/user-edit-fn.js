const Joi = require('joi');
const { User, validator } = require('../../model/user');
const hash = require('../../utils/hash');

module.exports = async (req, res, next) => {
    try {
        await validator(req.body);
    } catch (err) {
        // err.message
        // return res.redirect(`/admin/user-edit?message=${err.message}`);
        let obj = {
            path: '/admin/user-edit',
            message: err.message
        };
        return next(JSON.stringify(obj));
    }
    
    // 说明前面的校验规则都通过了
    // 先检测邮箱是否已存在
    let user = await User.findOne({email: req.body.email});
    if (user) {
        // 说明此邮箱已存在，不允许重复添加
        // return res.redirect(`/admin/user-edit?message=此邮箱已存在`);
        let obj = {
            path: '/admin/user-edit',
            message: '此邮箱已存在'
        };
        return next(JSON.stringify(obj));
    }

    // 对传递过来的密码进行加密
    req.body.password = hash(req.body.password);

    // 添加到数据
    await User.create(req.body);

    // 跳转到用户界面
    res.redirect('/admin/user');
};