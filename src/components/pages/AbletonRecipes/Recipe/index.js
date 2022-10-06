import Button from 'components/base/Button';
import { bool } from 'prop-types';
import { recipePropTypes } from 'propTypes';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from 'styles/ableton-colors';
import { FlexContainer } from 'styles/elements';
import { remHelper } from 'utils/remHelper';
import { UserContext } from '../context';
import { getHeartsByUserAndPost } from '../firebaseHelpers';
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
  const { user } = useContext(UserContext);

  const [isHearted, setIsHearted] = useState(false);

  const fetchHeart = async (userUid, postUid) => {
    const res = await getHeartsByUserAndPost(userUid, postUid);
    setIsHearted(res[0]);
  };

  useEffect(() => {
    fetchHeart(user?.uid, recipe?.uid);
  }, [user, recipe]);

  console.log(isHearted);

  const { link, name, tags, genrePrimary, genreSecondary, platform } = recipe;
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
          name={name}
          platform={platform}
          recipe={recipe}
          hovered={hovered}
        />

        <TagsGenres
          tags={tags}
          genrePrimary={genrePrimary}
          genreSecondary={genreSecondary}
          borderColor={color.hex}
          hovered={hovered}
          name={name}
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

Recipe.propTypes = {
  recipe: recipePropTypes.isRequired,
  funMode: bool.isRequired
};

export default Recipe;
