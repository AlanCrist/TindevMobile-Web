const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    
    
    connectUsers[user] = socket.id;
});

mongoose.connect('mongodb+srv://alanncrist:<password>@cluster0-hrys0.mongodb.net/omnistack?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectUsers;

    return next();
});

app.use(cors());

app.use(express.json());

app.use(routes);

server.listen(3333);
