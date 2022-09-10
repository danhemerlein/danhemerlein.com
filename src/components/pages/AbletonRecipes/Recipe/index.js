import Button from 'components/base/Button';
import { useState } from 'react';
import styled from 'styled-components';
import { colors } from 'styles/ableton-colors';
import { FlexContainer } from 'styles/elements';
import { remHelper } from 'utils/remHelper';
import Info from '../Info';
import TagsGenres from '../TagsGenres';
import * as styles from './Recipe.styles.js';

const StyledButton = styled(Button)`
  height: ${remHelper[32]};
  width: ${remHelper[32]};
`;

const Container = styled(FlexContainer)`
  position: relative;
`;

const ButtonContainer = styled(FlexContainer)`
  position: absolute;
  right: ${remHelper[16]};
  bottom: ${remHelper[32]};
`;

const Recipe = ({ recipe, funMode, handleAddToFavorites }) => {
  const { link, Name, Tags, genre, platform } = recipe;
  const [hovered, setHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <Container justify="space-between">
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
        <Info
          name={Name}
          platform={platform}
          recipe={recipe}
          hovered={hovered}
        />

        <TagsGenres
          tags={Tags}
          genre={genre}
          borderColor={color.hex}
          hovered={hovered}
        />
      </styles.StyledA>
      <ButtonContainer>
        <StyledButton
          onMouseEnter={() => {
            return setButtonHovered(true);
          }}
          onMouseLeave={() => {
            return setButtonHovered(false);
          }}
          type="button"
          clickHandler={() => {
            handleAddToFavorites();
          }}
        >
          {buttonHovered ? <span>🤍</span> : <span>🖤</span>}
        </StyledButton>
      </ButtonContainer>
    </Container>
  );
};

Recipe.propTypes = {};

export default Recipe;
