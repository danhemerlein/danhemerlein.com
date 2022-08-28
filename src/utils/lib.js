/**
 * Returns string - a number of greater than four digits will have appropriate comma separation
 * @param {number} num
 */
export function numberWithCommas(num) {
  return typeof num === 'number'
    ? num
        .toFixed(2)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : undefined;
}

export const blockScroll = (bool) => {
  const html = document.getElementsByTagName('html')[0];

  if (bool) {
    html.classList.add('block-scroll');
  } else {
    html.classList.remove('block-scroll');
  }
};

/**
  @description - removes all special charactes (e.g. "$", "#", "-") and creates a shopify handle-like string
  * @param {string} ex: "$0 - $25"
  * @return {string} ex. "0--25"
*/
export const removeSpecialCharactersAndHandleize = (str) => {
  return str
    ?.toLowerCase()
    .replace(/[/\\#,+()$~%.'":*?<>{}]/gi, '')
    .replaceAll('&', '-')
    .replaceAll(' ', '-');
};

export const reactContentfulImageURLHelper = (str) => {
  return str.replace('https:', '');
};

// capitalizes string and adds a period if nedded
export const altTextHelper = (str) => {
  const trim = str.trim();
  const firstLetter = trim.charAt(0).toUpperCase();

  let replaced = trim.replace(trim.charAt(0), firstLetter);

  if (replaced.charAt(replaced.length - 1) !== '.') {
    replaced = replaced.concat('.');
  }

  return replaced;
};

export const hours = [
  '12:00',
  '12:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30'
];

export const buildDay = (day) => {
  if (day < 10) {
    return `0${day}`;
  }
  return day;
};

export const remaining = (secs) => {
  const minutes = secs / 60;
  const hours = minutes / 60;
  const days = hours / 24;

  const secondsRemaining = Math.floor(secs % 60);
  const minutesRemaining = Math.floor(minutes % 60);
  const hoursRemaining = Math.floor(hours % 24);
  const daysRemaining = Math.floor(days);

  return [
    `${daysRemaining} days ${hoursRemaining} hours ${minutesRemaining} minutes ${secondsRemaining} seconds`,
    `total hours remaining: ${numberWithCommas(hours)}`,
    `total minutes remaining: ${numberWithCommas(minutes)}`
  ];
};

export const getDifference = (str) => {
  const now = Date.now();
  const [date, time] = str.split(' ');
  const [month, day, year] = date.split('-');

  const build = `${month}-${day}-${year} ${time}`;

  const target = new Date(build.replace(/-/g, '/'));

  const difference = target - now;

  return difference;
};

export const countdown = (str) => {
  const difference = getDifference(str);

  const seconds = difference / 1000;

  return remaining(seconds);
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

function getNumberWithOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export const createReadableDateFromContentful = (dateObj) => {
  const d = new Date(dateObj);
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const day = d.getDate();
  return `${month} ${getNumberWithOrdinal(day)}, ${year}`;
};
