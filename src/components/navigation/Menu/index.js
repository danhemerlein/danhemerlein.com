import styled from "styled-components";
import { P } from "styles/elements";

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  font-family: "custom_serif";
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

export default Menu;
