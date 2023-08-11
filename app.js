const ip = require('./config.js')
//const deck = require('./deck.js')
const express = require('express');
const bodyparer = require('body-parser');
const ejs = require('ejs');

app = express()

app.set('view engine', 'ejs');

app.use(bodyparer.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('deck')
});

app.post('/', function(req, res){
    console.log(req.body);
})

app.listen(3000, ip, function(){
    console.log('listening at port 3000')
});