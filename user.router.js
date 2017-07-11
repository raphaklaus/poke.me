const User = require('./user.model.js');

module.exports = (app) => {
  app.get('/users/new', (req, res, next) => {
    // todo: render new user form
  });

  app.post('/users', (req, res, next) => {
    // todo: create user and render back to login router
  });
};
