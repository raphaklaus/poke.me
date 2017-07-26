const crypto = require('crypto'),
  User = require('./user.model.js');

module.exports = (app, response) => {
  app.get('/login', (req, res) => {
    response.send(req, res, null, 'login');
  });

  app.post('/login', (req, res, next) => {
    let password = crypto.createHmac('sha256', process.env.PASSWORD_SECRET)
    .update(req.body.password)
    .digest('hex');
    User.findOne({ username: req.body.username, password: password }).then(model => {
      if (model) {
        req.session.userId = model._id;
        response.send(req, res, null, null, 'pokemons');
      } else
        response.send(req, res, null, null, 'login', 'Username or password incorrect');
    }).catch(error => next(error));
  });

  app.get('/register', (req, res) => {
    response.send(req, res, null, 'register');
  });

  app.post('/register', (req, res, next) => {
    new User(req.body).save().then(model => {
      req.session.userId = model._id;
      response.send(req, res, model, null, 'pokemons', 'Welcome! It\'s time to buy some Pokemons');
    }).catch(error => next(error));
  });
};
