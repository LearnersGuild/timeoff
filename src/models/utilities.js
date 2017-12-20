const timeoffRequestsDB = require('./timeoffRequests');

const validateDate = (inputDate) => {
  const dateFormat = /^(19|20)\d\d(-)(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;

  if(dateFormat.test(inputDate)) {
    const dateArr = inputDate.split('-');

    const yy = parseInt(dateArr[0]);
    const mm  = parseInt(dateArr[1]);
    const dd = parseInt(dateArr[2]);

    let daysPerMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

    if (mm==1 || mm>2) {
      if (dd>daysPerMonth[mm-1]) {
        return false;
      }
    }
    if (mm==2) {
      let leapYear = false;
      if ( (!(yy % 4) && yy % 100) || !(yy % 400)) {
        leapYear = true;
      }
      if ((leapYear==false) && (dd>=29)) {
        return false;
      }
      if ((leapYear==true) && (dd>29)) {
        return false;
      }
    }
  } else {
    return false;
  }

  return true;
}

const validateTime = (inputTime) => {
  const timeFormat = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if(timeFormat.test(inputTime)) {
    return true;
  }

  return false;
}

const validateType = (inputType) => {
  switch (inputType) {
    case 'sick':
      return true;
    case 'vacation':
      return true;
    case 'overtime':
      return true;
    default:
      return false;
  }
}

const buildSlackMessage = (outgoingMessageText, incomingMessageText) => {
  return {
    "response_type": "ephemeral",
    "text": outgoingMessageText,
    "attachments": [
      {
        "text": `Your entry was: "${incomingMessageText}"`
      }
    ]
  };
}

const extractTimeOffRequestsFromSlackMessage = (request) => {
  const requestText = request.text;
  const userID = request.user_id;

  const requestArray = requestText.split(' ');
  const requestType = requestArray.shift();

  let timeOffRequests = [];
  checkAllEntries:
  for (let i = 0; i < requestArray.length; i++) {
    if (i % 2 != 0) {
      const timeEntries = requestArray[i].split('-');
      const timeOffRequest = {
        username: userID,
        type_of_timeoff: requestType,
        date_off: requestArray[i-1],
        time_start: timeEntries[0],
        time_end: timeEntries[1]
      }
      timeOffRequests.push(timeOffRequest);
    }
  }
  return timeOffRequests;
}

const validateTimeOffRequests = (timeOffRequests) => {
  let output = true;

  if (!timeOffRequests[0]) {
    output = "Please add dates and times"
    return output;
  }

  if ( !validateType(timeOffRequests[0].type_of_timeoff) ) {
    output = "Make sure your first word is the type of entry: sick, vacation, or overtime";
    return output;
  }

  for (let i = 0; i < timeOffRequests.length; i++) {
    if ( !validateDate(timeOffRequests[i].date_off) ) {
      output = "Double check the date format on your entry or entries: yyyy-mm-dd";
      return output;
    } else if ( !validateTime(timeOffRequests[i].time_start)
                || !validateTime(timeOffRequests[i].time_end) ) {
      output = "Double check the time formats: hh:mm";
      return output;
    }
  }

  return output;
}

const insertTimeOffRequestsToDB = (timeOffRequests) => {
  return timeoffRequestsDB.add(timeOffRequests)
    .then(result => {
      return "Your timeoff request was recorded!";
    })
    .catch(error => {
      console.error(error);
      const errorMessage = `An error occurred on database entry: ${error.message}`;
      error.slackMessageText = errorMessage
      throw error;
    })
}

const processTimeOffRequest = (request) => {
  /* EXAMPLE REQUEST */
  // { token: 'ifVkOH3RGkzllGo64zWgjyBZ',
  // team_id: 'T3ZNAQTAP',
  // team_domain: 'learnersguild',
  // channel_id: 'D4WL4N36V',
  // channel_name: 'directmessage',
  // user_id: 'U4Y1L7RB9',
  // user_name: 'breyana',
  // command: '/timeoff',
  // text: 'vacation 2017-12-25 08:00-16:00',
  // response_url: 'https://hooks.slack.com/commands/T3ZNAQTAP/283341594723/oMoIJgwuODf67Mt48NSZiu9q',
  // trigger_id: '283457877556.135758843363.921f83381be87b9cc374b986db5ef31b' }

  const incomingMessageText = request.text;
  const timeOffRequests = extractTimeOffRequestsFromSlackMessage(request);
  let validationError = validateTimeOffRequests(timeOffRequests);

  if(typeof validationError == 'string') {
    return Promise.resolve(buildSlackMessage(validationError, incomingMessageText)); // todo maybe we need to send an error message via slack?
  } else {
    return insertTimeOffRequestsToDB(timeOffRequests)
      .then(databaseEntryResponse => {
        return buildSlackMessage(databaseEntryResponse, incomingMessageText);
      })
      .catch(error => {
        return buildSlackMessage(error.slackMessageText, incomingMessageText)
      })
  }
}

module.exports = {
  processTimeOffRequest
};
