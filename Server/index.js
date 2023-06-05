const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const {PORT} = require('../config');
const app = new Koa();
const router = new Router();

// 定义路由
router.get('/', async (ctx) => {
    try {
        // 发起对其他服务端接口的请求
        const response = await axios.get('https://api.mingdao.com/v1/open/app/get');
        // 将其他服务端接口的响应数据返回给客户端
        ctx.body = response.data;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = '请求其他服务端接口失败';
    }
});

// 将路由注册到应用程序
app.use(router.routes())
    .use(router.allowedMethods());

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器已启动，监听端口 ${PORT}`);
});
