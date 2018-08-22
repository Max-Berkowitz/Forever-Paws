import { Router } from 'express';
import passport from './passportSetup';

const google = Router();

google
  .route('/')
  .get(
    (req, res, next) => (req.session.passport ? res.redirect('/pets') : next()),
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );

google.get('/callback', passport.authenticate('google', { failureRedirect: '/', successRedirect: '/pets' }));

export default google;
