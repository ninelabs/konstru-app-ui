var express = require('express');
var path = require('path');
var app = express();
var sassMiddleware = require('node-sass-middleware');
var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'layout'}));

app.set('view engine', 'handlebars');

app.use(
  sassMiddleware({
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public/css'),
    debug: true,
    outputStyle: 'compressed',
    prefix: '/css'
  })
);

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/components', function (req, res) {
  res.render('components/index');
});

app.get('/prototype/:page', function(req, res) {
  res.render('prototype/' + req.params.page, {layout: 'prototype'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
