var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require( "socket.io" )( http );

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
}); 

// set up your channel
io.on( "connection", function( socket ) {
  
  // deal with new messages and emit to all clients
  // do the callback method
  socket.on( "chat", ( message ) => {
    console.log(message);
    io.sockets.emit( "chat", message );
  })

} )

http.listen(3000, function(){
  console.log('listening on *:3000');
});