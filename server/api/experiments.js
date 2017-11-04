const postgres = require('../db/postgres');

exports.getExperiments = (req, res) => {
  const filterParams = ['app'];
  const params = postgres.filterParams(req.query, filterParams);
  params.is_active = true;
  const query = postgres.knex.select('*').from('experiments.experiment').where(params);

  query.then((result) => {
    res.json(result);
  }).catch((error) => postgres.dbQueryError(res, error));
};

exports.createExperiment = (req, res) => {
  const filterParams = ['app', 'name', 'created_by', 'description', 'attributes'];
  const params = postgres.filterParams(req.body, filterParams);
  const query = postgres.knex.insert(params).into('experiments.experiment');

  query.then((result) => {
    res.sendStatus(201);
  }).catch((error) => postgres.dbQueryError(res, error));
};
