const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    let page = req.query.page || 1;
    // page => 显示哪一页
    // size => 一页显示多少条
    // display => 前端需要展示多少页
    // exec    => 执行前面的查询操作
    let articles = await pagination(Article).find().populate('author').page(page).size(2).display(5).exec();
    // res.send(articles);
    res.render('home/default', {
        articles,
        username: req.session.username
    });
};