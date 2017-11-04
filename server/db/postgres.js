const knex = require('knex');
const bookshelf = require('bookshelf');
const chalk = require('chalk');

// Setup pooling and connections to Postgres DB
const postgres = exports.knex = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_DB_HOST,
    user: process.env.POSTGRES_DB_USER,
    password: process.env.POSTGRES_DB_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    port: process.env.POSTGRES_DB_PORT,
    ssl: true
  },
  pool: {
    min: 0,
    max: 10
  }
});

// Used for applying query params to get requests.
const filterParams = exports.filterParams = (params, paramsList) => {
  const filteredParams = {};
  paramsList.forEach((param) => {
    if (params[param]) {
      filteredParams[param] = params[param];
    }
  });
  return filteredParams;
};

// Enable console output of SQL queries.
const headerMessage = chalk.dim.italic;
const infoMessage = chalk.yellow;

postgres.on('query', (query) => {
  console.log(
    headerMessage('\nQuery: '),
    infoMessage(`"${query.sql}"`),
    headerMessage('\nParams: '),
    infoMessage(`[${query.bindings}]\n`)
  );
});

const errorMessage = chalk.red;
const dbQueryError = exports.dbQueryError = (res, error) => {
  console.error(errorMessage(error));
  res.sendStatus(400);
};

// Setup ORM
const orm = exports.orm = bookshelf(postgres);

// Log connection details
const hostName = (process.env.POSTGRES_DB_HOST || '')
console.log(`[+] Connected to Postgres DB: ${hostName}`);
