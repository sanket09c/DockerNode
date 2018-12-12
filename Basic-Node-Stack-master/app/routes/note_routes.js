var ObjectID = require('mongodb').ObjectID;   //customer/id

module.exports = function (app, db) { //main fn

  app.get('/customers/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) }
    db.collection('customerDetails').findOne(details, (err, item) => {
      res.header("Access-Control-Allow-Origin","*")
      res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item)
      }
    });
  });

  app.get('/customers', (req, res) => {
    db.collection('customerDetails').find().toArray(function (err, item) {
      res.header("Access-Control-Allow-Origin","*")
      res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
        if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(item);
      }
    });
  });

  app.post('/customers', (req, res) => {
    const details = { custName: req.body.custName, foodItem: req.body.foodItem };
    res.header("Access-Control-Allow-Origin","*")
      res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
    db.collection('customerDetails').insert(details, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/customers/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept")
    db.collection('customerDetails').remove(details, (err, item) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send('Customer ' + id + ' deleted!');
      }
    });
  });

  app.put('/customers/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const custdetails = { custName: req.body.custName, foodItem: req.body.foodItem };
    db.collection('customerDetails').update(details, custdetails, (err, result) => {
      if (err) {
        res.send({ 'error': 'An error has occurred' });
      } else {
        res.send(custdetails);
      }
    });
  });
};