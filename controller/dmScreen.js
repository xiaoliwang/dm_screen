var Router = require('koa-router'),
    locals = require('../config').locals;

var dmScreen = new Router();

var password = ['1iNyUGqSWJxwcgzeVTY5H5eDC',
    'CST49EHBRhtzgl32iojdlxN8Y',
    'po03HgSZeqOc9M9FRiXr4pm7y',
    'jQEwaZIk9Nm8wVlJdf6zQgLmZ',
    'jl2O7sqlK8qRPXAzRWUvZfq32',
    'Fd14DJGRxHjsp62DJhTVKw01K',
    'IL2XALvsCH0a2L5IN9Vv66D5Q',
    'zRHOzbCqihhdGBrsSzFtgQzY7',
    '1GROtVaQRrMVbCkibMTFtyaEs',
    'fzJ1Wp7iw2jUFo2RZo6jDYNyW'];

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

    if(password.indexOf(this.body.password) !== -1){
        var isShow = 0;
        if(this.body.password === 'CST49EHBRhtzgl32iojdlxN8Y') isShow = 1;
        yield this.render('backend', {
            layout: 'layout',
            user: this.body.user,
            usericoninput: this.body.usericoninput,
            usericoncolorinput:this.body.usericoncolorinput,
            locals: locals,
            isShow: isShow
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