var YaBoss = require('yaboss');
var express = require('express');
var path = require('path');
var app = express();

var YaBossClient = new YaBoss('dj0yJmk9Z1ZVbkJrbXRhZW5aJmQ9WVdrOVZrVlFjRlpxTkdjbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD04Yw--', '185e24a2545615155f355f39bd341a3d7f061e21');

app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
  response.sendfile('index.html');
});

app.get('/search/:somewhere', function(req, response) {
  YaBossClient.searchImages(req.param("somewhere"), {format: 'json', count: 1, dimensions: 'wallpaper'}, function(err,dataFound,res){
  	response.send(dataFound);
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});