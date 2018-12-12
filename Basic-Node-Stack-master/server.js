const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/db');

const port = 8000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err)
  console.log('DB Connected !');
  require('./app/routes')(app, database);

  app.get('/', (err, res) => {
    res.send("Hello !")
  });

  app.listen(port, () => {
    console.log('Application Up and Running On localhost: ' + port);
  });
})