import styled from 'styled-components';
import { A } from 'styles/elements';
import { globalTransition } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';
import Info from './Info';
import TagsGenres from './TagsGenres';

const StyledA = styled(A)`
  padding: ${remHelper[16]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid;

  color: ${({ theme }) => {
    return theme.foreground;
  }};

  border-color: ${({ theme }) => {
    return theme.foreground;
  }};

  background: ${({ theme }) => {
    return theme.background;
  }};

  transition: background ${globalTransition}, color ${globalTransition};

  text-decoration: unset;

  &:hover,
  &:focus {
    text-decoration: unset;

    background: ${({ theme }) => {
      return theme.foreground;
    }};
    color: ${({ theme }) => {
      return theme.background;
    }};
  }

  &:not(:last-of-type) {
    margin-bottom: ${remHelper[16]};
  }
`;

const Recipe = ({ recipe }) => {
  const { link, Name, Tags, genre, platform } = recipe;

  return (
    <StyledA href={link} target="_blank">
      <Info name={Name} platform={platform} recipe={recipe} />

      <TagsGenres tags={Tags} genre={genre} />
    </StyledA>
  );
};

Recipe.propTypes = {};

export default Recipe;
