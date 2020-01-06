const path = require('path');
const formidable = require('formidable');

module.exports = (req, res) => {
    // 1. 生成一个 form 表单对象
    const form = new formidable.IncomingForm();
    // 2. 配置上传文件的路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3. 保留文件的后缀
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        // fields => 普通数据
        // files  => 文件相关的数据
        res.send(files);
    });
};