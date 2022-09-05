import { P } from 'styles/elements';
import * as styles from './TagsGenres.styles';

const TagsGenres = ({ tags, genre }) => {
  return (
    <styles.Container>
      <styles.TagsGrenresContainer>
        <P>tags:</P>
        <styles.TagGenreContainer as="ul">
          {tags.split(',').map((tag) => {
            return <styles.TagGenre>{tag}</styles.TagGenre>;
          })}
        </styles.TagGenreContainer>
      </styles.TagsGrenresContainer>

      {genre.length > 0 ? (
        <styles.TagsGrenresContainer>
          <P>genre(s):</P>
          <styles.TagGenreContainer as="ul">
            {genre.split(',').map((genre) => {
              return <styles.TagGenre>{genre}</styles.TagGenre>;
            })}
          </styles.TagGenreContainer>
        </styles.TagsGrenresContainer>
      ) : null}
    </styles.Container>
  );
};

TagsGenres.propTypes = {};

export default TagsGenres;
