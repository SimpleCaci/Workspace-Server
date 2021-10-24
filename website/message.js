var canwid, canhei, canvas
var textbox, sendbutton, refreshbutton
var sender, reciever
var data

function setup() {
	canwid = window.innerWidth/2;
	textbox = createInput('Text?');
	textbox.size(canwid*3/4);
	textbox.position((window.innerWidth-canwid)/2, window.innerHeight-25, 'fixed');
	sendbutton = createButton('Send Message');
	sendbutton.size(canwid/4);
	sendbutton.position((window.innerWidth)*3/4, window.innerHeight-25);
	sendbutton.mousePressed(sendMessage);
	refreshbutton = createButton('Refresh?');
	refreshbutton.size(canwid/4);
	refreshutton.position((window.innerWidth)*3/4, window.innerHeight-25);
	refreshbutton.mousePressed(refreshMessage);
};

function refreshMessage() {
	loadJSON('/messageView');
};

function gotData(data) {
};

function sendMessage() {
	//loadJSON('/messageSend/'+sender+"/"+textbox.value()+"/"+reciever, messageSent);
	data = {
		sender: sender,
		reciever: reciever,
		message: textbox.value()
	};
	httpPost("/messageSend", data, "json", messageSent);
};

function messageSent(result) {
	console.log(result);
};

function draw() {
};
