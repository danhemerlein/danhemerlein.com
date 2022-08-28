import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import { P } from 'styles/elements';
import { basePageTitle } from 'utils/constants/lib';

import styled from 'styled-components';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

import { Link } from 'react-router-dom';
import { anchorColor } from 'styles/utilities/mixins';
import { getAllBlogPosts } from './queries';

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  column-gap: ${remHelper[16]};
  row-gap: ${remHelper[16]};
  margin-bottom: ${remHelper[16]};

  ${above.desktop`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

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
        <div> posts loading</div>
      )}
    </div>
  );
};

export default BlogIndex;
