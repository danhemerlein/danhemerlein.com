import { gql } from 'graphql-request';

const base = `
  items {
    sys {
      id
    }

    performed
    produced
    wrote

    order
    artist
    role
    handle
    title
    artwork {
      title
      url
    }

  }
`;

export const getAllProjects = gql`{
   musicProjectCollection( order: order_ASC ) {
      ${base}
    }
  }
`;

export const setFilteredProjects = (filterObject, order, artist) => {
  const trueKeys = Object.keys(filterObject).filter((key) => {
    return filterObject[key] === true;
  });

  console.log(order);
  console.log(artist);

  if (trueKeys.length === 1) {
    return gql`{
      musicProjectCollection(where: { OR: [
        {${trueKeys[0]}: true},
        ]}, order: ${order} ) {
        ${base}
      }
    }`;
  }

  if (trueKeys.length === 2) {
    return gql`{
      musicProjectCollection(where: { OR: [
        {${trueKeys[0]}: true},
        {${trueKeys[1]}: true},
        ]}, order: ${order} ) {
        ${base}
      }
    }`;
  }

  if (trueKeys.length === 3) {
    return gql`{
      musicProjectCollection(where: { OR: [
        {${trueKeys[0]}: true},
        {${trueKeys[1]}: true},
        {${trueKeys[2]}: true}
        ]}, order: ${order} ) {
        ${base}
      }
    }`;
  }
};
