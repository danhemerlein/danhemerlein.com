import Instagram from 'components/base/icons/Instagram';
import PlugIn from 'components/base/icons/PlugIn';
import YouTube from 'components/base/icons/YouTube';
import styled from 'styled-components';
import { FlexContainer, H2, P } from 'styles/elements';
import { above, globalTransition } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';
import * as styles from './Info.styles.js';

const Inner = styled(FlexContainer)`
  flex-direction: column;
  align-items: flex-start;

  ${above.desktop`
    flex-direction: row;
    justify-content: space-between;
  `}
`;

const Headline = styled(H2)`
  margin-bottom: ${remHelper[8]};

  ${above.desktop`
    margin-bottom: 0;
  `}
`;

const HeartContainer = styled.div`
  margin-top: ${remHelper[8]};

  ${above.desktop`
  margin-top: 0;
`}
`;

const platformIcons = {
  instagram: {
    PlatformIcon: Instagram
  },
  youtube: {
    PlatformIcon: YouTube
  },
  '': {
    PlatformIcon: PlugIn
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
      <Headline>{name}</Headline>
      <P>{recipe.datePosted.toLowerCase()}</P>

      <Inner>
        <FlexContainer items="center">
          <styles.OriginalPoster>{recipe.originalPoster}</styles.OriginalPoster>

          {PlatformIcon ? <PlatformIcon /> : <>404 platform icon not found </>}
        </FlexContainer>

        <HeartContainer>
          <P>
            {heartCount} heart
            {heartCount === 1 ? null : 's'}
          </P>
        </HeartContainer>
      </Inner>
    </Container>
  );
};

Info.propTypes = {};

export default Info;
