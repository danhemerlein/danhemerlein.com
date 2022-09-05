import Instagram from 'components/base/icons/Instagram';
import YouTube from 'components/base/icons/YouTube';
import styled from 'styled-components';
import { FlexContainer, H2, P } from 'styles/elements';
import { remHelper } from 'utils/remHelper';

const DatePosted = styled(P)`
  text-align: right;
`;

const OriginalPoster = styled(P)`
  margin-right: ${remHelper[8]};
`;

const Data = styled.div``;

const platformIcons = {
  instagram: {
    PlatformIcon: Instagram
  },
  youtube: {
    PlatformIcon: YouTube
  }
};

const Info = ({ name, platform, recipe }) => {
  const { PlatformIcon } = platformIcons[platform];
  return (
    <FlexContainer items="center" justify="space-between">
      <H2>{name}</H2>
      <Data>
        <DatePosted>{recipe['date posted']}</DatePosted>

        <FlexContainer justify="flex-end" items="center">
          <OriginalPoster>{recipe['original poster']}</OriginalPoster>

          {PlatformIcon ? <PlatformIcon /> : <>404 platform icon not found </>}
        </FlexContainer>
      </Data>
    </FlexContainer>
  );
};

Info.propTypes = {};

export default Info;
