const path = require('path');
const formidable = require('formidable');
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    // 1. 生成一个 form 表单对象
    const form = new formidable.IncomingForm();
    // 2. 配置上传文件的路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3. 保留文件的后缀
    form.keepExtensions = true;
    // 4. 解析表单
    form.parse(req, async function(err, fields, files) {
        // fields => 普通数据
        // files  => 文件相关的数据
        let {title, author, publishDate,content} = fields;
        let cover = files.cover.path.split('public')[1];
        await Article.create({title, author, publishDate,content,cover});
        res.redirect('/admin/article');
    });
};