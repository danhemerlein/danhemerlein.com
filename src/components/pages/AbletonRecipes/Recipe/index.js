import { colors } from 'styles/ableton-colors';
import { P } from 'styles/elements';

import Info from '../Info';
import TagsGenres from '../TagsGenres';
import * as styles from './Recipe.styles.js';

const Recipe = ({ recipe }) => {
  const { link, Name, Tags, genre, platform } = recipe;
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <styles.StyledA href={link} target="_blank" borderColor={color.hex}>
      <Info name={Name} platform={platform} recipe={recipe} />
      <TagsGenres tags={Tags} genre={genre} borderColor={color.hex} />
      <P>{color.hex}</P>
    </styles.StyledA>
  );
};

Recipe.propTypes = {};

export default Recipe;
