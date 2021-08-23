import { func } from 'prop-types';
import styled from 'styled-components';
import { P } from 'styles/elements';

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  padding-left: 0;
  padding-right: 0;
  font-family: 'custom_serif';
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
`;

const Menu = ({ clickHandler }) => {
  return (
    <StyledButton type="button" onClick={clickHandler}>
      <P as="span">menu</P>
    </StyledButton>
  );
};

Menu.propTypes = {
  clickHandler: func,
};

Menu.defaultProps = {
  clickHandler: (_) => _,
};

export default Menu;
