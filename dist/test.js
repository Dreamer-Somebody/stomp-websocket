var Stomp = require('./stomp-node');
Stomp.debug = console.log;

var ws = Stomp.wrap(61613, 'localhost');
var client = Stomp.over(ws);
// heart-beating is not working yet
client.heartbeat.outgoing = 0;
client.heartbeat.incoming = 0;

var login = 'user';
var passcode = 'password';
var destination = '/queue/myqueue'
var body = 'Hello, node.js!';

client.connect(login, passcode, function(frame) {
  console.log('connected to Stomp');
  
  console.log('subscribing to destination' + destination);
  var subid = client.subscribe(destination, function(message) {
    console.log("received message " + message.body);

    // once we get a message, the client disconnects
    client.disconnect();
  });
  
  console.log('sending message ' + body + ' to ' + destination);
  client.send(destination, {}, body);
});
