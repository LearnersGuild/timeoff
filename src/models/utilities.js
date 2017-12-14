const TimeoffRequests = require('./timeoffRequests');

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

const processTimeoffRequest = (request) => {
  /* EXAMPLE REQUEST */
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
  const timeoffRequest = request.text;
  const userID = request.user_id;
  let message = {
    "response_type": "ephemeral",
    "text": null,
    "attachments": [
      {
        "text": `Your entry was: "${timeoffRequest}"`
      }
    ]
  };

  let requestArray = timeoffRequest.split(' ');
  const requestType = requestArray.shift();

  if (!validateType(requestType)) {
    message.text = "Make sure your first word is the type of entry: sick, vacation, or overtime";
  } else {
    let databaseEntries = [];
    checkAllEntries:
    for (let i = 0; i < requestArray.length; i++) {
      if (i % 2 === 0) {
        if (!validateDate(requestArray[i])) {
          message.text = "Double check the date format on your entry or entries: yyyy-mm-dd";
          break checkAllEntries;
        }
      } else {
        const timeEntries = requestArray[i].split('-')
        if (!validateTime(timeEntries[0]) || !validateTime(timeEntries[1])) {
          message.text = "Double check the time formats: hh:mm";
          break checkAllEntries;
        }
        const databaseEntry = {
          username: userID,
          type_of_timeoff: requestType,
          date_off: requestArray[i-1],
          time_start: timeEntries[0],
          time_end: timeEntries[1]
        }
        databaseEntries.push(databaseEntry);
      }
    }
    if (databaseEntries === [] && !message.text) {
      message.text = "Please add days and times";
      return message;
    } else if (message.text) {
      return message;
    } else {
      TimeoffRequests.add(databaseEntries)
        .then(result => {
          message.text = "Your timeoff request was recorded!";
          return message;
        })
        .catch(error => {
          console.error(error);
          message.text = `An error occurred on database entry: ${error.message}`;
          return message;
        })
    }
  }
}

module.exports = {
  processTimeoffRequest
};
