import { gql } from 'graphql-request';

const sysBase = `
  sys {
    id
  }

  title
  description
  handle
  published
`;

const base = `
  items {
    ${sysBase}
  }
`;

const pageBase = `
  items {
    ${sysBase}

    content {
      json
    }
  }
`;
export const getAllBlogPosts = gql`{
   blogPostCollection( order: order_ASC ) {
      ${base}
    }
  }
`;

export const getBlogPostByHandle = (handle) => {
  const h = JSON.stringify(handle);

  const query = gql`{
    blogPostCollection(where: { handle: ${h} }) {
      ${pageBase}
    }
  }
`;

  return query;
};
