import { capitalizeFirstLetter } from 'utils/lib';

const addDateTime = (arr) => {
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
