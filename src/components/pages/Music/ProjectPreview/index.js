import { number } from 'prop-types';
import { musicProjectPropTypes } from 'propTypes';
import { Link } from 'react-router-dom';
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
  height: 100%;

  ${above.tablet`
    flex-direction: row;
  `}

  &:hover div {
    opacity: 0.95;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledLink = styled(Link)`
  width: 100%;

  ${({ theme }) => {
    return anchorColor({
      color: theme.anchor,
    });
  }}
`;

const ProjectPreview = ({ project, index }) => {
  const { handle, artwork, title, artist, role } = project.fields;

  return (
    <Container index={index}>
      <Inner>
        <StyledLink to={`/music/${handle}`}>
          <StyledImg
            src={artwork.fields.file.url}
            alt={artwork.fields.file.title}
          />
          <DesktopOverlay title={title} artist={artist} role={role} />
        </StyledLink>
        <MobileDetails handle={handle} title={title} artist={artist} />
      </Inner>
    </Container>
  );
};

ProjectPreview.propTypes = {
  project: musicProjectPropTypes.isRequired,
  index: number.isRequired,
};

export default ProjectPreview;
