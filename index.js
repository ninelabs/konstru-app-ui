var express = require('express');
var path = require('path');
var app = express();
var sassMiddleware = require('node-sass-middleware');
var mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');
app.set("layout", "layouts/layout");

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public'),
    debug: true,
    outputStyle: 'compressed',
    prefix:  '/theme'
  })
);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
