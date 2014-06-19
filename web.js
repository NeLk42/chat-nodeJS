var express=require('express');
var http=require('http');
var app=express();
var server=http.createServer(app).listen(process.env.PORT);
var io=require('socket.io').listen(server);

app.use(express.static(__dirname+'/public'));
app.get('*',function(request,response){
response.redirect('Default.html');
});

var users={};
io.sockets.on('connection',function(socket){
socket.on('sendChat',function(data){
io.sockets.emit('updateChat',socket.username,data);
});

socket.on('addUser',function(username){
socket.username=username;
users[username]=username;
socket.emit('updateChat','chat service','you are connected');
socket.broadcast.emit('updateChat',username,'has connected');
io.sockets.emit('updateUsers',users);
});

socket.on('disconnect',function(){
delete users[socket.username];
socket.broadcast.emit('updateChat',socket.username,'has disconnected');
io.sockets.emit('updateUsers',users);
});
console.log('New client has been connected');
})

