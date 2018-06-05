const express = require('express');
const app = express();

const server = require('http').Server(app); //require('http').createServer(onRequest).listen(port, ip);
const io = require('socket.io')(server);

 
app.get('/', (req, res) => {
  res.sendFile( __dirname + '/views/index.html');
});

io.on('connection', (socket) => {
  console.log('socket connect!');
 
  socket.on("greet", () => {
    socket.emit("greet", "greet response.");
  });

  socket.on('disconnect', () => {
    console.log('socket disconnect');
  });
});

app.listen(3000, () => {
  console.log("Server Started. http://localhost:3000");
});