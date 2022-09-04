import { StyledLink } from 'styles/elements';
import { createReadableDateFromContentful, truncateString } from 'utils/lib';
import * as styles from './BlogIndexBlock.styles';

const BlogIndexBlock = ({ post }) => {
  const { handle, title, description, published, coverImage } = post;

  const date = createReadableDateFromContentful(published);

  return (
    <StyledLink to={`/blog/${handle}`}>
      <styles.Block direction="column">
        <styles.StyledImg src={coverImage.url} alt="" />
        <styles.TextContainer direction="column" justify="space-between">
          <styles.Paragraph>{title}</styles.Paragraph>
          {description ? (
            <styles.Paragraph>
              {truncateString(description, 12)}
            </styles.Paragraph>
          ) : null}

          <styles.Paragraph>published: {date}</styles.Paragraph>
        </styles.TextContainer>
      </styles.Block>
    </StyledLink>
  );
};

BlogIndexBlock.propTypes = {};

export default BlogIndexBlock;
