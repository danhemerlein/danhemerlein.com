/**
 * Returns boolean - true - if a param is a number and is evenly devisible by 2. else returns false
 * @param {number} i
 * @return {boolean}
 */

export const isEven = (i) => {
  if (typeof i !== 'number') return undefined;

  return i % 2 === 0;
};

/**
 * Returns string with first letter capitalized and all other letters lowercase
 * @param {string} string
 * @return {string}
 */

export const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') return undefined;

  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
};

export const basePageTitle = 'dan hemerlein';

export const addOrder = (content, orderSchema) => {
  return content.map((item) => {
    return (item.fields.order = orderSchema[item.fields.title].order);
  });
};

export const compare = (a, b) => {
  return a.fields.order - b.fields.order;
};
