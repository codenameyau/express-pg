const express = require('express');
const experiments = require('./experiments');
const events = require('./events');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: `Hooray! Our API is up and running!` });
});

router.get('/experiments', experiments.getExperiments);
router.post('/experiments', experiments.createExperiment);

router.get('/events', events.getEvents);
router.post('/events', events.createEvent);

module.exports = router;
