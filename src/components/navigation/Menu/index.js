import { useThemeContext } from "context/ThemeContext";
import styled from "styled-components";
import { P } from "styles/elements";

const StyledButton = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
  font-family: "custom_serif";
  background-color: ${({ theme, $mode }) => theme[$mode].background};
  color: ${({ theme, $mode }) => theme[$mode].foreground};
`;

const Menu = ({ clickHandler }) => {
  const mode = useThemeContext();

  return (
    <StyledButton type="button" onClick={clickHandler} $mode={mode}>
      <P as="span">menu</P>
    </StyledButton>
  );
};

export default Menu;
