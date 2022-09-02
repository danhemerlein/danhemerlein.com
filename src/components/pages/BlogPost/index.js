/* eslint-disable react/no-unstable-nested-components */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import Loading from 'components/other/Loading';
import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import ReactContentfulImage from 'react-contentful-image';
import { useParams } from 'react-router-dom';
import { A } from 'styles/elements';
import { basePageTitle } from 'utils/constants/lib';
import {
  altTextHelper,
  createReadableDateFromContentful,
  reactContentfulImageURLHelper
} from 'utils/lib';
import { getBlogPostByHandle } from '../BlogIndex/queries';
import * as styles from './BlogPost.styles';

const imageSizes = [
  {
    mediaQuery: 'xs',
    params: { w: 288 }
  },
  {
    mediaQuery: 'sm',
    params: { w: 640 }
  },
  {
    mediaQuery: 'md',
    params: { w: 640 }
  },
  {
    mediaQuery: 'lg',
    params: { w: 640 }
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
    renderMark: {
      [MARKS.BOLD]: (text) => {
        return <styles.B>{text}</styles.B>;
      },
      [MARKS.ITALIC]: (text) => {
        return <styles.EM>{text}</styles.EM>;
      }
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <styles.Paragraph>{children}</styles.Paragraph>;
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return <styles.SubHeadline>{children}</styles.SubHeadline>;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const img = post.content.links.assets.block.find((i) => {
          return i.sys.id === node.data.target.sys.id;
        });

        const url = reactContentfulImageURLHelper(img.url);

        return (
          <styles.ImageContainer>
            <ReactContentfulImage
              src={url.replace(window.location.origin, '')}
              alt={altTextHelper(img?.title)}
              sizes={imageSizes}
              loading="lazy"
            />
          </styles.ImageContainer>
        );
      },
      [INLINES.HYPERLINK]: ({ data }, children) => {
        return (
          <A href={data.uri} target="_blank" rel="noopener noreferrer">
            {children}
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

  console.log(post);

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
