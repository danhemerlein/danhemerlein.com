import { bool, func } from "prop-types";
import styled from "styled-components";

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 4;
  cursor: pointer;

  ${({ toolTipOpen }) => toolTipOpen && `display: block;`};
`;

const ToolTipUnderlay = ({ toolTipOpen, clickHandler }) => {
  return <Overlay toolTipOpen={toolTipOpen} onClick={clickHandler} />;
};

ToolTipUnderlay.propTypes = {
  toolTipOpen: bool.isRequired,
  clickHandler: func.isRequired,
};

export default ToolTipUnderlay;
