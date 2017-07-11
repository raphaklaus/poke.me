const Cart = require('./cart.model.js');

module.exports = (app) => {
  app.get('/carts', (req, res, next) => {
    Cart.find().then(result => {
      // todo: render pokemons bought
    }).catch(error => next(error));
  });

  app.post('/carts', (req, res, next) => {
    // todo: persist pokemon into the database and render back to pokemon list,
    // with a message telling the pokemon was created
  });
};
