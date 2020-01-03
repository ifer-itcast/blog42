module.exports = con => {
    // #1 引入加密模块
    const crypto = require('crypto');
    // #2 指定加密算法、密钥
    const hmac = crypto.createHmac('sha256', 'secret-key');
    // #3 指定加密的内容
    hmac.update(con);
    // #4 以16进制形式输出加密结果
    return hmac.digest('hex');
};