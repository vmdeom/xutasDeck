const ip = require('./config.js')
const express = require('express');
const bodyparser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

app = express()
const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public/appdata'))
console.log(__dirname + '/public/appdata')
app.use(bodyparser.json())

app.use(cors({
    origin: 'http://127.0.0.1:3000',
    methods: ['GET', 'POST']}
    ));

var data = ''

const mediaPath = '/appdata/' + data;

app.get('/output', function(req, res){
    res.render('output', {item: data, iodata: io});
    console.log('output is online')
})

app.post('/output', function(req, res){
    data = req.body.path;

})

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('message', (data) => {
        console.log('Mensagem recebida:', data);
    });
});


server.listen(3300, ip, function(){
    console.log('listening at port 3300');
});
