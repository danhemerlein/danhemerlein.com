import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { basePageTitle } from 'utils/constants/lib';
import { getBlogPostByHandle } from '../BlogIndex/queries';

const BlogPost = () => {
  const [post, setPost] = useState({});

  const params = useParams();

  const fetchPost = async (handle) => {
    const post = await contentfulRequest(getBlogPostByHandle(handle));

    const p = post.blogPostCollection.items[0];

    setPost(p);
  };

  useEffect(() => {
    const fetchData = () => {
      fetchPost(params.handle);
    };

    fetchData();

    document.title = `${basePageTitle} - music`;
  }, [params.handle]);

  return <div>BlogPost</div>;
};

export default BlogPost;
