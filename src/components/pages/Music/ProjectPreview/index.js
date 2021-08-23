import { number } from 'prop-types';
import { musicProjectPropTypes } from 'propTypes';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FlexContainer } from 'styles/elements';
import { above, anchorColor } from 'styles/utilities';
import { remHelper } from 'utils';
import DesktopOverlay from './DesktopOverlay';
import {
  getDesktopMarginLeft,
  getDestkopMarginRight,
  getTabletMarginLeft,
  getTabletMarginRight,
} from './lib';
import MobileDetails from './MobileDetails';

const Container = styled(FlexContainer)`
  width: calc(100%);
  margin-bottom: ${remHelper[16]};
  font-family: 'custom_serif';

  ${above.tablet`
    width: calc(50% - ${remHelper[8]});

    ${({ index }) =>
      String(index) && `margin-right: ${getTabletMarginRight(String(index))};`}
    ${({ index }) =>
      String(index) && `margin-left: ${getTabletMarginLeft(String(index))};`}
  `}

  ${above.desktop`
    width: calc(25% - ${remHelper.override(12)});
    ${({ index }) =>
      String(index) && `margin-right: ${getDestkopMarginRight(String(index))};`}
    ${({ index }) =>
      String(index) && `margin-left: ${getDesktopMarginLeft(String(index))};`}
  `};
`;

const Inner = styled(FlexContainer)`
  position: relative;
  flex-direction: column;

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
