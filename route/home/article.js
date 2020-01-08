const { Article } = require('../../model/article');

module.exports = async (req, res, next) => {
    if (req.query.id) {
        let article = await Article.findOne({_id: req.query.id}).populate('author');
        res.render('home/article', {
            article
        });
    } else {
        next(JSON.stringify({
            path: '/home'
        }))
    }
};