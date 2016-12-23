const express = require('express');
const path = require('path');
const app = express();
const sassMiddleware = require('node-sass-middleware');
const exphbs = require('express-handlebars');
const prototypeData = require('./lib/prototype_data.js');
const helpers = require('./lib/helpers')(prototypeData);
const icons = require('./lib/icons');

app.engine('handlebars', exphbs.create({ helpers: helpers, defaultLayout: 'layout'}).engine);

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
app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/components', function (req, res) {
  res.render('components/index',{
    icons: icons,
    prototypeData: prototypeData
  });
});

app.get('/prototype/:page', function(req, res) {
  res.render('prototype/' + req.params.page, {
    layout: 'prototype',
    prototypeData: prototypeData
  });
});

app.get('*', function(req, res) {
  res.status(404).render('404');
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
