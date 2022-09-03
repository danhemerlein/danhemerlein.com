/* eslint-disable react/no-unstable-nested-components */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Loading from 'components/other/Loading';
import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { basePageTitle } from 'utils/constants/lib';
import { createReadableDateFromContentful } from 'utils/lib';
import { generateRichTextParserOptions } from 'utils/rich-text-helpers';
import { getBlogPostByHandle } from '../BlogIndex/queries';
import * as styles from './BlogPost.styles';

const BlogPost = () => {
  const [post, setPost] = useState(undefined);

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

    document.title = `${basePageTitle} - ${post?.title}`;
  }, [params?.handle, post?.title]);

  if (!post) return <Loading />;

  return (
    <styles.Post>
      <header>
        <styles.Headline>{post.title}</styles.Headline>
      </header>
      <section>
        <styles.SubHeadline as="h2">{post.description}</styles.SubHeadline>
      </section>
      <styles.Published>
        {createReadableDateFromContentful(post.published)}
      </styles.Published>

      <div>
        {post.content.json.content.map((item) => {
          return documentToReactComponents(
            item,
            generateRichTextParserOptions(post)
          );
        })}
      </div>
    </styles.Post>
  );
};

export default BlogPost;
