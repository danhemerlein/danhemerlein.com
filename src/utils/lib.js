/**
 * Returns string with first letter capitalized and all other letters lowercase
 * @param {string} string
 * @return {string}
 */

export const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') return undefined;

  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
};

export const addOrder = (content, orderSchema) => {
  return content.map((item) => {
    return (item.fields.order = orderSchema[item.fields.title].order);
  });
};

export const compare = (a, b) => {
  return a.fields.order - b.fields.order;
};
