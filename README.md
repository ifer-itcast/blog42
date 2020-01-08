# 最后完善的内容

## Session 持久化

**app.js 新增如下**

```javascript
// Session 相关配置
app.use(require('./middleware/session')());
```

**middleware 文件夹中新增 session.js，注意里面有注释**

## 去除了 MongoDB 的警告

**model/connect.js 中新增如下**

```javascript
mongoose.set('useCreateIndex', true);
```

## 前台页面登录的情况下就显示退出，否则显示登录

**views/home/common/header.art 中修改如下**

```javascript
{{if username}}
<a href="/admin/logout">退出</a>
{{else}}
<a href="/admin/login">登录</a>
{{/if}}
```

**当然 route/home/index.js 也需要把对应的 username 传递过去**

```javascript
res.render('home/default', {
    articles,
    username: req.session.username
});
```

**退出时会出现问题，修改了 middleware/loginGuard.js 的代码**

## 加了 serve-favicon

```javascript
// app.js
const favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
```

## 其他优化
