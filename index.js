var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var numPessoas = 0;


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
	
	var numeroUsuarios = 0;

io.on('connection', function(socket) { // quando alguem entra na pagina

  numPessoas++;

  console.log("Uma pessoa entrou"); // Avisa no console que alguem entrou

  socket.on('add user', function (msg) {
    io.emit('chat message',  msg + " ACABOU DE ENTRAR - Há " + String(numPessoas) + " pessoas online");
      
    
  });

  socket.on('disconnect', function (msg) {
    numPessoas--;
    io.emit('chat message',  "UMA PESSOA ACABOU DE SAIR - Há " + String(numPessoas) + " pessoas online");

  });

  socket.on('typing', function (msg) {
    io.emit('chat message', msg + " ESTÁ DIGITANDO UMA MENSAGEM...");

  });
  
  socket.on('chat message', function(msg){
    io.emit('chat message', msg ); // Mensagem enviada pelo usario

  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});