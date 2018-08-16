const respondError = (res, status, err, message) => res.status(status).send({ error: err, serverMessage: message });

const getRes = (dbFunctions, errMessage = 'Data Not Found', status = 200, errStatus = 404) => async (req, res) => {
  const dbFunctionTuples = Object.entries(dbFunctions);
  try {
    const datas = await Promise.all(dbFunctionTuples.map(tuple => tuple[1](req.query)));
    const response = datas.reduce((output, data, i) => {
      const obj = output;
      obj[dbFunctionTuples[i][0]] = data;
      return obj;
    }, {});
    res.status(status).send(response);
  } catch (e) {
    respondError(res, e, errStatus, errMessage);
  }
};

const postRes = (dbFunction, errMessage = 'Incorrect Format', status = 201, errStatus = 400) => async (req, res) => {
  try {
    await dbFunction(req.body);
    res.sendStatus(status);
  } catch (e) {
    respondError(res, e, errStatus, errMessage);
  }
};

const patchRes = (dbFunction, errMessage = 'Item Not Found Or Incorrect Format', status = 204, errStatus = 400) =>
  postRes(dbFunction, errMessage, status, errStatus);

const deleteRes = (dbFunction, errMessage = 'Item Not Found', status = 204, errStatus = 404) => async (req, res) => {
  try {
    await dbFunction(req.query);
    res.sendStatus(status);
  } catch (e) {
    respondError(res, e, errStatus, errMessage);
  }
};

exports.getRes = getRes;
exports.postRes = postRes;
exports.patchRes = patchRes;
exports.deleteRes = deleteRes;
