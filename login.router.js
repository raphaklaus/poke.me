const crypto = require('crypto'),
  User = require('./user.model.js');

module.exports = (app) => {
  app.post('/login', (req, res, next) => {
    let password = crypto.createHmac('sha256', 'qwekqwoekqwoeqkwoekqwe')
    .update(req.body.password)
    .digest('hex');
    User.find({username: req.body.username, password: password}).then(result => {
      if (result)
        // todo: create session and handle the render response
      else
        // todo: render back to login with a message for failing login
    }).catch(error => next(error));
  });
};
