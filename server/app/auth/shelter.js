import { Router } from 'express';
import geoCoding from '../utils/geoCoding';
import { hashPass, checkPass } from '../utils/utils';
import { saveShelter, getInfo } from '../../../db/users/user';

const shelter = Router();

shelter.post('/signup', async (req, res) => {
  const password = await hashPass(req.body.password);
  const {
    data: { results },
  } = await geoCoding(req.body.address);
  if (!results.length) {
    res.status(400).send({ serverMessage: 'improper address' });
  } else {
    try {
      const { website } = req.body;
      const {
        geometry: {
          location: { lng, lat },
        },
        formatted_address: address,
      } = results[0];
      await saveShelter({ password, address, website }, lng, lat);
      res.redirect('/portal');
    } catch (e) {
      res.status(400).send({ error: e, serverMessage: 'error creating user' });
    }
  }
});

shelter.post('/login', async (req, res) => {
  const user = await getInfo(req.body.website);
  const { shelter: isShelter, password, id, point, address, website } = user.toJSON();
  if (!isShelter) return;
  const match = await checkPass(req.body.password, password);
  if (!match) {
    res.status(400).send({ serverMessage: 'incorrect username and password combination' });
    return;
  }
  req.session.regenerate(() => {
    req.session.user = id;
    req.session.address = address;
    req.session.website = website;
    req.session.point = point;
    req.session.save(() => {
      res.redirect('/account');
    });
  });
});

export default shelter;
