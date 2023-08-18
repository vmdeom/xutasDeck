const ip = require('./config.js')
const express = require('express');
const bodyparser = require('body-parser');
const http = require('http')
const ejs = require('ejs');
const socketIO = require('socket.io')
const cors = require('cors')

app = express()
const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');

var mediaPath = '/appdata/' + data;

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

app.use(cors({
    origin: 'http://127.0.0.1:3300',
    methods: ['GET', 'POST']}
    ));

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


var data = ''


app.get('/output', function(req, res){
    res.render('output', {item: data, iodata: io});
    console.log('output is online')
})

app.post('/output', function(req, res){
    data = '/appdata/' + req.body.path;
    console.log(data)
    io.emit('message', 'load')
})

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('message', (data) => {
        console.log('Mensagem recebida:', data);
    });
});

server.listen(3000, ip, function(){
    console.log('listening at port 3000')
});