import styled from 'styled-components';
import { P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

const Container = styled.div`
  width: 75%;
`;

const TagGenreContainer = styled.div`
  gap: 8px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const TagsGrenresContainer = styled(TagGenreContainer)`
  margin-top: ${remHelper[8]};
  max-width: 100%;
`;

const TagGenre = styled.li`
  border: 1px solid;

  border-color: ${({ theme }) => {
    return theme.foreground;
  }};
  border-radius: 5px;
  padding: ${remHelper[4]};
`;

function TagsGenres({ tags, genre }) {
  return (
    <Container>
      <TagsGrenresContainer>
        <P>tags:</P>
        <TagGenreContainer as="ul">
          {tags.split(',').map((tag) => {
            return <TagGenre>{tag}</TagGenre>;
          })}
        </TagGenreContainer>
      </TagsGrenresContainer>

      {genre.length > 0 ? (
        <TagsGrenresContainer>
          <P>genre(s):</P>
          <TagGenreContainer as="ul">
            {genre.split(',').map((genre) => {
              return <TagGenre>{genre}</TagGenre>;
            })}
          </TagGenreContainer>
        </TagsGrenresContainer>
      ) : null}
    </Container>
  );
}

TagsGenres.propTypes = {};

export default TagsGenres;
