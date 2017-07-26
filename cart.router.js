const Cart = require('./cart.model.js');

module.exports = (app, response) => {
  app.post('/carts', (req, res, next) => {
    let cart = {
      pokemons: req.body.cart.pokemons,
      total: req.body.cart.pokemons
        .reduce((accumulator, current) => accumulator + current.price, 0),
      user: req.session.userId
    };

    new Cart(cart).save().then(() => {
      response.send(req, res, null, null, 'purchased', 'Congratulations! Your purchase was' +
      'completed! Here are all Pokemons already bought');
    }).catch(error => next(error));
  });
};
