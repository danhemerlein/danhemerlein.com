import styled from "styled-components";
import { blackBorder } from "styles/utilities";

const StyledToolTip = styled.div`
  display: none;
  visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  ${blackBorder};
  color: ${({ theme }) => theme.light.light};

  ${({ toolTipOpen }) =>
    toolTipOpen &&
    `
    display: block;
    visibility: visible;
  `};
`;

const ToolTip = ({ toolTipOpen }) => {
  return (
    <StyledToolTip toolTipOpen={toolTipOpen}>big ol tool tip</StyledToolTip>
  );
};

ToolTip.propTypes = {};

export default ToolTip;
