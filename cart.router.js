const Cart = require('./cart.model.js');

module.exports = (app, response) => {
  app.get('/carts', (req, res, next) => {
    Cart.find().then(models => {
      response.send(req, res, models, 'purchased');
    }).catch(error => next(error));
  });

  app.post('/carts', (req, res) => {
    new Cart(req.body);
    // todo: persist pokemon into the database and render back to pokemon list,
    // with a message telling the pokemon was created
  });
};
