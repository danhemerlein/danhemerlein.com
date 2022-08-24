import { bool, func } from 'prop-types';
import { globalTransition } from 'styles/utilities/variables';
import styled from 'styled-components';
import { blockScroll } from 'utils/lib';

const StyledOverlay = styled.div`
  visibility: hidden;
  opacity: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  z-index: 4;
  cursor: pointer;
  transition: ${globalTransition};

  ${({ navOpen }) => {
    return (
      navOpen &&
      `
        visibility: visible;
        opacity: 0.25;
      `
    );
  }};
`;

const Overlay = ({ navOpen, clickHandler, unmountTrap }) => {
  const handleClick = () => {
    clickHandler();
    unmountTrap();
    blockScroll(false);
  };

  return <StyledOverlay navOpen={navOpen} onClick={handleClick} />;
};

Overlay.propTypes = {
  navOpen: bool.isRequired,
  clickHandler: func.isRequired,
  unmountTrap: func.isRequired
};

export default Overlay;
