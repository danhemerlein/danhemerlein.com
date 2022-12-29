/* eslint-disable react/no-unstable-nested-components */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Loading from 'components/other/Loading';
import { contentfulRequest } from 'contentfulClient';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { basePageDescription, basePageTitle } from 'utils/constants/lib';
import {
  calculateReadingTimeFromContentfulContent,
  createReadableDateFromContentful
} from 'utils/lib';
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
  }, [params?.handle, post?.title]);

  if (!post) return <Loading />;

  const { title, description, published, coverImage } = post;
  const updatedAt = post.sys.publishedAt;

  return (
    <styles.Post>
      <Helmet>
        <title>
          {basePageTitle} - {post?.title}
        </title>
        <meta name="title" content={`${basePageTitle} - ${post?.title}`} />
        <meta
          name="description"
          content={description !== null ? description : basePageDescription}
        />
        <meta name="og:title" content={`${basePageTitle} - ${post?.title}`} />
        <meta
          name="og:description"
          content={description !== null ? description : basePageDescription}
        />
        <meta name="og:image" content={coverImage.url} />
        <meta name="og:image" content={coverImage.url} />

        <meta name="twitter:title" content={post?.title} />
        <meta
          name="twitter:description"
          content={description !== null ? description : basePageDescription}
          data-react-helmet="true"
        />

        <meta name="twitter:image" content={coverImage.url} />
        <meta name="twiter:image.alt" content={coverImage.url.title} />
      </Helmet>

      <header>
        <styles.Headline>{title}</styles.Headline>
      </header>

      {description ? (
        <section>
          <styles.SubHeadline as="h2">{description}</styles.SubHeadline>
        </section>
      ) : null}

      <styles.Published>
        <span>published on {createReadableDateFromContentful(published)}</span>
        <br />
        <span>updated on {createReadableDateFromContentful(updatedAt)}</span>
        <br />
        estimated reading time:{' '}
        {calculateReadingTimeFromContentfulContent(
          post.content.json.content
        )}{' '}
        min
      </styles.Published>

      {post.content.json.content.map((item) => {
        return documentToReactComponents(
          item,
          generateRichTextParserOptions(post, true)
        );
      })}
    </styles.Post>
  );
};

export default BlogPost;
