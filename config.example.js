var dev_mode = true;
var distributed = true;

var config = {
    web: {
        address: '',
        port: 0
    },
    locals: {
        host: ''
    },
    redis: {
        address: '',
        port: 0,
        password: '',
        time: 0
    },
    app: {
        dev_mode: dev_mode,
        distributed: distributed
    }
}

module.exports = config;