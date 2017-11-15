const router = require('express').Router();

router.post('/', (request, response) => {
  const timeoffRequest = request.body.text;
  console.log(timeoffRequest);

  //TODO: send data to db:
  // Requests.add(username, type_of_timeoff, date_off, time_start, time_end)
  // .then()
  // .catch()

  let message = {
    "response_type": "ephemeral",
    "text": "Your timeoff request was recorded!",
    "attachments": [
        {
            "text": timeoffRequest
        }
    ]
};
  response.json(message);
});

module.exports = router;
