const ip = require('./config.js')
const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');

app = express()

app.set('view engine', 'ejs');

const mediaPath = './appdata/'

var button = {
    name: '',
    type: '',
    path: mediaPath + '',
    color: ''
}

var colors = {
    audio: '#FF0000',
    image: '#00FF00',
    effect: '#0000FF'
}

var items = []
var colorsl = []
var buttonList = []
var datas = []
var names = []

app.use(bodyparser.urlencoded({extended: true}));
//app.use(bodyparser.json)
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.render('deck', {newListItems: items, newListColor: colorsl, newListNames: names})
});

app.post('/', function(req, res){

    let item = req.body.newItem;
    items.push(item[0]);

    button = {
        name: item[0],
        type: item[1],
        path: item[2],
        color: colors[item[1].toLowerCase()]
    }

    colorsl.push(button.color)
    names.push(button.path)
    res.redirect('/')
})

app.listen(3000, ip, function(){
    console.log('listening at port 3000')
});