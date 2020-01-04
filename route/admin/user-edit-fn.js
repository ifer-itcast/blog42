const Joi = require('joi');
const { User } = require('../../model/user');
const hash = require('../../utils/hash');

module.exports = async (req, res) => {
    // 定义规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合规则')),
        email: Joi.string().email().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };

    try {
        await Joi.validate(req.body, schema);
    } catch (err) {
        // err.message
        return res.redirect(`/admin/user-edit?message=${err.message}`);
    }
    
    // 说明前面的校验规则都通过了
    // 先检测邮箱是否已存在
    let user = await User.findOne({email: req.body.email});
    if (user) {
        // 说明此邮箱已存在，不允许重复添加
        return res.redirect(`/admin/user-edit?message=此邮箱已存在`);
    }

    // 对传递过来的密码进行加密
    req.body.password = hash(req.body.password);

    // 添加到数据
    await User.create(req.body);

    // 跳转到用户界面
    res.redirect('/admin/user');
};