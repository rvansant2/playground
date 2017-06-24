const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!')
});

const mongoDBURI = 'mongodb://mongo:27017/app';

mongoose.connect( mongoDBURI );
mongoose.connection.on( 'connected', function () {
  console.log( 'Mongoose default connection open to ' + mongoDBURI );
});

mongoose.connection.on( 'error', function ( err ) {
  console.log( 'Mongoose default connection error: ' + err );
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
