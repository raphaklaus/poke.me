const Pokemon = require('./pokemon.model.js');

module.exports = (app) => {
  app.get('/pokemons', (req, res, next) => {
    Pokemon.find().then(result => {
      // todo: render pokemon list
    }).catch(error => next(error));
  });

  app.get('/pokemons/new', (req, res, next) => {
    // todo: render new pokemon form
  });

  app.post('/pokemons', (req, res, next) => {
    // todo: persist pokemon into the database and render back to pokemon list,
    // with a message telling the pokemon was created
  });
};
