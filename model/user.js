const mongoose = require('mongoose');

// 创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // undefined、null
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        unique: true // 保证邮箱唯一
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0 // 0 => 启用，1 => 禁用
    }
});

// 根据集合规则创建集合
const User = mongoose.model('User', userSchema); // users

/* User.create({
    username: "ifer",
    email: "ifer@qq.com",
    password: "ifer",
    role: "admin",
    state: 0
}).then(res => console.log(res)).catch(err => console.log(err)); */

module.exports = {
    User
};