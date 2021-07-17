import { capitalizeFirstLetter } from "utils";

function addDateTime(arr) {
  arr.map((item) => {
    let date = item.fields.releaseDate;

    const months = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };

    date = date.replace(",", "").split(" ");
    const [month, day, year] = date;

    const dateFormat = `${year}-${capitalizeFirstLetter(month)}-${day}`;
    const d = new Date(dateFormat);

    item.fields.releaseDateFormat = d;
  });
}

export default addDateTime;
