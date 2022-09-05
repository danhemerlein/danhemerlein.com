import styled from 'styled-components';
import { A, P } from 'styles/elements';
import { globalTransition } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

const StyledA = styled(A)`
  padding: ${remHelper[16]};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 220px;

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

  text-decoration: unset;
`;

const TagGenreContainer = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
`;

const TagsGrenresContainer = styled(TagGenreContainer)`
  margin-top: ${remHelper[8]};
`;

const TagGenre = styled.li`
  border: 1px solid;

  border-color: ${({ theme }) => {
    return theme.foreground;
  }};
  border-radius: 5px;
  padding: ${remHelper[4]};
`;

const Recipe = ({ recipe }) => {
  return (
    <StyledA href={recipe.link} target="_blank">
      <div>
        <P>{recipe.Name}</P>

        <TagsGrenresContainer>
          <P>tags:</P>
          <TagGenreContainer as="ul">
            {recipe.Tags.split(',').map((tag) => {
              return <TagGenre>{tag}</TagGenre>;
            })}
          </TagGenreContainer>
        </TagsGrenresContainer>

        {recipe.genre.length > 0 ? (
          <TagsGrenresContainer>
            <P>genre(s):</P>
            <TagGenreContainer as="ul">
              {recipe.genre.split(',').map((genre) => {
                return <TagGenre>{genre}</TagGenre>;
              })}
            </TagGenreContainer>
          </TagsGrenresContainer>
        ) : null}
      </div>

      <div>
        <P>{recipe['date posted']}</P>
        <P>{recipe['original poster']}</P>
        <P>platform: {recipe.platform}</P>
      </div>
    </StyledA>
  );
};

Recipe.propTypes = {};

export default Recipe;
