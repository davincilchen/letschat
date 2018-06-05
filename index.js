/*
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
*/

const express = require('express');
const app = express();

const http = require('http').Server(app); //require('http').createServer(onRequest).listen(port, ip);
const io = require('socket.io')(http);

 
app.get('/', (req, res) => {
  res.sendFile( __dirname + '/views/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
 
  socket.on("greet", function(){
        socket.emit("greet", "Hi! Client.");
    });

  socket.on('disconnect', function(){
    console.log('a user disconnect');
  });
});

http.listen(3000, () => { //use http.listen to replace app app.listen
  console.log('listening on *:3000');
});