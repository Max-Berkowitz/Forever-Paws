import { Router } from 'express';
import google from './auth/google';
import facebook from './auth/facebook';

const auth = Router();

auth.use('/google', google);

auth.use('/facebook', facebook);

auth.get('/logout', (req, res) => {
  req.user = null;
  req.session.destroy(() => res.redirect('/'));
});

export default auth;
