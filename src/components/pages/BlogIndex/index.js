import FullScreenHeight from 'components/other/FullScreenHeight';
import Loading from 'components/other/Loading';
import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Grid, H1 } from 'styles/elements';
import { PageHero } from 'styles/elements/containers';
import { basePageTitle } from 'utils/constants/lib';
import BlogIndexBlock from './BlogIndexBlock';
import BlogSort from './BlogSort';

import { getAllBlogPosts, sortPosts } from './queries';

const Hero = styled(PageHero)`
  background: linear-gradient(to left, #c23b22 0%, #b848a5 100%);

  h1 {
    color: ${({ theme }) => {
      return theme.general.white;
    }};
  }
`;

const BlogIndex = () => {
  const [posts, setPosts] = useState([]);

  const fetchAllProjects = async () => {
    const allPosts = await contentfulRequest(getAllBlogPosts);

    setPosts(allPosts.blogPostCollection.items);
  };

  const changeHandler = async (val) => {
    const posts = await contentfulRequest(sortPosts(val));
    setPosts(posts.blogPostCollection.items);
  };

  useEffect(() => {
    const fetchData = () => {
      fetchAllProjects();
    };

    fetchData();

    document.title = `${basePageTitle} - blog`;
  }, []);

  return (
    <div>
      {posts.length ? (
        <div>
          <Hero items="center" justify="center">
            <H1>blog</H1>
          </Hero>
          <BlogSort handleChange={changeHandler} />
          <Grid mobileColumns={1}>
            {posts.map((post) => {
              return <BlogIndexBlock post={post} key={post.handle} />;
            })}
          </Grid>
        </div>
      ) : (
        <FullScreenHeight unsetBreakpoint="none">
          <Loading />
        </FullScreenHeight>
      )}
    </div>
  );
};

export default BlogIndex;
