var Router = require('koa-router'),
    locals = require('../config').locals;

var dmScreen = new Router();

dmScreen.get('/',function *(){
    yield this.render('dmScreen', {
        layout: 'layout',
        locals: locals
    });
});

dmScreen.get('/inputBox',function *(){
    yield this.render('inputBox', {
        layout: 'mobile_layout',
        locals: locals
    });
});

dmScreen.get('/backend',function *(){
    yield this.render('login', {
        layout: 'layout',
        locals: locals
    });
});

dmScreen.post('/backend',function *(){

    if(this.body.password === 'helloworld'){
        yield this.render('backend', {
            layout: 'layout',
            user: this.body.user,
            usericoninput: this.body.usericoninput,
            usericoncolorinput:this.body.usericoncolorinput
            locals: locals
        });
    }else{
        yield this.render('login', {
            layout: 'layout',
            user: this.body.user,
            locals: locals
        });
    }

});

module.exports = dmScreen;