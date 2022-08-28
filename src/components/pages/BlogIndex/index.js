import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import { basePageTitle } from 'utils/constants/lib';
import { getAllBlogPosts } from './queries';

const BlogIndex = (props) => {
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

  return <div>BlogIndex</div>;
};

export default BlogIndex;
