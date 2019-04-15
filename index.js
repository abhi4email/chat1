var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.get('/', function (req, res){
	
	//	res.send('Hello Data');

	res.sendFile(__dirname + '/index.html');

});

io.on('connection', function(socket){
	
	// default user name
	socket.username = 'Iron Man';

	console.log(socket.username,'user connected');

	//listen on change_username
	socket.on('change_username', function(data){
		socket.username = data.username;
		console.log(socket.username,'user name changed');
	});


	socket.on('disconnect', function(){
	    console.log(socket.username,'user disconnected');
	});

	socket.on('chat message', function(msg){
		//console.log('message '+msg);
		io.emit('chat message', {msg:msg, username:socket.username});
	});

});

http.listen(3000, function(){
	console.log("server start at 3000 port");
});