# express-pg

A/B testing and event analytics service

### Setup

```
npm install -g nodemon
npm install
nodemon index.js
```

You will need a `.env` file with these fields defined:

```
APP_ENV="development"
POSTGRES_DB_HOST=""
POSTGRES_DB_NAME=""
POSTGRES_DB_PORT=""
POSTGRES_DB_USER=""
POSTGRES_DB_PASSWORD=""
```

### Resources
- Swagger API documentation: https://github.com/swagger-api/swagger-node
- Knex Query Builder: http://knexjs.org/
- A/B Testing Calculator: https://abtestguide.com/calc/
