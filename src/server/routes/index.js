const router = require('express').Router();

router.get('/', (request, response) => {
  response.send('Is the sever working?')
});

module.exports = router;