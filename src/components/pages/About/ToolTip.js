import { useThemeContext } from "context/ThemeContext";
import { bool, func } from "prop-types";
import styled from "styled-components";

const StyledToolTip = styled.div`
  display: none;
  visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: ${({ theme, $mode }) => theme[$mode].background};
  color: ${({ theme, $mode }) => theme[$mode].foreground};
  border-color: ${({ theme, $mode }) => theme[$mode].borderColor};
  border: 1px solid;

  ${({ toolTipOpen }) =>
    toolTipOpen &&
    `
    display: block;
    visibility: visible;
  `};
`;

const ToolTip = ({ toolTipOpen, toggleToolTip }) => {
  const mode = useThemeContext();
  return (
    <StyledToolTip $mode={mode} toolTipOpen={toolTipOpen}>
      <button type="button" onClick={toggleToolTip}>
        close that brother
      </button>
      big ol tool tip
    </StyledToolTip>
  );
};

ToolTip.propTypes = {
  toolTipOpen: bool.isRequired,
  toggleToolTip: func.isRequired,
};

export default ToolTip;
