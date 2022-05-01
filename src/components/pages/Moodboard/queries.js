import { gql } from 'graphql-request';

const base = `
  sys {
    id
  }
  imagesCollection {
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
