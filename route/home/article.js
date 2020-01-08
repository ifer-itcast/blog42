const { Article } = require('../../model/article');
const Comment = require('../../model/comment');

module.exports = async (req, res, next) => {
    /* if (req.query.id) {
        let article = await Article.findOne({_id: req.query.id}).populate('author');
        res.render('home/article', {
            article
        });
    } else {
        next(JSON.stringify({
            path: '/home'
        }))
    } */
    let article;
    let comments;
    try {
        article = await Article.findOne({_id: req.query.id}).populate('author');
        comments = await Comment.find({aid: req.query.id}).populate('uid');
        if(!article) {
            throw new Error('错误');
        }
    } catch (err) {
        return next(JSON.stringify({
            path: '/home'
        }))
    }
    res.render('home/article', {
        article,
        username: req.session.username,
        uid: req.session.uid,
        comments
    });
};