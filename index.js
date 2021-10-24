var fs = require('fs'); //requiring filesystem to use node's built in filesys
var data = fs.readFileSync('allMessages.json'); // Sync so that this code is completed before the next line of code //gets the JSON file
var allMessages = JSON.parse(data); //converts the JSON file
console.log(allMessages);

console.log('Server is Starting!');

var express = require('express');//gets express

var bodyParser = require('body-parser');

var app = express();

var server = app.listen(3000, listening); //listen(port, callback-function)

function listening() {
	console.log("Listening...");
};

app.use(express.static('website'));//runs everything within the directory( i.e. website)

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.post('/messageSend', sendMessage);

function sendMessage(request, response) {
	var data = request.body;
	var sender = data.sender;
	var reciever = data.receiver;
	var message = data.message;
	fs.writeFile('allMessages.json', JSON.stringify(message, null, 4), recorded); //Stringify is the 'opposite' of parse
	var reply = sender + reciever + message;
	response.send(reply);

};
/*
app.get('/messageSend/:sender/:message/:receiver', sendMessage) // get(rest)

function sendMessage(request, response) {
	var data = request.params;
	var sender = data.sender;
	var reciever = data.receiver;
	var message = data.message;
	fs.writeFile('allMessages.json', JSON.stringify(message, null, 4), recorded); //Stringify is the 'opposite' of parse
	var reply = sender + reciever + message;
	response.send(reply);
}
*/

function recorded(err) { //saves the message
	console.log("Message saved...");
};

app.get('/messageView', viewMessage); // get(rest)

function viewMessage(request, response) {
	data = fs.readFileSync('allMessages.json'); // Sync so that this code is completed before the next line of code //gets the JSON file
	allMessages = JSON.parse(data); //converts the JSON file
	response.send(allMessages);
	alert(allMessages);
};