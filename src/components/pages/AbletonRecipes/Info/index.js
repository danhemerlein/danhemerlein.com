import Instagram from 'components/base/icons/Instagram';
import YouTube from 'components/base/icons/YouTube';
import styled from 'styled-components';
import { FlexContainer, H2, P } from 'styles/elements';
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

const Info = ({ name, platform, recipe, hovered, heartCount }) => {
  const { PlatformIcon } = platformIcons[platform];

  return (
    <Container direction="column" hovered={hovered}>
      <H2>{name}</H2>
      <P>{recipe.datePosted.toLowerCase()}</P>

      <FlexContainer items="center" justify="space-between">
        <FlexContainer items="center">
          <styles.OriginalPoster>{recipe.originalPoster}</styles.OriginalPoster>

          {PlatformIcon ? <PlatformIcon /> : <>404 platform icon not found </>}
        </FlexContainer>

        <div>
          <P>
            {heartCount} heart
            {heartCount === 1 ? null : 's'}
          </P>
        </div>
      </FlexContainer>
    </Container>
  );
};

Info.propTypes = {};

export default Info;
