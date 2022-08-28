import Loading from 'components/other/Loading';
import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, P } from 'styles/elements';
import { basePageTitle } from 'utils/constants/lib';

import { Link } from 'react-router-dom';
import { anchorColor } from 'styles/utilities/mixins';
import { getAllBlogPosts } from './queries';

const StyledLink = styled(Link)`
  width: 100%;

  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor
    });
  }}
`;

const BlogIndex = () => {
  const [posts, setPosts] = useState([]);

  const fetchAllProjects = async () => {
    const allPosts = await contentfulRequest(getAllBlogPosts);
    const p = allPosts.blogPostCollection.items;

    setPosts(p);
  };

  useEffect(() => {
    const fetchData = () => {
      fetchAllProjects();
    };

    fetchData();

    document.title = `${basePageTitle} - blog`;
  }, []);

  console.log(posts);

  return (
    <div>
      {posts.length ? (
        <Grid>
          {posts.map((post, index) => {
            return (
              <StyledLink to={`/blog/${post.handle}`}>
                <P>{post.title}</P>
                <P>{post.description}</P>
              </StyledLink>
            );
          })}
        </Grid>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default BlogIndex;
