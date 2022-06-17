import * as contentful from 'contentful';

const client = contentful.createClient({
  space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
  accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
});

export default client;

const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/master`;

export const contentfulRequest = async (query, variables = {}) => {
  console.log(query);
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const { errors = [], data = {} } = (await res.json()) || {};

  return errors.length
    ? errors.map((error) => {
        return console.warn(error.message);
      })
    : data;
};
