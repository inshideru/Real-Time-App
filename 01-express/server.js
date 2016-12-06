'use strict';

const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();

app.use(express.static('./public'));

app.set('view engine', 'jade');

app.get('/', (req, res) => {
    res.end('Hello, World!');
});

app.get('/home', (req, res) => {
    res.render('index', { title: 'Título' });
});

const server = new http.Server(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log('Client connected!');
    socket.on('chat:add', data => {
        console.log(data);
        io.emit('chat:added', data);
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected');
    });
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});