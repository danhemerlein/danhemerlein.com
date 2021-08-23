import { capitalizeFirstLetter } from 'utils';

const addDateTime = (arr) => {
  // eslint-disable-next-line array-callback-return
  arr.map((item) => {
    let date = item.fields.releaseDate;

    date = date.replace(',', '').split(' ');
    const [month, day, year] = date;

    const dateFormat = `${year}-${capitalizeFirstLetter(month)}-${day}`;
    const d = new Date(dateFormat);

    item.fields.releaseDateFormat = d;
  });
};

export default addDateTime;
