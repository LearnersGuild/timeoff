const router = require('express').Router();
const requests = require('./requests');

router.get('/', (request, response) => {
  response.send('Is the sever working?');
});

router.use('/request', requests);

module.exports = router;
