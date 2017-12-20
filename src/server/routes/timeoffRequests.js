const router = require('express').Router();
const { processTimeOffRequest } = require('../../models/utilities');

router.post('/', (request, response) => {
  processTimeOffRequest(request.body)
    .then(message => {
      response.json(message)
    })
});

module.exports = router;
