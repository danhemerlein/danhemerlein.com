import { gql } from 'graphql-request'

const sysBase = `
  sys {
    id
    publishedAt
  }

  title
  description
  handle
  published

  coverImage {
    title
    url
  }
`

const base = `
  items {
    ${sysBase}
  }
`

const pageBase = `
  items {
    ${sysBase}

    content {
      json
      links {
        assets {
          block {
            title
            url
            sys {
              id
            }
          }
        }
      }
    }
  }
`

export const getAllBlogPosts = gql`{
   blogPostCollection( order: published_DESC ) {
      ${base}
    }
  }
`

export const sortPosts = (sortVal) => {
  const query = gql`{
    blogPostCollection( order: ${sortVal} ) {
      ${base}
    }
  }
  `

  return query
}

export const filterPosts = (filterVal) => {
  const start = `${filterVal}-01-01T00:00:30Z`
  const end = `${filterVal}-12-31T23:59:30Z`
  const query = gql`{
    blogPostCollection(where: {published_gt: ${JSON.stringify(
      start
    )} published_lt: ${JSON.stringify(end)}}) {
      ${base}
    }
  }
  `

  return query
}

export const getBlogPostByHandle = (handle) => {
  const h = JSON.stringify(handle)

  const query = gql`{
    blogPostCollection(where: { handle: ${h} } limit: 1) {
      ${pageBase}
    }
  }
`

  return query
}
