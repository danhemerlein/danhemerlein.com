import { P } from 'styles/elements';
import * as styles from './TagsGenres.styles';

const TagsGenres = ({ tags, genrePrimary, genreSecondary, hovered, name }) => {
  return (
    <styles.Container>
      <styles.TagsGrenresContainer direction="column">
        <P>tags:</P>
        <styles.TagGenreContainer as="ul" items="center" wrap="wrap">
          {tags.map((tag) => {
            return (
              <styles.TagGenre key={name + tag} hovered={hovered}>
                {tag}
              </styles.TagGenre>
            );
          })}
        </styles.TagGenreContainer>
      </styles.TagsGrenresContainer>

      <styles.GenreContainer>
        {genrePrimary && <P>primary genre: {genrePrimary}</P>}
        {genreSecondary && <P>secondary genre: {genreSecondary}</P>}
      </styles.GenreContainer>
    </styles.Container>
  );
};

TagsGenres.propTypes = {};

export default TagsGenres;
