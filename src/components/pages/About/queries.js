import { gql } from 'graphql-request';

const imageBase = `
  title
  url

  sys {
    id
  }
`;

const base = `
  sys {
    id
  }

  heroImage {
    ${imageBase}
  }

  heroImagePrime {
    ${imageBase}
  }

  aboutPageImage {
    ${imageBase}
  }

  aboutPageImagePrime {
    ${imageBase}
  }

  resume {
    ${imageBase}
  }

`;

export const getAboutPageContent = gql`{
    aboutPage(id: "4s79WxHDy7QgVK7V8qomFM") {
      ${base}
    }
  }
`;
