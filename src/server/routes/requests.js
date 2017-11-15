const router = require('express').Router();

router.post('/', (request, response) => {
  const timeoffRequest = request.body.text;
  console.log(timeoffRequest);

  //TODO: send data to db:
  //db column names:
  //username, type_of_timeoff, date_off, time_start, time_end

// const newRequest = {
//   username,
//   typeOfTimeoff,
//   dateOff,
//   timeStart,
//   timeEnd
// }

  let message = {
    "response_type": "ephemeral",
    "text": "Your timeoff request was recorded!",
    "attachments": [
      {
        "text": timeoffRequest
      }
    ]
  };

// Requests.add(newRequest)
// .then(result => {
  response.json(message);
// })
// .catch(response.json({error: error.message}));
});

module.exports = router;
