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

export const getFilterSortProjects = (filterArray, order) => {
  const trueKey = filterArray.filter((filter) => {
    const key = Object.keys(filter)[0];
    if (filter[key] === true) {
      return key;
    }
  });

  const s = JSON.stringify(trueKey).replaceAll(`"`, '');

  const query = gql`{
      musicProjectCollection(where: { OR: ${s}}, order: ${order}) {
        ${base}
      }
    }

  `;

  return query;
};
