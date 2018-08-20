import User from './index';

const saveUser = user => User.forge(user).save();

const getMyInfo = ({ id }) => User.where({ id }).fetch();

//! ^ change to use session

export { getMyInfo, saveUser };
