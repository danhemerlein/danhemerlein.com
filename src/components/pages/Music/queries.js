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

const pageBase = `
  items {
    sys {
      id
    }

    performed
    produced
    wrote
    releaseDate

    order
    artist
    role
    handle
    title
    artwork {
      title
      url
    }

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

  let query;

  if (artist.length) {
    query = gql`{
      musicProjectCollection(where: { OR: ${s}, artist: ${a} }, order: ${order}) {
        ${base}
      }
    }
  `;
  } else {
    query = gql`{
      musicProjectCollection(where: { OR: ${s} }, order: ${order}) {
        ${base}
      }
    }
  `;
  }

  return query;
};
