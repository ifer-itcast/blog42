const Comment = require('../../model/comment');
module.exports = async (req, res) => {
    // 合并后面的数据到 req.body 上，浅拷贝
    Object.assign(req.body, {time: new Date()});
    // 添加到数据库
    await Comment.create(req.body);
    // 添加成功跳转到当前的文章详情页面
    res.redirect('/home/article?id='+req.body.aid);
};