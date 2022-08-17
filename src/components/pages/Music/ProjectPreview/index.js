import { Link } from 'react-router-dom';
import ReactContentfulImage from 'react-contentful-image';

import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above } from 'styles/utilities/breakpoints';
import { anchorColor } from 'styles/utilities/mixins';
import { remHelper } from 'utils/remHelper';
import DesktopOverlay from './DesktopOverlay';

import MobileDetails from './MobileDetails';

const Container = styled(FlexContainer)`
  width: 100%;
  margin-bottom: ${remHelper[16]};
  font-family: 'custom_serif';
`;

const Inner = styled(FlexContainer)`
  position: relative;
  flex-direction: column;
  width: 100%;

  img {
    width: 100%;
  }

  ${above.desktop`
    flex-direction: row;
  `}

  &:hover div {
    opacity: 0.95;
  }
`;

const StyledLink = styled(Link)`
  width: 100%;

  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor
    });
  }}
`;

const imageSizes = [
  {
    mediaQuery: 'sm',
    params: { w: 360 }
  },
  {
    mediaQuery: 'md',
    params: { w: 490 }
  },
  {
    mediaQuery: 'lg',
    params: { w: 580 }
  }
];

const ProjectPreview = ({ project, index }) => {
  const { handle, artwork, title, artist, role } = project;
  const { url } = artwork;

  const urlWash = url.replace('https://', '');

  return (
    <Container index={index}>
      <Inner>
        <StyledLink to={`/music/${handle}`}>
          <ReactContentfulImage
            src={urlWash}
            alt={artwork.title}
            sizes={imageSizes}
            loading={index > 7 ? 'lazy' : ''}
          />
          <DesktopOverlay title={title} artist={artist} role={role} />
        </StyledLink>
        <MobileDetails handle={handle} title={title} artist={artist} />
      </Inner>
    </Container>
  );
};

// ProjectPreview.propTypes = {
//   project: musicProjectPropTypes.isRequired,
//   index: number.isRequired,
// };

export default ProjectPreview;
