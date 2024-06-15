const express = require('express');
const bodyparser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const mysql = require('mysql');

//--vars----------
var media = ''
//--vars----------

//--app setup-----
app = express()

const server = http.createServer(app);
const io = socketIO(server);

app.set('view engine', 'ejs');
app.use(express.json())
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(cors({
    origin: 'http://127.0.0.1:3300',
    methods: ['GET', 'POST']}
));
//--app setup-----

//--mysql setup---
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '---'
});

var read = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '---',
    database: 'effectsDb'
})

con.connect(function(err){
    if (err) throw err;
    con.query("CREATE DATABASE IF NOT EXISTS effectsDb", function(err, result){
        if (err) throw err;
    });
    read.query("CREATE TABLE IF NOT EXISTS sounds (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), path VARCHAR(255), icon VARCHAR(255))", function(err, result){
        if (err) throw err;
    })
})

//--mysql setup---

//--deck route----
app.get('/deck', function(req, res){
    read.query('SELECT * FROM sounds', function(err, result){
        if (err) throw err;
        res.render('deck', {data: result})
    })

})
//--deck route----

//--saveform route
app.get('/input', function(req, res){
    res.render('/saveform')
})

app.post('/input', function(req, res){
    let btn = [req.body.name, req.body.path];
    read.query("INSERT INTO sounds (name, path) VALUES (?)", [btn], function(err, result){
        if (err) throw err;
    })
    res.send(200)
})
//--saveform route

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