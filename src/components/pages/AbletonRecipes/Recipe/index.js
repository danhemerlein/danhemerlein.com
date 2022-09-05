import Info from '../Info';
import TagsGenres from '../TagsGenres';
import * as styles from './Recipe.styles.js';

const Recipe = ({ recipe }) => {
  const { link, Name, Tags, genre, platform } = recipe;

  return (
    <styles.StyledA href={link} target="_blank">
      <Info name={Name} platform={platform} recipe={recipe} />
      <TagsGenres tags={Tags} genre={genre} />
    </styles.StyledA>
  );
};

Recipe.propTypes = {};

export default Recipe;
