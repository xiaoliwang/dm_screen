var app_conf = require('../config').app;

if(app_conf.distributed){
    var redis_conf = require('../config').redis,
        redisAdapter = require('socket.io-redis'),
        redis = require('redis');
}

var websocket = function (io){
    if(app_conf.distributed){
        var pub = redis.createClient(redis_conf.port, redis_conf.address, {auth_pass: redis_conf.password}),
            sub = redis.createClient(redis_conf.port, redis_conf.address, {detect_buffers: true, auth_pass: redis_conf.password} );
        io.adapter( redisAdapter({pubClient: pub, subClient: sub}) );
    }

    var dmScreen = io.of('/dmScreen'),
        backend = io.of('backend'),
        sendDm = io.of('/sendDm');

    //监听发送弹幕
    sendDm.on('connection', function (socket) {

        socket.on('DM', function (data) {
            dmScreen.emit('DM',data);
        });

    });

    //监听发布信息
    backend.on('connection', function(socket) {

        socket.on('PIC',function(data, user,icon) {
            dmScreen.emit('PIC',data, user,icon);
        });

        socket.on('NEWS',function(data, user,icon){
            dmScreen.emit('NEWS',data, user,icon);
        });

    });

}

module.exports = websocket;