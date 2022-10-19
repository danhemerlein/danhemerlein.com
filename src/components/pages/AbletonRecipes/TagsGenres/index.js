import { P } from 'styles/elements';
import * as styles from './TagsGenres.styles';

const TagsGenres = ({ tags, genrePrimary, genreSecondary, hovered, name }) => {
  return (
    <styles.Container>
      <styles.TagsGrenresContainer>
        <P>tags:</P>
        <styles.TagGenreContainer as="ul">
          {tags.map((tag) => {
            return (
              <styles.TagGenre key={name + tag} hovered={hovered}>
                {tag}
              </styles.TagGenre>
            );
          })}
        </styles.TagGenreContainer>
      </styles.TagsGrenresContainer>

      {genrePrimary && <P>primary genre: {genrePrimary}</P>}
      {genreSecondary && <P>secondary genre: {genreSecondary}</P>}
    </styles.Container>
  );
};

TagsGenres.propTypes = {};

export default TagsGenres;
