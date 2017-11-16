const router = require('express').Router();
const TimeoffRequests = require('../../models/timeoffRequests');

//test route
router.post('/', (request, response) => {
  const timeoffRequest = request.body.text;
  console.log(timeoffRequest);

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


//real route. Not functional until db is created.
// router.post('/', (request, response) => {
//   const timeoffRequest = request.body.text;
//   console.log(timeoffRequest);
//
//   const newRequest = {
//     username,
//     typeOfTimeoff,
//     dateOff,
//     timeStart,
//     timeEnd
//   }
//
//   let message = {
//     "response_type": "ephemeral",
//     "text": "Your timeoff request was recorded!",
//     "attachments": [
//       {
//         "text": timeoffRequest
//       }
//     ]
//   };
//
// TimeoffRequests.add(newRequest)
// .then(result => {
//   response.json(message);
// })
// .catch(error => response.json({error: error.message}));
// });

module.exports = router;
