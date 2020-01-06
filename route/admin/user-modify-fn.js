const { User } = require('../../model/user');
const hash = require('../../utils/hash');

module.exports = async (req, res, next) => {
    // 修改前的密码比对
    // 传递过来的密码和查询出来的密码进行比较
    const {password} = req.body;
    const id = req.query.id;

    let user = await User.findOne({_id: id});

    if(hash(password) === user.password) {
        // 允许修改
        res.send('ok');
    } else {
        // 不允许修改
        let obj = {
            path: '/admin/user-edit',
            message: '密码错误',
            id
        };
        next(JSON.stringify(obj));
    }
};