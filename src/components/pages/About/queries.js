import { gql } from 'graphql-request';

const base = `
  sys {
    id
  }

  heroImage {
    title
    url

    sys {
      id
    }
  }

  heroImagePrime {
    title
    url

    sys {
      id
    }
  }

`;

export const getAboutPageContent = gql`{
    aboutPage(id: "4s79WxHDy7QgVK7V8qomFM") {
      ${base}
    }
  }
`;
