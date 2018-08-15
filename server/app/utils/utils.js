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
    res.status(errStatus).send({ error: e, message: errMessage });
  }
};

const postRes = (dbFunction, errMessage = 'Incorrect Format', status = 201, errStatus = 400) => async (req, res) => {
  try {
    await dbFunction(req.body);
    res.sendStatus(status);
  } catch (e) {
    res.status(errStatus).send({ error: e, message: errMessage });
  }
};

exports.getRes = getRes;
exports.postRes = postRes;
