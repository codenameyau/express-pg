const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

/********************************************************************
* CONFIGURATION
*********************************************************************/
require('dotenv').config();

const app = express();

// Setup bodyParser to let us parse POST data.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the static files path to public.
app.use(express.static(path.join(__dirname, 'public')));

// Set the server-side view engine to html.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Enable morgan logging.
if (process.env.APP_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400; }
  }));
}

// Specify our default port.
const PORT = process.env.PORT || 3000;


/********************************************************************
* API ROUTING
*********************************************************************/

// Register router for api.
app.use('/api', require('./server/api/routes'));


/********************************************************************
* RUN SERVER
*********************************************************************/
app.listen(PORT, function () {
  console.log('[+] Listening to app on http://localhost:%s ', PORT);
});
