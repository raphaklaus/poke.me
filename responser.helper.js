const bodyParser = require('body-parser'),
  flash = require('express-flash'),
  path = require('path');

const init = (app) => {
  // if (process.env.API_ONLY) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  // } else {
  app.set('views', path.join(__dirname, 'pages'));
  app.set('view engine', 'pug');
  app.use(flash());
  // }
};

const clean = (data) => {
  // Function to clean sensitive data
  // if (data instanceof Object) {
  //
  // }
};

const redirect = (req, res, router, message) => {
  if (message)
    req.flash('message', message);

  res.redirect(`/${router}`);
};

const send = (req, res, data, page, redirectTo, message) => {
  if (process.env.API_ONLY === 'true') {
    if (data)
      res.json(data);
    else
      res.json({ message: 'This route does not support API calls' });
  } else if (redirectTo)
    redirect(req, res, redirectTo, message);
  else
    res.render(`${page}.pug`, { data: data, message: req.flash('message') });
};

module.exports = { init, send };
