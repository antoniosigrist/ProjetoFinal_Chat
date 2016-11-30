var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
	
	var numeroUsuarios = 0;

io.on('connection', function(socket) { // quando alguem entra na pagina


  console.log("a new member came in"); // Avisa no console que alguem entrou

  socket.on('add user', function (msg) {
    io.emit('chat message',  msg + " ACABOU DE ENTRAR");
      
    
  });

  socket.on('disconnect', function (msg) {
    io.emit('chat message',  msg + " ACABOU DE SAIR");

  });
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg ); // Mensagem enviada pelo usario

  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});