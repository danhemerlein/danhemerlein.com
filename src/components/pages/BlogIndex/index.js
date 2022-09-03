import FullScreenHeight from 'components/other/FullScreenHeight';
import Loading from 'components/other/Loading';
import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import { Grid } from 'styles/elements';
import { basePageTitle } from 'utils/constants/lib';
import BlogIndexBlock from './BlogIndexBlock';
import BlogSort from './BlogSort';

import { getAllBlogPosts, sortPosts } from './queries';

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
          <BlogSort handleChange={changeHandler} />
          <Grid>
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
