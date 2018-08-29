import User from './index';
import db from '../index';

const saveShelter = (shelter, lng, lat) =>
  User.forge({ ...shelter, shelter: true, point: db.knex.raw(`ST_SetSRID(ST_Point(${lng},${lat}) , 4326)`) }).save();

const getInfo = website => User.where({ website }).fetch();

// FOR PASSPORT
// =========================
const createOrFetchUserGoogle = async (request, accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.where({ googleId: profile.id }).fetch();
    if (user) {
      done(null, user.toJSON());
    } else {
      const newUser = await User.forge({
        googleId: profile.id,
        username: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
      }).save();
      done(null, newUser.toJSON());
    }
  } catch (e) {
    done(e);
  }
};

const createOrFetchUserFacebook = async (request, accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.where({ facebookId: profile.id }).fetch();
    if (user) {
      done(null, user.toJSON());
    } else {
      const newUser = await User.forge({
        facebookId: profile.id,
        username: profile.displayName,
        firstName: profile.displayName.split(' ')[0],
        lastName: profile.displayName.split(' ').splice(-1),
      }).save();
      done(null, newUser.toJSON());
    }
  } catch (e) {
    done(e);
  }
};

const getUserByOauthId = async (id, done) => {
  let user = await User.where({ googleId: id }).fetch();
  if (user) {
    done(null, user.toJSON());
  } else {
    user = await User.where({ facebookId: id }).fetch();
    done(null, user.toJSON());
  }
};
// =========================

export { saveShelter, getInfo, createOrFetchUserGoogle, getUserByOauthId, createOrFetchUserFacebook };
