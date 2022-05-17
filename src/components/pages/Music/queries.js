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

export const filterProjects = (filter) => {
  return gql` {
    musicProjectCollection(where: { ${filter}: true }, order: order_ASC ) {
      ${base}
    }
  }
  `;
};
