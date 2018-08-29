import { Router } from 'express';
import google from './auth/google';
import facebook from './auth/facebook';
import shelter from './auth/shelter';

const auth = Router();

auth.use('/google', google);

auth.use('/facebook', facebook);

auth.use('/shelter', shelter);

auth.get('/logout', (req, res) => {
  req.user = null;
  req.session.destroy(() => res.redirect('/'));
});

export default auth;
