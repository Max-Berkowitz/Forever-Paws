import { Router } from 'express';
import google from './auth/google';

const auth = Router();

auth.use('/google', google);

auth.get('/logout', (req, res) => {
  req.user = null;
  req.session.destroy(() => res.redirect('/'));
});

export default auth;
