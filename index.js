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
  res.sendFile( __dirname + '/views/index2.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

 
  socket.on("greet", function(){
    socket.emit("greet", "Hi! Client.");
  });


  socket.on('add user',function(msg){
    socket.username = msg;
    console.log("new user: "+msg+" logged.");
    io.emit('add user',{
      username: socket.username
    });
  });

  socket.on('chat message', function(msg){
    console.log(socket.username+":"+msg);
    io.emit('chat message', {
      username:socket.username,
      msg:msg
    });
  });

  socket.on('disconnect',function(){
    console.log('a user disconnect');
    if(socket.username !== undefined){
      console.log(socket.username+" left.");
      io.emit('user left',{
        username:socket.username
      });
    }
  });

});

http.listen(3000, () => { //use http.listen to replace app.listen
  console.log('listening on *:3000');
});