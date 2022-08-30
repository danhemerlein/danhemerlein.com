import FullScreenHeight from 'components/other/FullScreenHeight';
import Loading from 'components/other/Loading';
import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import { Grid } from 'styles/elements';
import { basePageTitle } from 'utils/constants/lib';
import BlogIndexBlock from './BlogIndexBlock';

import { getAllBlogPosts } from './queries';

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

  // console.log(posts);

  return (
    <div>
      {posts.length ? (
        <Grid>
          {posts.map((post, index) => {
            return <BlogIndexBlock post={post} />;
          })}
        </Grid>
      ) : (
        <FullScreenHeight unsetBreakpoint="none">
          <Loading />
        </FullScreenHeight>
      )}
    </div>
  );
};

export default BlogIndex;
