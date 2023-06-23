import { gql } from 'graphql-request';

const base = `
  sys {
    id
  }

  imagesCollection(limit: 10) {
    total
    items {
      title
      url
    }
  }
`;

export const getMoodboardContent = gql`{
  moodboard(id: "5qaYjs8UZbaw8ZFihn1Y3w") {
      ${base}
    }
  }
`;

export const getMoodboardContentPage = (page) => {
  const query = gql`
    {
      moodboard(id: "5qaYjs8UZbaw8ZFihn1Y3w") {
        sys {
          id
        }
        imagesCollection(limit: 10, skip: ${page}) {
          items {
            title
            url
          }
        }
      }
    }
  `;

  return query;
};
