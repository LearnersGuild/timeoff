const router = require('express').Router();
const requests = require('./timeoffRequests');

router.get('/', (request, response) => {
  response.send('Is the server working?');
});

router.use('/request', requests);

module.exports = router;
