const { Article } = require('../../model/article');

module.exports = async (req, res) => {
    // 添加 article 标识，证明是文章相关的页面
    req.app.locals.currentLink = 'article';

    let articles = await Article.find().populate('author')

    res.render('admin/article', {
        username: req.session.username,
        articles
    });
};