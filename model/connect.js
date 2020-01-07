const mongoose = require('mongoose');

mongoose
	.connect('mongodb://elser:elser@localhost/blog42', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('~~~~~~~~数据连接成功~~~~~~~~'))
	.catch(err => console.log(err, '数据连接失败'));
