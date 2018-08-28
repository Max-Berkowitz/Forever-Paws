import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import api from './api';
import auth from './auth';
import { checkUser } from './utils/utils';
import routeHTML from './routeHTML';
import template from './template';

const config = process.env.NODE_ENV === 'production' ? process.env : require('../../config/config');

const app = express();

app.disable('x-powered-by');

app.use(
  session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // one hour
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/dist', express.static(`${__dirname}/../../client/dist/`));

app.use('/auth', auth);

app.use('/api', checkUser, api);

app.get('/loginsuccess', (req, res) => res.redirect('/location'));

app.get('*', checkUser, (req, res) => {
  const html = routeHTML(req.url);
  res.send(template(html));
});

export default app;
