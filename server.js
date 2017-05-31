'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;

let users = [];

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules')));

io.on('connection', function(socket) {
    socket.on('get-users', function() {
        socket.emit('all-users', users);
    });

    socket.on('join', function(data) {
        socket.username = data.username;
        users[socket.username] = socket;

        var userObj = {
            username: data.username,
            image: data.image,
            socketid: socket.id
        };

        users.push(userObj);

        io.emit('all-users', users);
    });

    socket.on('send-message', function(data) {
        io.emit('message-received', data);
    });

    socket.on('disconnect', function() {
        users = users.filter(function(item) {
            return item.username !== socket.username;
        });

        io.emit('all-users', users);
    });
});

app.get('*', function(req, res) {
    return res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.listen(port, function() {
    console.log(`App running on port ${port}`);
});