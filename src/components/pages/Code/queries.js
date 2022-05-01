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

export const getTopLinks = gql`{
    codeProjectCollection(where: { isTopLink: true } ) {
      ${base}
    }
  }
`;

export const getBottomLinks = gql`{
    codeProjectCollection(where: { isBottomLink: true } ) {
      ${base}
    }
  }
`;

export const getListLinks = gql` {
    codeProjectCollection(where: { isListLink: true } ) {
      ${base}
    }
  }
`;
