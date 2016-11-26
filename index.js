var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var i = 0;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
	
	var numeroUsuarios = 0;

io.on('connection', function(socket) {

	var usuarioAdicionado = false;

  console.log("a new member"+i+" came in");
  i++;
  socket.on('chat message', function(msg){
    io.emit('chat message', "MEMBRO" + i + ": "+ msg );

  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});