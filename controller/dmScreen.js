var Router = require('koa-router');

var dmScreen = new Router();

dmScreen.get('/',function *(){
    yield this.render('dmScreen', {
        layout: 'layout'
    });
});

dmScreen.get('/inputBox',function *(){
    yield this.render('inputBox', {
        layout: 'layout'
    });
});

dmScreen.get('/backend',function *(){
   yield this.render('backend', {
       layout: 'layout'
   });
});

module.exports = dmScreen;