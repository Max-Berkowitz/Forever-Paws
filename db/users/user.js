import User from './index';

const saveUser = user =>
  new Promise((resolve, reject) =>
    new User({ username: user.username }).fetch().then(found => (found ? reject() : User.create(user).then(resolve)))
  );

const getAllUsers = () =>
  new Promise((resolve, reject) =>
    User.fetchAll()
      .then(found => resolve(JSON.parse(JSON.stringify(found))))
      .catch(reject)
  );

export { getAllUsers, saveUser };
