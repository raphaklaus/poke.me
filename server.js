
const express = require('express'),
  app = express(),
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

app.use(express.static(`${__dirname}/pages/dist`));

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

app.use((req, res, next) => {
  if (req.session.userId || ['/login', '/register'].includes(req.path))
    next();
  else
    response.send(req, res, null, 'main');
});

app.get('/', (req, res) => res.redirect('/pokemons'));

require('./auth.router.js')(app, response);
require('./cart.router.js')(app, response);
require('./pokemon.router.js')(app, response);
require('./purchased.router.js')(app, response);

// Error handling
require('./error-handler.js')(app);

app.listen(process.env.PORT || 80, () => {
  console.log('Service started');
});
