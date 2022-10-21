import { doc, onSnapshot } from 'firebase/firestore';
import { bool } from 'prop-types';
import { recipePropTypes } from 'propTypes';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { colors } from 'styles/ableton-colors';
import { FlexContainer } from 'styles/elements';
import { firestore } from 'utils/firestore';
import { remHelper } from 'utils/remHelper';
import { UserContext } from '../context';
import { getHeartsByUserAndPost } from '../firebaseHelpers';
import Info from '../Info';
import TagsGenres from '../TagsGenres';
import EmptyHeart from './EmptyHeart';

import * as styles from './Recipe.styles.js';

const StyledButton = styled.button`
  height: ${remHelper[32]};
  width: ${remHelper[32]};
  padding: 0;
  border: 0;
  cursor: pointer;

  background-color: ${({ theme, liked, hovered }) => {
    if (liked && hovered) {
      return theme.background;
    }

    if (liked) {
      return theme.foreground;
    }

    if (hovered && !liked) {
      return theme.foreground;
    }

    return theme.background;
  }};
`;

const Container = styled(FlexContainer)`
  position: relative;
  min-width: 0px;
`;

const ButtonContainer = styled(FlexContainer)`
  position: absolute;
  right: ${remHelper[16]};
  bottom: ${remHelper[32]};

  span {
    position: relative;
    width: 100%;
    height: 100%;
    display: inline-block;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150%;
    height: 150%;
    transform: translate(-50%, -50%);
  }
`;

const RenderHeart = (hovered, liked) => {
  return <EmptyHeart hovered={hovered} liked={liked} />;
};

const Recipe = ({
  recipe,
  funMode,
  handleAddToFavorites,
  handleRemoveFromFavories
}) => {
  const { user } = useContext(UserContext);
  const { link, name, tags, genrePrimary, genreSecondary, platform } = recipe;
  const [hovered, setHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const color = colors[Math.floor(Math.random() * colors.length)];
  const [isHearted, setIsHearted] = useState(false);
  const [heartUid, setHeartUid] = useState('');
  const [heartCount, setHeartCount] = useState(recipe.heartCount);

  const fetchHeart = async (userUid, postUid) => {
    if (userUid?.length) {
      const res = await getHeartsByUserAndPost(userUid, postUid);
      setIsHearted(res[0]?.exists);
      setHeartUid(res[0]?.uid);
    }
  };

  useEffect(() => {
    fetchHeart(user?.uid, recipe?.id);
  }, [user, recipe]);

  const heartHandler = async () => {
    setIsHearted(!isHearted);

    const unsub = onSnapshot(doc(firestore, 'posts', recipe.id), (doc) => {
      setHeartCount(doc.data().heartCount);
      fetchHeart(user?.uid, recipe?.id);
    });

    if (isHearted) {
      await handleRemoveFromFavories(user, heartUid, recipe.id);
    } else {
      await handleAddToFavorites();
    }
  };

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
          heartCount={heartCount}
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
          isHearted={isHearted}
          type="button"
          onClick={heartHandler}
          liked={isHearted}
          hovered={buttonHovered}
        >
          <span>{RenderHeart(buttonHovered, isHearted)}</span>
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
