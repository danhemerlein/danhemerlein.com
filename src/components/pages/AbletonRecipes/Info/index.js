import Instagram from 'components/base/icons/Instagram';
import YouTube from 'components/base/icons/YouTube';
import { FlexContainer, H2 } from 'styles/elements';
import * as styles from './Info.styles.js';

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
      <div>
        <styles.DatePosted>
          {recipe['date posted'].toLowerCase()}
        </styles.DatePosted>

        <FlexContainer justify="flex-end" items="center">
          <styles.OriginalPoster>
            {recipe['original poster']}
          </styles.OriginalPoster>

          {PlatformIcon ? <PlatformIcon /> : <>404 platform icon not found </>}
        </FlexContainer>
      </div>
    </FlexContainer>
  );
};

Info.propTypes = {};

export default Info;
