import styled from 'styled-components';
import { FlexContainer, P, StyledLink } from 'styles/elements';
import { globalTransition } from 'styles/utilities';
import { createReadableDateFromContentful } from 'utils/lib';
import { remHelper } from 'utils/remHelper';

const Block = styled(FlexContainer)`
  height: 240px;
  padding: ${remHelper[16]};

  border: 1px solid;
  border-color: ${({ theme }) => {
    return theme.foreground;
  }};

  transition: background ${globalTransition}, color ${globalTransition},
    border-color ${globalTransition};

  &:hover,
  &:focus {
    background: ${({ theme }) => {
      return theme.foreground;
    }};
    border-color: ${({ theme }) => {
      return theme.background;
    }};
    color: ${({ theme }) => {
      return theme.background;
    }};
  }
`;

const Paragraph = styled(P)`
  margin-bottom: ${remHelper[16]};
`;

const BlogIndexBlock = ({ post }) => {
  const { handle, title, description, published } = post;

  const date = createReadableDateFromContentful(published);

  return (
    <StyledLink to={`/blog/${handle}`}>
      <Block direction="column">
        <Paragraph>{title}</Paragraph>
        <Paragraph>{description}</Paragraph>
        <Paragraph>published: {date}</Paragraph>
      </Block>
    </StyledLink>
  );
};

BlogIndexBlock.propTypes = {};

export default BlogIndexBlock;
