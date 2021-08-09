import styled from "styled-components";

const StyledToolTip = styled.div`
  display: none;
  visibility: hidden;

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
