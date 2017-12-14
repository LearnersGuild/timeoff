const router = require('express').Router();
const TimeoffRequests = require('../../models/timeoffRequests');
const { processTimeoffRequest } = require('../../models/utilities');

router.post('/', (request, response) => {
  const message = processTimeoffRequest(request.body)
  response.json(message)
});

module.exports = router;
