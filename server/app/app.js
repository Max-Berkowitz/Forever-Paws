const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
// const util = require('./utils/utils');
const config = process.env.NODE_ENV === 'production' ? process.env : require('../../config/config');

const app = express();

app.use(
  session({
    secret: config.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // one hour
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(`${__dirname}/../../client/dist`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;
