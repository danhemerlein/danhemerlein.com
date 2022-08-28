import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Loading from 'components/other/Loading';
import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ContentfulRichTextWrapper } from 'styles/elements';
import { basePageTitle } from 'utils/constants/lib';
import { createReadableDateFromContentful } from 'utils/lib';
import { getBlogPostByHandle } from '../BlogIndex/queries';
import * as styles from './BlogPost.styles';

const options = {
  renderNode: {
    node: (text) => {
      return <p key={`${text}-key`}>{text}</p>;
    }
  }
};

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

    document.title = `${basePageTitle} - ${post.title}`;
  }, [params.handle, post.title]);

  if (!post) return <Loading />;

  console.log(post);

  return (
    <styles.Post>
      <styles.Headline>{post?.title}</styles.Headline>
      <styles.SubHeadline as="h2">{post?.description}</styles.SubHeadline>
      <styles.Published>
        {createReadableDateFromContentful(post?.published)}
      </styles.Published>

      <ContentfulRichTextWrapper>
        {post?.content?.json.content.map((item) => {
          return documentToReactComponents(item, options);
        })}
      </ContentfulRichTextWrapper>
    </styles.Post>
  );
};

export default BlogPost;
