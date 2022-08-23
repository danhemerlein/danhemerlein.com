import CloseIcon from 'components/base/icons/Close';
import { bool, func } from 'prop-types';
import styled from 'styled-components';
import { P } from 'styles/elements';
import { globalTransition } from 'styles/utilities';
import { remHelper } from 'utils/remHelper';

const StyledToolTip = styled.div`
  opacity: 0;
  z-index: 5;
  visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  background-color: ${({ theme }) => {
    return theme.background;
  }};
  color: ${({ theme }) => {
    return theme.foreground;
  }};
  border-color: ${({ theme }) => {
    return theme.border;
  }};
  border: 1px solid;

  padding: ${remHelper[16]};

  transition: opacity ${globalTransition};

  overflow-y: scroll;

  ${({ toolTipOpen }) => {
    return (
      toolTipOpen &&
      `
    opacity: 1;
    visibility: visible;
  `
    );
  }};
`;

const StyledCloseButton = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0;
  outline: none;
  background: transparent;
  width: 2.4rem;
  height: 2.4rem;
  display: block;
  margin-left: auto;
`;

const DT = styled(P)`
  font-weight: bold;
  line-height: 1.24;
  text-decoration: underline;
  display: inline;
`;

const DD = styled(P)`
  margin: ${remHelper[8]};
  line-height: 1.24;
`;

const ToolTip = ({ toolTipOpen, toggleToolTip }) => {
  return (
    <StyledToolTip toolTipOpen={toolTipOpen}>
      <StyledCloseButton onClick={toggleToolTip}>
        <CloseIcon width="2.4rem" height="2.4rem" />
      </StyledCloseButton>
      <dl>
        <DT as="dt">interests</DT>
        <span>:</span>
        <DD as="dd">
          emergence, calm tech, sustainability, accessibility, pick up
          basketball
        </DD>

        <DT as="dt">ultimate abilities</DT>
        <span>:</span>
        <DD as="dd">making websites, punk rock bass guitar</DD>

        <DT as="dt">currently learning</DT>
        <span>:</span>
        <DD as="dd">web/graphic design, ableton live 11</DD>

        <DT as="dt">want to learn</DT>
        <span>:</span>
        <DD as="dd">
          video production/editing, skateboarding, 3D design/animation
        </DD>

        <DT as="dt">favorite beer</DT>
        <span>:</span>
        <DD as="dd">miller high life</DD>

        <DT as="dt">favorite gum</DT>
        <span>:</span>
        <DD as="dd">juicy fruit</DD>

        <DT as="dt">favorite williamsburg coffee shop</DT>
        <span>:</span>
        <DD as="dd">fiction</DD>
      </dl>
    </StyledToolTip>
  );
};

ToolTip.propTypes = {
  toolTipOpen: bool.isRequired,
  toggleToolTip: func
};

ToolTip.defaultProps = {
  toggleToolTip: (_) => {
    return _;
  }
};

export default ToolTip;
