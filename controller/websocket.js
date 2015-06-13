var websocket = function (io){

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

        socket.on('PIC',function(data, user) {
            dmScreen.emit('PIC',data, user);
        });

        socket.on('NEWS',function(data, user){
            dmScreen.emit('NEWS',data, user);
        });

    });

}

module.exports = websocket;