const postgres = require('../db/postgres');

exports.getEvents = (req, res, next) => {
  const query = postgres.knex.select('*').from('experiments.event');

  query.then((result) => {
    res.json(result);
  }).catch((error) => postgres.dbQueryError(res, error));
};

exports.createEvent = (req, res) => {
  const filterParams = ['experiment_id', 'user_id', 'event', 'attributes'];
  const params = postgres.filterParams(req.body, filterParams);
  const query = postgres.knex.insert(params).into('experiments.event');

  query.then((result) => {
    res.sendStatus(201);
  }).catch((error) => postgres.dbQueryError(res, error));
};
