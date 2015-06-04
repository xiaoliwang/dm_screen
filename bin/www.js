#!/usr/bin/env iojs

var http = require('http'),
    koa = require('koa'),
    render = require('koa-ejs'),
    mount = require('koa-mount'),
    serve = require('koa-static'),
    config = require('../config'),
    dmScreen = require('../controller/dmScreen')
    websocket = require('../controller/websocket');

var app = koa();

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

app.use(function *(next){
   try{
       yield next;
   } catch(e){
       yield this.render('error');
   }
});

render(app,{
    root: '../view',
    layout: false,
    viewExt: 'ejs'
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
