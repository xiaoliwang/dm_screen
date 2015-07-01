#!/usr/bin/env iojs

var http = require('http'),
    koa = require('koa'),
    path = require('path'),
    render = require('koa-ejs'),
    mount = require('koa-mount'),
    serve = require('koa-static'),
    parse = require('co-body'),
    config = require('../config'),
    dmScreen = require('../controller/dmScreen'),
    websocket = require('../controller/websocket');

var app = koa();
var root_dir = path.resolve(__dirname, '.') + '/';

//view层配置
render(app,{
    root: root_dir + '../view',
    layout: false,
    cache: false,
    viewExt: 'ejs',
    debug: config['app'].dev_mode
});

//添加http头的基本信息
app.use(function *(next){
    var start = new Date;

    yield next;

    this.set('Cache-Control','max-age=5184000');
    this.set('X-Powered-By',"TomCao's DMSCREEN");
    var ms = new Date - start;
    this.set('X-Response-Time',ms+'ms');
});

//线上使用nginx（using nginx online）
if(config['app'].dev_mode){
    app.use(serve(__dirname+'/../public/res'));
}

//获取post的form表单
app.use(function *(next){
    if(this.method === 'POST'){
        var body = yield parse.form(this);
        this.body = body;
    }
    yield next;
});

//错误处理
app.use(function *(next){
   try{
       yield next;
       if(this.response.status===404)
        yield this.render('error');
   } catch(e){
       console.log(e);
       yield this.render('error');
   }
});

app.use(mount('/dmScreen',dmScreen.middleware()));



var server = http.createServer(app.callback()),
    io = require('socket.io')(server);

websocket(io);

//监听报错
process.on('uncaughtException', function (err) {
    console.error(err);
});

//开始监听
server.listen(
    process.env.PORT || config['web'].port || 3000,
    config['web'].address || '::',
    function () {
        console.log(`dmScreen Server running on ${server.address().address}:${server.address().port}`);
    });
