var Router = require('koa-router');

var dmScreen = new Router();

dmScreen.get('/',function *(){
    yield this.render('dmScreen', {
        layout: 'layout'
    });
});

dmScreen.get('/inputBox',function *(){
    yield this.render('inputBox', {
        layout: 'mobile_layout'
    });
});

dmScreen.get('/backend',function *(){
    yield this.render('login', {
        layout: 'layout'
    });
});

dmScreen.post('/backend',function *(){

    if(this.body.password === 'helloworld'){
        yield this.render('backend', {
            layout: 'layout',
            user: this.body.user
        });
    }else{
        yield this.render('login', {
            layout: 'layout',
            user: this.body.user
        });
    }

});

module.exports = dmScreen;