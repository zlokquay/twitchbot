//written for Fenyan by Zlokquay
//Can be expanded upon.

var tmi = require('tmi.js');
var board = "empty";
var tempBoard;
var username;

var options = {
	options: {
		debug: true
	},
	connection: {
		cluster: "aws",
		reconnect: true
	},
	identity:{
		username: "OoTBingoBot",
		password: "HIDDEN"
	},
	channels:["Fenyan"]
};

var client = new tmi.client(options);
client.connect();

client.on("chat", function(channel, user, message, self){
	if(message === "!board") {
		client.action("Fenyan", "The current board is: " + board);
	}
});

client.on("chat", function(channel, user, message, self){
	tempBoard = message.split(" ", 2);
	username = user.username;
	if((tempBoard[0] === "!setboard" && username.toLowerCase() === "fenyan") || (tempBoard[0] === "!setboard" && username.toLowerCase() === "zlokquay")){
		board = tempBoard[1]
		client.action("Fenyan", "Board set!");
	}
});

client.on("chat", function(channel, user, message, self){
	if(message === "!clearboard"){
		board = "No Current Board.";
	}
});

client.on("connected", function(address, port){
	client.action("Fenyan", "Hello, I'm your bot!");
});
