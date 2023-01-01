import { removeSpecialCharactersAndHandleize } from 'utils/lib';

export const getRandomItem = (arr, salt) => {
  if (salt > 100) {
    return arr[Math.floor(salt / 2 / arr.length)];
  }

  return arr[Math.floor(salt / arr.length)];
};

export const createPostDocumentID = (str, name) => {
  if (str.includes('instagram')) {
    return str.split('https://www.instagram.com/p/')[1].replace('/', '');
  }
  if (str.includes('youtube')) {
    return str.split('https://www.youtube.com/watch?v=')[1].split('&')[0];
  }

  if (str.includes('.com')) {
    return `${removeSpecialCharactersAndHandleize(name)}-${str
      .split('.com')[1]
      .replace('/', '')}`;
  }

  if (str.includes('.eu')) {
    return `${removeSpecialCharactersAndHandleize(name)}-${str
      .split('.eu')[1]
      .replace('/', '')}`;
  }
};

export const datefromString = (str) => {
  const split = str.split('-');

  const year = split[0];
  const month = split[1];
  const day = split[2];

  const date = new Date(`${month} ${day}, ${year}`);

  return date.toString();
};

export const stringFromDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  let month = now.getMonth();
  let day = now.getDate();
  month += 1;
  if (month < 10) {
    month = `0${month}`;
  }

  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}-${month}-${day}`;
};

export const todayAsDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  let month = now.getMonth();
  const day = now.getDate();

  month += 1;
  if (month < 10) {
    month = `0${month}`;
  }

  return new Date(`${month} ${day}, ${year}`).toString();
};
