const { User } = require('../../model/user');
module.exports = async (req, res) => {
    try {
        await User.findOneAndDelete({_id: req.query.id});
    } catch (err) {
        return next(JSON.stringify({
            path: '/admin/user',
            message: '删除失败'
        }));
    }
    
    res.redirect('/admin/user');
};