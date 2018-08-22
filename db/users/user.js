import User from './index';

// FOR PASSPORT
// =========================
const createOrFetchUser = async (request, accessToken, refreshToken, profile, done) => {
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

const getUserByGoogleId = async (googleId, done) => {
  const user = await User.where({ googleId }).fetch();
  done(null, user.toJSON());
};
// =========================

export { createOrFetchUser, getUserByGoogleId };
