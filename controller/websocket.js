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

        socket.on('PIC',function(data, user,icon,iconcolor) {
            dmScreen.emit('PIC',data, user,icon,iconcolor);
        });

        socket.on('NEWS',function(data, user,icon,iconcolor){
            dmScreen.emit('NEWS',data, user,icon,iconcolor);
        });

        socket.on('BACKGROUND',function(data) {
            dmScreen.emit('BACKGROUND',data);
        });

    });

}

module.exports = websocket;