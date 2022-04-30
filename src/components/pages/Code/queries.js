import { gql } from 'graphql-request';

const base = gql`
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

export const getAllCodeProjectsInOrder = gql`
   {
    codeProjectOrderCollection {
      ${base}
    }
  }
`;

export const testAllCodeProjects = gql`
codeProjectCollection {
  items {
    sys {
      id
    }
    # add the fields you want to query
  }
}`;

export const getTopLinks = gql`
  codeProjectCollectionQuery {
    codeProjectCollection(where: { isTopLink: true } ) {
      ${base}
    }
  }
`;

export const getBottomLinks = gql`
  codeProjectCollectionQuery {
    codeProjectCollection(where: { isBottomLink: true } ) {
      ${base}
    }
  }
`;

export const getListLinks = gql`
  codeProjectCollectionQuery {
    codeProjectCollection(where: { isListLink: true } ) {
      ${base}
    }
  }
`;

export const filterCodeProjects = gql`
  codeProjectCollectionQuery {
    codeProjectCollection {
      ${base}
    }
  }
`;
