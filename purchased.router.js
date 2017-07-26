const Cart = require('./cart.model.js');

module.exports = (app, response) => {
  app.get('/purchased', (req, res) => {
    Cart.find({ user: req.session.userId }).populate('pokemons').then(models => {
      models = models.reduce((accumulator, current) => accumulator.concat(current.pokemons), []);
      response.send(req, res, models, 'purchased');
    });
  });
};
