var Router = require('koa-router');

var dmScreen = new Router();

dmScreen.get('/',function *(){
    yield this.render('dmScreen');
});

dmScreen.get('/inputBox',function *(){
    yield this.render('inputBox');
});

dmScreen.get('/backend',function *(){
   yield this.render('backend');
});

module.exports = dmScreen;