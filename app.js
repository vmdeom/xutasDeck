const dicts = require('./dicts.js');
const express = require('express');
const bodyparser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

//--vars----------
var button = {
    name: '',
    id: ''
}
var buttons = []
var media = ''
//--vars----------

//--app setup-----
app = express()

const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(cors({
    origin: 'http://127.0.0.1:3300',
    methods: ['GET', 'POST']}
));
//--app setup-----

//--deck route----
app.get('/deck', function(req, res){
    res.render('deck', {buttons: buttons})
});
//--deck route----

//--output route--
app.get('/output', function(req, res){
    res.render('output', {item: media, iodata: io});
    //console.log('output is online')
})

app.post('/output', function(req, res){
    media = '/appdata/' + req.body.path;
    io.emit('message', 'load')
})
//--output route--

//--socket--------
io.on('connection', (socket) => {
    //console.log('Cliente conectado');

    socket.on('message', (data) => {
        console.log('Mensagem recebida:', data);
    });
});
//--socket--------

//--listener------
server.listen(3000, process.env.IP | '127.0.0.1', function(){
    console.log('listening at port 3000')
});
//--listener------