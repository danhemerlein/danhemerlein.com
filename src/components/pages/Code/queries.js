import { gql } from 'graphql-request';

const base = `
  items {
    sys {
      id
    }

    title
    link
    timelineLaunchDate

    description {
      json
    }

    image {
      url
      title
    }

    isListLink
    isTopLink
    isBottomLink
    highlight

    workExperience
    portfolios
    passionProject
    freelance
  }
`;

export const getAllProjects = gql`{
   codeProjectCollection( order: order_ASC ) {
      ${base}
    }
  }
`;

// export const getTopLinks = gql`{
//     codeProjectCollection(where: { isTopLink: true }, order: order_ASC ) {
//       ${base}
//     }
//   }
// `;

// export const getBottomLinks = gql`{
//     codeProjectCollection(where: { isBottomLink: true }, order: order_ASC ) {
//       ${base}
//     }
//   }
// `;

// export const getListLinks = gql` {
//     codeProjectCollection(where: { isListLink: true }, order: order_ASC ) {
//       ${base}
//     }
//   }
// `;

export const filterProjects = (filter) => {
  return gql` {
    codeProjectCollection(where: { ${filter}: true }, order: order_ASC ) {
      ${base}
    }
  }
  `;
};
