import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { blockScroll } from 'utils/lib';

const StyledOverlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  cursor: pointer;

  ${({ navOpen }) => {
    return navOpen && `display: block;`;
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
