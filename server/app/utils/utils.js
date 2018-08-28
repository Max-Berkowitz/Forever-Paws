const checkUser = (req, res, next) => (req.session.passport || req.url === '/' ? next() : res.redirect('/'));

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

export { checkUser, getRes, postRes, patchRes, deleteRes };
