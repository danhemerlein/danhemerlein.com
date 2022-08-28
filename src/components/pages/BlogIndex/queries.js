import { gql } from 'graphql-request';

const sysBase = `
  sys {
    id
  }

  title
  description
  handle
`;

const base = `
  items {
    ${sysBase}
  }
`;

export const getAllBlogPosts = gql`{
   blogPostCollection( order: order_ASC ) {
      ${base}
    }
  }
`;
