const express = require('express'),
  app = express(),
  request = require('request-promise'),
  // apicache = require('apicache'),
  // cache = apicache.middleware,
  Promise = require('bluebird'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  mongoose = require('mongoose'),
  response = require('./responser.helper.js');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL, { useMongoClient: true });

response.init(app);

const store = new MongoStore({ url: process.env.MONGO_URL,
  ttl: 60 * 60 * 24 * 30, // 30 days
  autoRemove: 'native'
});

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    path: '/',
    httpOnly: true,
    domain: process.env.COOKIE_HOST,
    maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
  }
}));

app.get('/', (req, res) => {
  // if (req.session.userId)
  // todo: redirect to pokemons
  // else... render the main page asking to login or register
    // response.send(req, res, null, '')
});

require('./pokemon.router.js')(app, response);
require('./auth.router.js')(app, response);

// Error handling
require('./error-handler.js')(app);

app.listen(process.env.PORT || 80, () => {
  console.log('Service started');
});
