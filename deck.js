const ip = require('./config.js')
const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');

app = express();

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public/appdata'))
console.log(__dirname + '/public/appdata')
app.use(bodyparser.json())

var data = ''

const mediaPath = '/appdata/' + data;

app.get('/output', function(req, res){
    res.render('output', {item: data});
    console.log('output is online')
})

app.post('/output', function(req, res){

    data = req.body.path;
    console.log(data);
})

app.listen(3300, ip, function(){
    console.log('listening at port 3300');
});