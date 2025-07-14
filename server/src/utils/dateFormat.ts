const addDateSuffix = (date: number) => {
  let dateStr = date.toString();

  // get last char of date string
  const lastChar = dateStr.charAt(dateStr.length - 1);

  if (lastChar === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`;
  } else if (lastChar === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`;
  } else if (lastChar === '3' && dateStr !== '13') {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }

  return dateStr;
};

const formatDate = (
  timestamp: string,
  { monthLength = 'short', dateSuffix = true } = {},
) => {
  // create month array
  const months = [
    monthLength === 'short' ? 'Jan' : 'January',
    monthLength === 'short' ? 'Feb' : 'February',
    monthLength === 'short' ? 'Mar' : 'March',
    monthLength === 'short' ? 'Apr' : 'April',
    monthLength === 'short' ? 'May' : 'May',
    monthLength === 'short' ? 'Jun' : 'June',
    monthLength === 'short' ? 'Jul' : 'July',
    monthLength === 'short' ? 'Aug' : 'August',
    monthLength === 'short' ? 'Sep' : 'September',
    monthLength === 'short' ? 'Oct' : 'October',
    monthLength === 'short' ? 'Nov' : 'November',
    monthLength === 'short' ? 'Dec' : 'December',
  ];

  const dateObj = new Date(timestamp);
  const formattedMonth = months[dateObj.getMonth()];

  const dayOfMonth = dateSuffix
    ? addDateSuffix(dateObj.getDate())
    : dateObj.getDate();

  const year = dateObj.getFullYear();
  let hour =
    dateObj.getHours() > 12
      ? Math.floor(dateObj.getHours() - 12)
      : dateObj.getHours();

  // if hour is 0 (12:00am), change it to 12
  if (hour === 0) {
    hour = 12;
  }

  const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

  // set `am` or `pm`
  const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';

  const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;

  return formattedTimeStamp;
};

// function to format a timestamp, accepts the timestamp and an `options` object as parameters
export default formatDate;
