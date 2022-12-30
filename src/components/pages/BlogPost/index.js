/* eslint-disable react/no-unstable-nested-components */
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
// import FullScreenHeight from 'components/other/FullScreenHeight';
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
  const [height, setHeight] = useState(0);
  const [manualHeight, setManualHeight] = useState(false);

  const params = useParams();

  const fetchPost = async (handle) => {
    const post = await contentfulRequest(getBlogPostByHandle(handle));

    const p = post.blogPostCollection.items[0];

    setPost(p);
  };

  const generateHeight = (setHeight, height) => {
    return setHeight ? `${height}px` : 'auto';
  };

  const handleResize = () => {
    const PADDING = 32;
    const HEADER_HEIGHT = 28;
    const FOOTER_HEIGHT = 22;
    const WINDOW_HEIGHT = window.innerHeight;

    setTimeout(() => {
      const article = document.querySelector('#blog-post-article');
      const ARTICLE_HEIGHT = article.offsetHeight;
      const TOTAL = PADDING + HEADER_HEIGHT + FOOTER_HEIGHT + ARTICLE_HEIGHT;

      if (TOTAL < WINDOW_HEIGHT) {
        setManualHeight(true);
        setHeight(WINDOW_HEIGHT - PADDING - FOOTER_HEIGHT - HEADER_HEIGHT);
      }
    }, 100);
  };

  useEffect(() => {
    const fetchData = () => {
      fetchPost(params.handle);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    fetchData();
  }, [params?.handle, post?.title, height, manualHeight]);

  if (!post) return <Loading />;

  const { title, description, published, coverImage } = post;
  const updatedAt = post.sys.publishedAt;

  return (
    <styles.Post height={generateHeight(manualHeight, height)}>
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

      <div id="blog-post-article">
        <header>
          <styles.Headline>{title}</styles.Headline>
        </header>

        {description ? (
          <section>
            <styles.SubHeadline as="h2">{description}</styles.SubHeadline>
          </section>
        ) : null}

        <section>
          <styles.Published>
            <span>
              published on {createReadableDateFromContentful(published)}
            </span>
            <br />
            <span>
              updated on {createReadableDateFromContentful(updatedAt)}
            </span>
            <br />
            estimated reading time:{' '}
            {calculateReadingTimeFromContentfulContent(
              post.content.json.content
            )}{' '}
            min
          </styles.Published>
        </section>

        {post.content.json.content.map((item) => {
          return documentToReactComponents(
            item,
            generateRichTextParserOptions(post, true)
          );
        })}
      </div>
    </styles.Post>
  );
};

export default BlogPost;
