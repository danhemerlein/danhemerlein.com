import { func } from 'prop-types';
import styled from 'styled-components';
import { P } from 'styles/elements';

const StyledButton = styled.button`
  cursor: pointer;
  border: transparent;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
  font-family: 'custom_serif';
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
`;

const Menu = ({ clickHandler, mountTrap }) => {
  const handleClick = () => {
    clickHandler();
    mountTrap();
  };

  return (
    <StyledButton type="button" onClick={handleClick}>
      <P as="span">menu</P>
    </StyledButton>
  );
};

Menu.propTypes = {
  clickHandler: func.isRequired,
};

export default Menu;
