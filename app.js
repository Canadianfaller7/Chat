/* Here we are telling our app to use express, starting our server, telling our app to use 
/client as the directory to serve pages from, and setting /client/index.html as the starting page for our app.*/
var express = require('express');
var app = express();

var server = require('http').createServer(app);

app.get('/',function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));


console.log("Server started.");
/* Here we are designated several actions if a socket receives a certain event. Some of these event
names are reserved by socket.io, such as 'connection'. Others we have defined ourselves, such as 'sendMsgToServer'. */


SOCKET_LIST = {};

var io = require('socket.io')(server); // when a socket connects, we defind functions based on events or string the socket receives
io.sockets.on('connection', function(socket){        
    console.log('new user!');
    var socketId = Math.random(); // generate a random id when a user connects and add them to our socket list variable
    SOCKET_LIST[socketId] = socket;          
    socket.on('sendMsgToServer',function(data){ // defind a function when the event sendMsg occurs, loop throgh our socket list and send the message to every connected socket with our addToChat event
        console.log('someone sent a message!');
        for(var i in SOCKET_LIST){
            SOCKET_LIST[i].emit('addToChat', data);
        }
    });
    socket.on('disconnect',function(){    // when the socket disconnects, remove all peope from our socket list
        delete SOCKET_LIST[socket.id];
		
	});
	
});
server.listen(4141); // tell app to listen n port 4141 whatever port you choose, make sure it is open and not blocked by a firewall