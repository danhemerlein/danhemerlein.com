import { bool, func } from 'prop-types';
import FocusTrap from 'focus-trap-react';
import CloseIcon from 'components/base/icons/Close';
import { FlexContainer, P, A } from 'styles/elements';
import styled from 'styled-components';
import { blockScroll } from 'utils/lib';
import { modalTransition } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

const StyledCloseButton = styled.button`
  cursor: pointer;
  padding: 0;
  border: 0;
  background: transparent;
  width: ${remHelper[24]};
  height: ${remHelper[24]};
`;

const Jar = styled.div`
  z-index: 5;
  transform: translateX(240px);

  position: absolute;
  top: 0;
  right: 0;

  display: block;

  width: 240px;
  height: 240px;

  background-color: ${({ theme }) => {
    return theme.background;
  }};

  color: ${({ theme }) => {
    return theme.foreground;
  }};

  overflow: hidden;

  padding: ${remHelper[16]};

  visibility: hidden;
  transition: ${modalTransition};

  ${({ jarOpen }) => {
    return (
      jarOpen &&
      `
      visibility: visible;
      transform: translateX(0);
      position: fixed;
  `
    );
  }};
`;

const TipJar = ({ jarOpen, clickHandler, activeTrap, unmountTrap }) => {
  const handleClick = () => {
    clickHandler();
    unmountTrap();
    blockScroll(false);
  };

  return (
    <Jar jarOpen={jarOpen}>
      {activeTrap && (
        <FocusTrap
          focusTrapOptions={{
            fallbackFocus: '#tip-jar-trap',
            allowOutsideClick: true,
            onDeactivate: unmountTrap
          }}
        >
          <div id="tip-jar-trap">
            <FlexContainer items="center">
              <StyledCloseButton onClick={handleClick}>
                <CloseIcon width="2.4rem" height="2.4rem" color="#000" />
              </StyledCloseButton>
            </FlexContainer>

            <P>
              this feature is under construction follow me on&nbsp;
              <A
                href="https://www.twitter.com/danhemerlein"
                target="_blank"
                rel="noreferrer"
              >
                twitter
              </A>
              &nbsp;for updates
            </P>
          </div>
        </FocusTrap>
      )}
    </Jar>
  );
};

TipJar.propTypes = {
  clickHandler: func.isRequired,
  unmountTrap: func.isRequired,
  jarOpen: bool.isRequired,
  activeTrap: bool.isRequired
};

export default TipJar;
