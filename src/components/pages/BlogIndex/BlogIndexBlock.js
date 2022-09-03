import styled from 'styled-components';
import { FlexContainer, P, StyledLink } from 'styles/elements';
import { createReadableDateFromContentful } from 'utils/lib';
import { remHelper } from 'utils/remHelper';

const Block = styled(FlexContainer)`
  height: 320px;
  padding: ${remHelper[16]};

  position: relative;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  div {
    z-index: 10;
    padding: ${remHelper[16]};
    color: ${({ theme }) => {
      return theme.foreground;
    }};
    background: ${({ theme }) => {
      return theme.background;
    }};
  }
`;

const Paragraph = styled(P)`
  margin-bottom: ${remHelper[16]};
`;

const BlogIndexBlock = ({ post }) => {
  console.log(post);
  const { handle, title, description, published } = post;

  const date = createReadableDateFromContentful(published);

  return (
    <StyledLink to={`/blog/${handle}`}>
      <Block direction="column">
        <img src={post.coverImage.url} alt="" />
        <FlexContainer direction="column" justify="space-between">
          <Paragraph>{title}</Paragraph>
          <Paragraph>{description}</Paragraph>
          <Paragraph>published: {date}</Paragraph>
        </FlexContainer>
      </Block>
    </StyledLink>
  );
};

BlogIndexBlock.propTypes = {};

export default BlogIndexBlock;
