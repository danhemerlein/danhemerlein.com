/* eslint-disable react/no-unstable-nested-components */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';

import Loading from 'components/other/Loading';
import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { A } from 'styles/elements';
import { basePageTitle } from 'utils/constants/lib';
import { createReadableDateFromContentful } from 'utils/lib';
import { getBlogPostByHandle } from '../BlogIndex/queries';
import * as styles from './BlogPost.styles';

const imageSizes = [
  {
    mediaQuery: 'xs',
    params: { w: 687 }
  },
  {
    mediaQuery: 'sm',
    params: { w: 488 }
  },
  {
    mediaQuery: 'md',
    params: { w: 696 }
  },
  {
    mediaQuery: 'lg',
    params: { w: 1196 }
  }
];

const BlogPost = () => {
  const [post, setPost] = useState({});

  const params = useParams();

  const fetchPost = async (handle) => {
    const post = await contentfulRequest(getBlogPostByHandle(handle));

    const p = post.blogPostCollection.items[0];

    setPost(p);
  };

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <styles.Paragraph>{children[0]}</styles.Paragraph>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const img = post.content.links.assets.block.find((i) => {
          return i.sys.id === node.data.target.sys.id;
        });
        console.log(img);

        return <img src={img?.url} alt={img?.title} />;
      },
      [INLINES.HYPERLINK]: ({ data }, children) => {
        return (
          <A href={data.uri} target="_blank" rel="noopener noreferrer">
            {children[0]}
          </A>
        );
      }
    }
  };

  useEffect(() => {
    const fetchData = () => {
      fetchPost(params.handle);
    };

    fetchData();

    document.title = `${basePageTitle} - ${post.title}`;
  }, [params.handle, post.title]);

  if (!post) return <Loading />;

  return (
    <styles.Post>
      <header>
        <styles.Headline>{post?.title}</styles.Headline>
      </header>
      <section>
        <styles.SubHeadline as="h2">{post?.description}</styles.SubHeadline>
      </section>
      <styles.Published>
        {createReadableDateFromContentful(post?.published)}
      </styles.Published>

      <div>
        {post?.content?.json.content.map((item) => {
          return documentToReactComponents(item, options);
        })}
      </div>
    </styles.Post>
  );
};

export default BlogPost;
