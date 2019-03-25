const express = require('express');
const app = express();
const port = 8000;
app.use(express.static(__dirname + '/public/dist/public'));
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
const io = require('socket.io')(server);

// require('./server/routes')(app);


io.on('connection', socket => { //2

    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('thankyou', data => { //7
        console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });

});