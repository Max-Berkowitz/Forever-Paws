import bcrypt from 'bcrypt-nodejs';

const checkUser = (req, res, next) =>
  req.session.passport || req.session.user || req.url === '/' || req.url === '/portal' || req.url === '/signup'
    ? next()
    : res.redirect('/');

const hashPass = pass =>
  new Promise((resolve, reject) => bcrypt.hash(pass, null, null, (err, hash) => (err ? reject(err) : resolve(hash))));

const checkPass = (pass, hash) =>
  new Promise((resolve, reject) =>
    bcrypt.compare(pass, hash, (err, matches) => (err ? reject(err) : resolve(matches)))
  );

const respondError = (res, err, status, message) => res.status(status).send({ error: err, serverMessage: message });

const getRes = (dbFunctions, errMessage = 'Data Not Found', status = 200, errStatus = 404) => async (req, res) => {
  const dbFunctionTuples = Object.entries(dbFunctions);
  try {
    const query = Object.entries(req.query).reduce((obj, tuple) => {
      const q = obj;
      q[tuple[0]] = JSON.parse(tuple[1]);
      return q;
    }, {});
    const datas = await Promise.all(
      dbFunctionTuples.map(tuple => tuple[1](query, req.session.passport || req.session))
    );
    const response = datas.reduce((output, data, i) => {
      const obj = output;
      obj[dbFunctionTuples[i][0]] = data.toJSON();
      return obj;
    }, {});
    res.status(status).send(response);
  } catch (e) {
    respondError(res, e, errStatus, errMessage);
  }
};

const postRes = (dbFunction, errMessage = 'Incorrect Format', status = 201, errStatus = 400) => async (req, res) => {
  try {
    await dbFunction(req.body, req.session.passport || req.session);
    res.sendStatus(status);
  } catch (e) {
    respondError(res, e, errStatus, errMessage);
  }
};

const patchRes = (
  dbFunction,
  errMessage = 'Item Not Found Or Incorrect Format',
  status = 204,
  errStatus = 400
) => async (req, res) => {
  try {
    await dbFunction(req.body, req.params, req.session.passport || req.session);
    res.sendStatus(status);
  } catch (e) {
    respondError(res, e, errStatus, errMessage);
  }
};

const deleteRes = (dbFunction, errMessage = 'Item Not Found', status = 204, errStatus = 404) => async (req, res) => {
  try {
    await dbFunction(req.query);
    res.sendStatus(status);
  } catch (e) {
    respondError(res, e, errStatus, errMessage);
  }
};

export { checkUser, hashPass, checkPass, getRes, postRes, patchRes, deleteRes };
