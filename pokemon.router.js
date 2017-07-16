const Pokemon = require('./pokemon.model.js');

module.exports = (app, response) => {
  app.get('/pokemons', (req, res, next) => {
    Pokemon.find().then(models => response.send(req, res, models, 'pokemons')).catch(error => next(error));
  });

  app.get('/pokemons/new', (req, res) => {
    response.send(req, res, null, 'new');
  });

  app.post('/pokemons', (req, res) => {
    console.log('sdasdasd', req.body.name);
    new Pokemon(req.body).save().then(data => {
      response.send(req, res, data, null, 'pokemons', 'Pokémon created!');
    });
    // todo: persist pokemon into the database and render back to pokemon list,
    // with a message telling the pokemon was created
  });
};
