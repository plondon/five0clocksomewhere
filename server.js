var express = require('express')
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.sendfile('index.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})