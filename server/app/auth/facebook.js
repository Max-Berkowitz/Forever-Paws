import { Router } from 'express';
import passport from './passportSetup';

const facebook = Router();

facebook.get(
  '/',
  (req, res, next) => (req.session.passport ? res.redirect('/pets') : next()),
  passport.authenticate('facebook', { scope: [] })
);

facebook.get(
  '/callback',
  passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/loginsuccess' })
);

export default facebook;
