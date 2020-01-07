const pagination = require('mongoose-sex-page');
const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    // 添加 article 标识，证明是文章相关的页面
    req.app.locals.currentLink = 'article';
    let page = req.query.page || 1;
    // page => 代表当前页
    // size => 一页显示多少条
    // display => 要展示多少页
    // exec => 执行前面的查询操作
    let articles = await pagination(Article).find().page(page).size(2).display(5).populate('author').exec();
    // return res.send(articles);
    res.render('admin/article', {
        username: req.session.username,
        articles
    });
};