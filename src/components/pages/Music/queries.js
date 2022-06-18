import { gql } from 'graphql-request';

const sysBase = `
  sys {
    id
  }

  performed
  produced
  wrote

  artist
  role
  handle
  title
  artwork {
    title
    url
  }
`;

const base = `
  items {
    ${sysBase}
  }
`;

const pageBase = `
  items {
    ${sysBase}

    releaseDate

    spotify
    bandcamp
    apple
    tidal
    amazon
    deezer
    napster
    googlePlay
    soundcloud
  }
`;

export const getAllProjects = gql`{
   musicProjectCollection( order: order_ASC ) {
      ${base}
    }
  }
`;

export const getProjectByHandle = (handle) => {
  const h = JSON.stringify(handle);

  const query = gql`{
    musicProjectCollection(where: { handle: ${h} }) {
      ${pageBase}
    }
  }
`;

  return query;
};

export const getFilterSortProjects = (filterArray, order, artist) => {
  const trueKey = filterArray.filter((filter) => {
    const key = Object.keys(filter)[0];
    if (filter[key] === true) {
      return key;
    }
  });

  const s = JSON.stringify(trueKey).replaceAll(`"`, '');

  const a = JSON.stringify(artist);

  let orStatement = `OR: ${s}, `;

  if (artist.length) {
    orStatement += `artist: ${a}`;
  }
  const query = gql`{
    musicProjectCollection(where: { ${orStatement} }, order: ${order}) {
      ${base}
    }
  }
  `;

  return query;
};
