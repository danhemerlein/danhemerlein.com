import VisuallyHidden from '@reach/visually-hidden';
import { string } from 'prop-types';
import styled from 'styled-components';
import { FlexContainer, P } from 'styles/elements';
import theme from 'styles/theme';
import { above } from 'styles/utilities/breakpoints';
import { remHelper } from 'utils/remHelper';

const Overlay = styled(FlexContainer)`
  display: none;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  padding: ${remHelper[16]};

  background-color: ${({ theme }) => {
    return theme.general.black;
  }};
  color: ${({ theme }) => {
    return theme.general.white;
  }};

  width: 100%;
  height: 100%;
  transition: opacity 0.5s ease-in-out;

  ${above.desktop`
    display: flex;
    visibility: visible;
  `}
`;

const StyledP = styled(P)`
  margin: ${remHelper[4]} 0;
`;

const RoleContainer = styled(FlexContainer)`
  width: 100%;
  margin-top: ${remHelper[8]};
`;

const RoleIndicator = styled.div`
  height: ${remHelper[16]};
  width: ${remHelper[16]};
  margin: 0 ${remHelper[8]};
  border-radius: 50%;
  background-color: ${({ color }) => {
    return color;
  }};
`;

const DesktopOverlay = ({ title, artist, role }) => {
  const wrote = role.toLowerCase().includes('wrote');
  const produced = role.toLowerCase().includes('produced');
  const performed = role.toLowerCase().includes('performed');

  return (
    <Overlay justify="center" items="center" direction="column">
      <StyledP>{title}</StyledP>
      <StyledP>by&nbsp;{artist}</StyledP>
      <RoleContainer justify="center" items="center">
        {wrote ? (
          <>
            <RoleIndicator color={theme.light.yan.carnation} />

            <VisuallyHidden>I was a writer on this song.</VisuallyHidden>
          </>
        ) : null}
        {produced ? (
          <>
            <RoleIndicator color={theme.light.yan.vinRouge} />

            <VisuallyHidden>I was a produer on this song.</VisuallyHidden>
          </>
        ) : null}
        {performed ? (
          <>
            <RoleIndicator color={theme.light.yan.lochmara} />

            <VisuallyHidden>I was a performer on this song.</VisuallyHidden>
          </>
        ) : null}
      </RoleContainer>
    </Overlay>
  );
};

DesktopOverlay.propTypes = {
  title: string.isRequired,
  artist: string.isRequired,
  role: string.isRequired
};

export default DesktopOverlay;
