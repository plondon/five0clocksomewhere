var express = require('express')
var app = express();
var cool = require('cool-ascii-faces');

var video = "<iframe style='width: 100%; height: 100%;' src='https://www.youtube.com/embed/eRZoLV7JV7s'></iframe>";

app.set('port', (process.env.PORT || 5000))

app.get('/', function(request, response) {
  response.send(video);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})