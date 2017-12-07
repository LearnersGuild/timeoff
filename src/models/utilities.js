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

module.exports = {
  validateDate,
  validateTime,
  validateType
};
