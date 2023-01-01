import { StyledLink } from 'styles/elements';
import { createReadableDateFromContentful, truncateString } from 'utils/lib';
import * as styles from './BlogIndexBlock.styles';

const BlogIndexBlock = ({ post }) => {
  const { handle, title, description, published } = post;
  const updatedAt = post.sys.publishedAt;

  const date = createReadableDateFromContentful(published);

  return (
    <StyledLink to={`/notes/${handle}`}>
      <styles.Block direction="column" titleLength={title.length}>
        <styles.TextContainer direction="column" justify="space-between">
          <styles.Paragraph>{title}</styles.Paragraph>
          {description ? (
            <styles.Paragraph>
              {truncateString(description, 12)}
            </styles.Paragraph>
          ) : null}

          <styles.Paragraph lowercase>published: {date}</styles.Paragraph>
          <styles.Paragraph lowercase>
            updated: {createReadableDateFromContentful(updatedAt)}
          </styles.Paragraph>
        </styles.TextContainer>
      </styles.Block>
    </StyledLink>
  );
};

BlogIndexBlock.propTypes = {};

export default BlogIndexBlock;
