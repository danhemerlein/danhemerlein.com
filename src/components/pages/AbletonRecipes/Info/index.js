import Instagram from 'components/base/icons/Instagram';
import YouTube from 'components/base/icons/YouTube';
import styled from 'styled-components';
import { FlexContainer, H2 } from 'styles/elements';
import { globalTransition } from 'styles/utilities';
import * as styles from './Info.styles.js';

const platformIcons = {
  instagram: {
    PlatformIcon: Instagram
  },
  youtube: {
    PlatformIcon: YouTube
  }
};

const Container = styled(FlexContainer)`
  svg * {
    transition: fill ${globalTransition};

    fill: ${({ theme, hovered }) => {
      return hovered ? theme.background : theme.foreground;
    }};
  }

  .youtube-st1 {
    transition: fill ${globalTransition};
    fill: ${({ theme, hovered }) => {
      return hovered ? theme.foreground : theme.background;
    }};
  }
`;

const Info = ({ name, platform, recipe, hovered }) => {
  const { PlatformIcon } = platformIcons[platform];
  const { heartCount } = recipe;
  return (
    <Container items="center" justify="space-between" hovered={hovered}>
      <H2>{name}</H2>
      <div>
        <styles.DatePosted>{recipe.datePosted.toLowerCase()}</styles.DatePosted>

        <FlexContainer justify="flex-end" items="center">
          <styles.OriginalPoster>{recipe.originalPoster}</styles.OriginalPoster>

          {PlatformIcon ? <PlatformIcon /> : <>404 platform icon not found </>}
        </FlexContainer>

        <styles.DatePosted>
          {heartCount} heart
          {heartCount === 1 ? null : 's'}
        </styles.DatePosted>
      </div>
    </Container>
  );
};

Info.propTypes = {};

export default Info;
