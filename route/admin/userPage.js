const { User } = require('../../model/user');

module.exports = async (req, res) => {
    // 添加 user 标识，证明是用户相关的页面
    req.app.locals.currentLink = 'user';

    // 获取当前页，如果没有传递 page 默认就是第一页
    let page = req.query.page || 1;
    // 规定每一页显示多少条
    let pagesize = 2;
    // 获取总的条数
    let count = await User.countDocuments();
    // 计算前端要展示多少页码
    let total = Math.ceil(count / pagesize);

    // 第 1 页  跳过 0 条
    // 第 2 页  跳过 2 条
    // 第 3 页  跳过 4 条
    // start 代表查询的时候要跳过多少条
    let start = (page - 1) * pagesize;

    const users = await User.find().skip(start).limit(pagesize);

    res.render('admin/user', {
        username: req.session.username,
        users,
        total,
        page
    });
};