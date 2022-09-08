import { useState } from 'react';
import { colors } from 'styles/ableton-colors';
import Info from '../Info';
import TagsGenres from '../TagsGenres';
import * as styles from './Recipe.styles.js';

const Recipe = ({ recipe, funMode }) => {
  const { link, Name, Tags, genre, platform } = recipe;
  const [hovered, setHovered] = useState(false);
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <styles.StyledA
      href={link}
      target="_blank"
      borderColor={funMode ? color.hex : '#000'}
      onMouseEnter={() => {
        return setHovered(true);
      }}
      onMouseLeave={() => {
        return setHovered(false);
      }}
    >
      <Info name={Name} platform={platform} recipe={recipe} hovered={hovered} />
      <TagsGenres
        tags={Tags}
        genre={genre}
        borderColor={color.hex}
        hovered={hovered}
      />
    </styles.StyledA>
  );
};

Recipe.propTypes = {};

export default Recipe;
