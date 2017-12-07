const router = require('express').Router();
const TimeoffRequests = require('../../models/timeoffRequests');
const { validateDate, validateTime, validateType } = require('../../models/utilities');

router.post('/', (request, response) => {
  const timeoffRequest = request.body.text;
  const userID = request.body.user_id;
  let message = {
    "response_type": "ephemeral",
    "text": "Your timeoff request was recorded!",
    "attachments": [
      {
        "text": `Your entry was: "${timeoffRequest}"`
      }
    ]
  };
  /* EXAMPLE BODY */
  // { token: 'ifVkOH3RGkzllGo64zWgjyBZ',
  // team_id: 'T3ZNAQTAP',
  // team_domain: 'learnersguild',
  // channel_id: 'D4WL4N36V',
  // channel_name: 'directmessage',
  // user_id: 'U4Y1L7RB9',
  // user_name: 'breyana',
  // command: '/timeoff',
  // text: 'this is a message',
  // response_url: 'https://hooks.slack.com/commands/T3ZNAQTAP/283341594723/oMoIJgwuODf67Mt48NSZiu9q',
  // trigger_id: '283457877556.135758843363.921f83381be87b9cc374b986db5ef31b' }

  let requestArray = timeoffRequest.split(' ');
  const requestType = requestArray.shift();

  if (!validateType(requestType)) {
    message.text = "Make sure your first word is the type of entry: sick, vacation, or overtime"
  } else {
    checkAllEntries:
    for (let i = 0; i < requestArray.length; i++) {
      if (i % 2 === 0) {
        if (!validateDate(requestArray[i])) {
          message.text = "Double check the date format on your entry or entries: yyyy-mm-dd";
          break checkAllEntries;
        }
      } else {
        const timeEntries = requestArray[i].split('-' || ' - ')
        if (!validateTime(timeEntries[0]) || !validateTime(timeEntries[1])) {
          message.text = "Double check the time formats: hh:mm";
          break checkAllEntries;
        }
      }
    }
  }

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
